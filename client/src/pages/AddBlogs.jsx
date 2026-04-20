import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Addblogs = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("All fields required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/blogs/new",
        { title, content },
        { withCredentials: true }
      );

      navigate(`/blogs/${res.data._id}`);
    } catch (err) {
      console.error(err);
      alert("Failed to create blog");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 md:px-6">
      <div className="w-full max-w-3xl">
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <h2 className="mb-2 text-3xl font-black text-slate-900">
            Create Blog
          </h2>
          <p className="mb-6 text-sm text-slate-500">
            Share your ideas in a clean and readable format.
          </p>

          <input
            type="text"
            placeholder="Enter blog title..."
            className="mb-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            rows={10}
            placeholder="Write your content..."
            className="mb-6 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            Publish Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogs;