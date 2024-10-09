const express = require("express");
const router = express.Router();
const {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  searchBlogPostByTitle,
  deleteBlogPostById,
  updateBlogPostById,
} = require("../controllers/blogController");

// Route to get all blog posts
router.get("/", getAllBlogPosts);

// Route to get blog post by id
router.get("/:id", getBlogPostById);

// Route to create a new blog post
router.post("/", createBlogPost);

// Route to update a blog post by id
router.put("/:id", updateBlogPostById);

// Route to delete a blog post by id
router.delete("/:id", deleteBlogPostById);

// // Route to search blog post by title
// router.get("/search/:title", searchBlogPostByTitle);

module.exports = router;
