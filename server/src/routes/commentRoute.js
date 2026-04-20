import express from 'express';
import Comment from '../models/comment.js';
import Blog from '../models/blog.js';
import { isAuthenticated } from '../Middleware/auth.js';
const router = express.Router();

// Create a comment

router.post('/', isAuthenticated, async (req, res) => {
  const { content, blogId } = req.body;
  const normalizedContent = content?.trim();

  if (!normalizedContent || !blogId) {
    return res.status(400).json({ message: 'Content and blogId are required' });
  }

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }
    const comment = new Comment({
      content: normalizedContent,
      author: req.user.id,
      blog: blogId
    });
    blog.comments.push(comment._id);
    await comment.save();
    await blog.save();
    await comment.populate('author', 'fullName email');
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment' });
  }
});

//delete a comment 
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    if (String(comment.author) !== String(req.user.id)) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    await Comment.findByIdAndDelete(req.params.id);
    await Blog.findByIdAndUpdate(comment.blog, { $pull: { comments: comment._id } });
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

export default router;
