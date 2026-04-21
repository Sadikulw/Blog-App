import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
        setCurrentImage(res.data.image || "");
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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);

    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/blogs/${id}`,
        formData,
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

          {currentImage && (
            <img
              src={currentImage}
              alt={title}
              className="mb-4 h-48 w-full rounded-xl object-cover"
            />
          )}

          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="mb-6 w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-orange-100 file:px-4 file:py-2 file:font-semibold file:text-orange-600 hover:file:bg-orange-200"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
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
