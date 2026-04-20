import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { FaRegComment } from "react-icons/fa6";

const BlogDetail = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clickComment, setClickComment] = useState(false);
  const [comment, setComment] = useState("");


  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/blogs/${id}`
        );
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog", err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);


  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/blogs/${id}`,
        { withCredentials: true }
      );
      toast.success("Blog deleted");
      navigate("/");
    } catch (err) {
      console.error("Delete failed", err);
      toast.error("Failed to delete blog");
    }
  };


  const handleCommentSubmit = () => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    
    console.log("Comment:", comment);

    toast.success("Comment added (frontend only)");
    setComment("");
  };


  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommentSubmit();
    }
  };

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (!blog) return <h2 className="text-center mt-10">Blog not found</h2>;

  const isOwner =
    user && blog.author && String(user._id) === String(blog.author._id);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-lg my-10">
  
      <Link to="/" className="text-blue-500 hover:underline">
        ⬅️ Back
      </Link>

     
      <h1 className="mt-4 text-3xl font-bold text-gray-800">
        {blog.title}
      </h1>

   
      <p className="mt-2 text-gray-500 text-sm">
        By {blog.author?.fullName || "Unknown"} •{" "}
        {new Date(blog.createdAt).toDateString()}
      </p>


      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="my-5 rounded-xl w-full object-cover max-h-[400px]"
        />
      )}

     
      <p className="mt-4 text-lg leading-relaxed text-gray-700">
        {blog.content}
      </p>


      {isOwner && (
        <div className="mt-6 flex gap-3">
          <button
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            onClick={() => navigate(`/blogs/${blog._id}/edit`)}
          >
            Edit
          </button>

          <button
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}

    
      {!clickComment && (
        <button
          className="mt-6 flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full transition"
          onClick={() => setClickComment(true)}
        >
          <FaRegComment /> Comment
        </button>
      )}

     
      {clickComment && (
        <div className="mt-10 border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Add a Comment
          </h3>

          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Write your comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 pr-28 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
            />

            <button
              onClick={handleCommentSubmit}
              className="absolute right-1 top-1 bottom-1 px-5 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;