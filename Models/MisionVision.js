// backend/Models/MisionVision.js
const mongoose = require('mongoose');

const MisionVisionSchema = new mongoose.Schema({
  mision: { type: String, required: true },
  vision: { type: String, required: true },
  valores: { type: String, required: true }
}, { timestamps: true });

const MisionVision = mongoose.model('MisionVision', MisionVisionSchema);
module.exports = MisionVision;
