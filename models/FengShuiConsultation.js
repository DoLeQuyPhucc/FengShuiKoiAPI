const mongoose = require('mongoose');

const FengShuiConsultationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pondId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pond' },
  koiFishId: { type: mongoose.Schema.Types.ObjectId, ref: 'KoiFish' },
  consultationResult: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('FengShuiConsultation', FengShuiConsultationSchema);
