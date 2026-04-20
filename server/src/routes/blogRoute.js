
import express from "express";
import { isAuthenticated } from "../Middleware/auth.js";
import Blog from "../models/blog.js";
const router = express.Router();
 
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email fullName");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/new", isAuthenticated, async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const newBlog = new Blog({
      title,
      content,
      image,
      author: req.user.id,
    });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name email fullName");
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/:id", isAuthenticated, async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    Object.assign(blog, { title, content });
    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
