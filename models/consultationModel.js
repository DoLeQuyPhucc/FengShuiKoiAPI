const mongoose = require('mongoose');

const ConsultationSchema = new mongoose.Schema({
  element: {
    type: String,
    required: true,
  },
  suitableColors: {
    type: [String],
    required: true,
  },
  meaning: {
    type: String,
    required: true,
  },
  fishPondPlacement: {
    type: String,
    required: true,
  },
  limitations: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    default: '',
  },
});

// Tạo model từ schema
const Consultation = mongoose.model('Consultation', ConsultationSchema);

module.exports = Consultation;
