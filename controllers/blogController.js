const BlogPost = require("../models/BlogPost");

//get all blog posts
exports.getAllBlogPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({});
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving blog posts", error: err });
  }
};

//create blog post
exports.createBlogPost = async (req, res) => {
  try {
    const newPost = new BlogPost({
      title: req.body.title,
      content: req.body.content,
      authorId: req.body.authorId,
      picture: req.body.picture,
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: "Error creating blog post", error: err });
  }
};

//get single blog post by id
exports.getBlogPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Blog post not found" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving blog post", error: err });
  }
};

//update blog post by id
exports.updateBlogPostById = async (req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPost)
      return res.status(404).json({ message: "Blog post not found" });
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: "Error updating blog post", error: err });
  }
};

//delete blog post by id
exports.deleteBlogPostById = async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deletedPost)
      return res.status(404).json({ message: "Blog post not found" });
    res.status(200).json(deletedPost);
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog post", error: err });
  }
};

// //search blog post by title
// exports.searchBlogPostByTitle = async (req, res) => {
//   try {
//     const keyword = req.query.title ? req.query.title.trim().replace(/\s+/g, '.*') : '';
//     const posts = await BlogPost.find({
//       title: { $regex: `.*${keyword}.*`, $options: "i" },
//     });
//     if (!posts.length)
//       return res.status(404).json({ message: "No blog posts found" });
//     res.status(200).json(posts);
//   } catch (err) {
//     res.status(500).json({ message: "Error searching blog posts", error: err });
//   }
// };

