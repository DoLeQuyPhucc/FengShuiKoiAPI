const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthYear: { type: Number },
  gender: { type: String, enum: ['male', 'female'] },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' }],
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
