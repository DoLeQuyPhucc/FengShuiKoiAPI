const mongoose = require('mongoose');

const BlogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: mongoose.Schema.Types.Date, default: Date.now },
  updatedAt: { type: mongoose.Schema.Types.Date, default: Date.now },
  picture: { type: String },
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', BlogPostSchema, 'blogPosts');
