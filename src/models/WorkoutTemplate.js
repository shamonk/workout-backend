const mongoose = require('mongoose');

const templateExerciseSchema = new mongoose.Schema({
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  targetSets: { type: Number },
  targetReps: { type: Number },
  targetWeight: { type: Number },
}, { _id: false });

const workoutTemplateSchema = new mongoose.Schema({
  clientId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  exercises: [templateExerciseSchema],
  lastModifiedAt: { type: Date, required: true },
}, { timestamps: true });

const WorkoutTemplate = mongoose.model('WorkoutTemplate', workoutTemplateSchema);
module.exports = WorkoutTemplate;