const mongoose = require('mongoose');

const templateExerciseSchema = new mongoose.Schema({
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  targetSets: { type: Number },
  targetReps: { type: Number },
  targetWeight: { type: Number },
}, { _id: false });

const workoutTemplateSchema = new mongoose.Schema({
  clientId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  name: { type: String, required: true },
  description: { type: String },
  exercises: [templateExerciseSchema],
  lastModifiedAt: { type: Date, required: true, index: true },
}, { timestamps: true });

// Compound index for incremental sync (fetching by user + lastModifiedAt)
workoutTemplateSchema.index({ user: 1, lastModifiedAt: -1 });

const WorkoutTemplate = mongoose.model('WorkoutTemplate', workoutTemplateSchema);
module.exports = WorkoutTemplate;
