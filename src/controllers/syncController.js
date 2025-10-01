const WorkoutSession = require('../models/WorkoutSession');
const WorkoutTemplate = require('../models/WorkoutTemplate');

const models = {
  workoutSessions: WorkoutSession,
  workoutTemplates: WorkoutTemplate,
};

// @desc    Process a batch of client changes (offline sync)
// @route   POST /api/sync
// @access  Private
const syncData = async (req, res) => {
  const { changes } = req.body; // Expects { changes: { workoutSessions: { created: [], updated: [], deleted: [] }, ... } }
  const userId = req.user._id;
  const results = {};
  
  try {
    for (const modelName in changes) {
      if (!models[modelName]) continue;
      
      const model = models[modelName];
      const changeSet = changes[modelName];
      results[modelName] = { created: [], updated: [], deleted: [] };
      
      // Process creations
      if (changeSet.created) {
        for (const record of changeSet.created) {
          try {
            const newRecord = new model({ ...record, user: userId });
            await newRecord.save();
            results[modelName].created.push({ clientId: record.clientId, status: 'SUCCESS', serverId: newRecord._id });
          } catch (error) {
            results[modelName].created.push({ clientId: record.clientId, status: 'ERROR', message: error.message });
          }
        }
      }
      
      // Process updates
      if (changeSet.updated) {
        for (const record of changeSet.updated) {
          const { clientId, lastModifiedAt } = record;
          const serverRecord = await model.findOne({ clientId, user: userId });

          if (!serverRecord) {
             results[modelName].updated.push({ clientId, status: 'NOT_FOUND' });
             continue;
          }
          
          // --- Conflict Resolution: Last Write Wins ---
          if (new Date(lastModifiedAt) >= new Date(serverRecord.lastModifiedAt)) {
            Object.assign(serverRecord, record);
            await serverRecord.save();
            results[modelName].updated.push({ clientId, status: 'SUCCESS' });
          } else {
            // Conflict: server has a newer version
            results[modelName].updated.push({ 
              clientId, 
              status: 'CONFLICT', 
              serverRecord: serverRecord.toObject() 
            });
          }
        }
      }
      
      // Process deletions
      if (changeSet.deleted) {
         for (const clientId of changeSet.deleted) {
            await model.deleteOne({ clientId, user: userId });
            results[modelName].deleted.push({ clientId, status: 'SUCCESS' });
         }
      }
    }
    
    // Fetch latest server state to send back to client
    const sessions = await WorkoutSession.find({ user: userId });
    const templates = await WorkoutTemplate.find({ user: userId });
    
    res.json({ 
        syncResults: results,
        latestData: {
            sessions,
            templates
        }
    });

  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({ message: 'Server error during sync process' });
  }
};

module.exports = { syncData };