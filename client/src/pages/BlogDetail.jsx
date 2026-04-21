import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegComment } from "react-icons/fa6";
import { TbXboxXFilled } from "react-icons/tb";

const BlogDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [delLoading, setDelLoading] = useState(false);
  const [clickComment, setClickComment] = useState(false);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const fetchBlog = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);

      setBlog(res.data);
    } catch (err) {
      console.error("Error fetching blog", err);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs", err);
      setBlogs([]);
    }
  }, []);

  useEffect(() => {
    fetchBlog();
    fetchBlogs();
  }, [fetchBlog, fetchBlogs]);

  const relatedBlogs = blogs.filter((b) => {
    if (!blog?.tags) return false;

    if (Array.isArray(blog.tags) && Array.isArray(b.tags)) {
      return b.tags.some((tag) => blog.tags.includes(tag));
    }
    return b.tags === blog.tags;
  });

  const handleBlogDelete = async () => {
    if (delLoading) return;
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    setDelLoading(true);

    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        withCredentials: true,
      });
      toast.success("Blog deleted");
      navigate("/");
    } catch (err) {
      setDelLoading(false);
      console.error("Delete failed", err);
      toast.error("Failed to delete blog");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  const handleCommentSubmit = async () => {
    if (commentLoading) return;

    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to comment");
      navigate("/login");
      return;
    }

    try {
      setCommentLoading(true);
      await axios.post(
        "http://localhost:5000/api/comments",
        { content: comment, blogId: id },
        { withCredentials: true },
      );
      toast.success("Comment added");
      setComment("");
      await fetchBlog();
    } catch (err) {
      console.error("Comment submission failed", err);
      toast.error(err.response?.data?.message || "Failed to add comment");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        withCredentials: true,
      });
      toast.success("Comment deleted");
      await fetchBlog();
    } catch (err) {
      console.error("Comment deletion failed", err);
      toast.error(err.response?.data?.message || "Failed to delete comment");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Loading...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Blog not found
      </div>
    );
  }

  const isOwner =
    user && blog.author && String(user._id) === String(blog.author._id);
  const comments = blog.comments ?? [];
  const createdAt = blog.createdAt
    ? new Date(blog.createdAt).toDateString()
    : "Unknown date";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 md:px-6">
      <div className="mx-auto my-6 max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <Link
          to="/"
          className="text-sm font-medium text-slate-600 hover:underline"
        >
          {"<-"} Back
        </Link>

        <h1 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
          {blog.title}
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          By {blog.author?.fullName || "Unknown"} | {createdAt}
        </p>

        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="my-5 max-h-[400px] w-full rounded-xl object-cover"
          />
        )}

        <p className="mt-4 whitespace-pre-line text-lg leading-relaxed text-slate-700">
          {blog.content}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {Array.isArray(blog.tags) ? (
            blog.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600 hover:bg-orange-200 transition cursor-pointer"
              >
                #{tag}
              </span>
            ))
          ) : (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
              #{blog.tags}
            </span>
          )}
        </div>
        {isOwner && (
          <div className="mt-6 flex gap-3">
            <button
              className="rounded-xl bg-slate-900 px-4 py-2 text-white transition hover:bg-slate-700"
              onClick={() => navigate(`/blogs/${blog._id}/edit`)}
            >
              Edit
            </button>

            <button
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-70"
              onClick={handleBlogDelete}
              disabled={delLoading}
            >
              {delLoading && (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-500/30 border-t-red-500" />
              )}
              {delLoading ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}

        {!clickComment && (
          <button
            className="mt-6 flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-2 transition hover:bg-slate-200"
            onClick={() => setClickComment(true)}
          >
            <FaRegComment /> Comment
          </button>
        )}

        {clickComment && (
          <div className="mt-10 border-t border-slate-200 pt-6">
            <h3 className="mb-3 text-lg font-semibold text-slate-700">
              Add a Comment
            </h3>

            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Write your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={commentLoading}
                className="w-full rounded-full border border-slate-200 px-4 py-3 pr-28 shadow-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100 disabled:cursor-not-allowed disabled:bg-slate-100"
              />

              <button
                onClick={handleCommentSubmit}
                disabled={commentLoading}
                className="absolute bottom-1 right-1 top-1 rounded-full bg-slate-900 px-5 text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-500"
              >
                {commentLoading ? "Posting..." : "Submit"}
              </button>
            </div>
          </div>
        )}

        <div className="mt-10">
          <h3 className="mb-4 border-b border-slate-200 pb-2 text-xl font-bold text-slate-900">
            Comments
          </h3>

          {comments.length > 0 ? (
            <ul className="space-y-4">
              {comments.map((commentItem) => (
                <li
                  key={commentItem._id}
                  className="flex items-start justify-between rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div>
                    <p className="text-base text-slate-800">
                      {commentItem.content}
                    </p>

                    <p className="mt-2 text-sm text-slate-500">
                      <span className="font-medium text-slate-700">
                        {commentItem.author?.fullName || "Unknown"}
                      </span>{" "}
                      |{" "}
                      {commentItem.createdAt
                        ? new Date(commentItem.createdAt).toLocaleString()
                        : "Unknown time"}
                    </p>
                  </div>

                  {String(commentItem.author?._id) === String(user?._id) && (
                    <button
                      onClick={() => handleCommentDelete(commentItem._id)}
                      className="ml-4 text-red-500 transition hover:text-red-700"
                      title="Delete comment"
                    >
                      <TbXboxXFilled size={20} />
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500">No comments yet</p>
          )}
        </div>
        <div className="mt-12">
          <h3 className="mb-6 text-2xl font-bold text-slate-900">
            Related Blogs
          </h3>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedBlogs
              .filter((item) => item._id !== blog._id)
              .map((item) => (
                <Link
                  key={item._id}
                  to={`/blogs/${item._id}`}
                  className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition overflow-hidden"
                >
             
                  <div className="h-44 w-full bg-slate-100 overflow-hidden flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition"
                      />
                    ) : (
                      <div className="text-slate-400 text-sm">No Image</div>
                    )}
                  </div>

                  <div className="flex flex-col flex-grow p-4">
                    <h4 className="text-lg font-semibold text-slate-800 line-clamp-2">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                      {item.content}
                    </p>

                 
                    <div className="mt-auto pt-4 flex flex-wrap gap-2">
                      {(Array.isArray(item.tags) ? item.tags : [item.tags]).map(
                        (tag, i) => (
                          <span
                            key={i}
                            className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full"
                          >
                            #{tag}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
