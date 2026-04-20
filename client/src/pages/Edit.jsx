import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        { title, content },
        { withCredentials: true },
      );

      toast.success("Blog updated");
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update blog");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 md:px-6">
      <div className="w-full max-w-3xl">
        <Link
          to={`/blogs/${id}`}
          className="mb-4 inline-block text-sm font-medium text-slate-600 hover:text-slate-900 hover:underline"
        >
          {"<-"} Go Back
        </Link>

        <form
          onSubmit={handleUpdate}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
        >
          <h2 className="mb-2 text-3xl font-black text-slate-900">Edit Blog</h2>
          <p className="mb-6 text-sm text-slate-500">
            Refine your draft before publishing updates.
          </p>

          <input
            type="text"
            className="mb-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title..."
          />

          <textarea
            rows={10}
            className="mb-6 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your content..."
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            Update Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
