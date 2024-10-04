const mongoose = require('mongoose');

const PondSchema = new mongoose.Schema({
  location: { type: String, required: true },
  element: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  birthYear: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Pond', PondSchema);
