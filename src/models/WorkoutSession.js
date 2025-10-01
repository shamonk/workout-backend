const mongoose = require('mongoose');

const setSchema = new mongoose.Schema({
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  distance: { type: Number },
  duration: { type: Number }, // in seconds
  isCompleted: { type: Boolean, default: true }
}, { _id: false });

const performedExerciseSchema = new mongoose.Schema({
  exercise: { type: mongoose.Schema.Types.ObjectId, ref: 'Exercise', required: true },
  sets: [setSchema],
  notes: { type: String },
}, { _id: false });

const workoutSessionSchema = new mongoose.Schema({
  clientId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  notes: { type: String },
  performedExercises: [performedExerciseSchema],
  lastModifiedAt: { type: Date, required: true, index: true },
}, { timestamps: true });

// Compound index for faster queries by user + lastModifiedAt
workoutSessionSchema.index({ user: 1, lastModifiedAt: -1 });

const WorkoutSession = mongoose.model('WorkoutSession', workoutSessionSchema);
module.exports = WorkoutSession;
