const mongoose = require('mongoose');

const AdvertisementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fengShuiTags: [String],
}, { timestamps: true });

module.exports = mongoose.model('Advertisement', AdvertisementSchema);
