const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  description: { type: String },
  videoUrl: { type: String },
}, { timestamps: true });

const Exercise = mongoose.model('Exercise', exerciseSchema);
module.exports = Exercise;