const WorkoutSession = require('../models/WorkoutSession');
const WorkoutTemplate = require('../models/WorkoutTemplate');

// @desc    Get all data for initial sync (after login)
// @route   GET /api/workouts/all
// @access  Private
const getAllUserData = async (req, res) => {
  try {
    // Run both queries in parallel for speed
    const [sessions, templates] = await Promise.all([
      WorkoutSession.find({ user: req.user._id })
        .lean() // return plain JS objects, no Mongoose overhead
        .select('-__v') // drop internal Mongoose version key
        .sort({ lastModifiedAt: -1 }), // sorted for consistency

      WorkoutTemplate.find({ user: req.user._id })
        .lean()
        .select('-__v')
        .sort({ lastModifiedAt: -1 })
    ]);

    res.json({
      sessions,
      templates,
      stats: {} // Placeholder for future stats
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error fetching user data" });
  }
};

module.exports = { getAllUserData };
