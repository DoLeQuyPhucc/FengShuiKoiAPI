const mongoose = require('mongoose');

const KoiFishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: { type: String, required: true },
  color: { type: String },
  element: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  birthYear: { type: Number },
  fengShuiScore: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('KoiFish', KoiFishSchema);
