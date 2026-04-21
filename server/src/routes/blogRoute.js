import express from "express";
import { isAuthenticated } from "../Middleware/auth.js";
import Blog from "../models/blog.js";
import Comment from "../models/comment.js";
import upload from "../Middleware/upload.js";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

const getPublicIdFromImageUrl = (imageUrl) => {
  if (!imageUrl || !imageUrl.includes("res.cloudinary.com")) {
    return null;
  }
  const uploadMarker = "/upload/";
  const uploadIndex = imageUrl.indexOf(uploadMarker);
  if (uploadIndex === -1) {
    return null;
  }

  const pathAfterUpload = imageUrl.slice(uploadIndex + uploadMarker.length);
  const pathWithoutVersion = pathAfterUpload.replace(/^v\d+\//, "");
  const withoutQuery = pathWithoutVersion.split("?")[0];
  const dotIndex = withoutQuery.lastIndexOf(".");

  return dotIndex > -1 ? withoutQuery.slice(0, dotIndex) : withoutQuery;
};

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email fullName");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.post(
  "/new",
  isAuthenticated,
  upload.single("image"),
  async (req, res) => {
    try {
      const title = req.body.title?.trim();
      const content = req.body.content?.trim();
      const tags = req.body.tags?.split(",").map((tag) => tag.trim());

      if (!title || !content) {
        return res.status(400).json({ message: "Title and content are required" });
      }

      const newBlog = new Blog({
        title,
        content,
        tags:tags,
        image: req.file ? req.file.path : null,
        imagePublicId: req.file ? req.file.filename : null,
        author: req.user.id,
      });
      await newBlog.save();
      res.status(201).json(newBlog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
);
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "name email fullName")
      .populate({
        path: "comments",
        populate: {
          path: "author",
          select: "fullName email",
        },
      });
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
router.put("/:id", isAuthenticated, upload.single("image"), async (req, res) => {
  const title = req.body.title?.trim();
  const content = req.body.content?.trim();

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    blog.title = title;
    blog.content = content;

    if (req.file) {
      blog.image = req.file.path;
      blog.imagePublicId = req.file.filename;
    }

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

    const imagePublicId =
      blog.imagePublicId || getPublicIdFromImageUrl(blog.image);

    if (imagePublicId) {
      try {
        await cloudinary.uploader.destroy(imagePublicId);
      } catch (cloudinaryError) {
        console.error("Cloudinary delete error:", cloudinaryError);
      }
    }

    await Comment.deleteMany({ blog: blog._id });
    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Delete blog error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
