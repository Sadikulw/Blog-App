import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Addblogs = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("All fields required");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("tags", tags);
      if (image) {
        formData.append("image", image);
      }
      const res = await axios.post(
        "/api/blogs/new",
        formData,
        { withCredentials: true },
      );
      toast.success("Blog created");
      navigate(`/blogs/${res.data._id}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to create blog");
      setLoading(false);
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
            disabled={loading}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            rows={10}
            placeholder="Write your content..."
            className="mb-6 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            value={content}
            disabled={loading}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="w-full max-w-md">
            <label
              htmlFor="tags"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Select Tag
            </label>

            <select
              name="tags"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-700 shadow-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100 hover:border-slate-400"
            >
              <option value="">Choose a tag...</option>
              <option value="coding">Coding</option>
              <option value="Technology">Technology</option>
              <option value="web-development">Web Development</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="fullstack">Full Stack</option>
              <option value="javascript">JavaScript</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
              <option value="mongodb">MongoDB</option>
              <option value="express">Express.js</option>
              <option value="nextjs">Next.js</option>
              <option value="api">API Development</option>
              <option value="database">Database</option>
              <option value="devops">DevOps</option>
              <option value="ai">AI / Machine Learning</option>
              <option value="cybersecurity">Cyber Security</option>
              <option value="cloud">Cloud Computing</option>
              <option value="dsa">DSA</option>
              <option value="system-design">System Design</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="file"
              name="image"
              accept="image/png,image/jpeg,image/jpg"
              className="w-full text-sm text-gray-500
    file:mr-4 file:py-2 file:px-4
    file:rounded-full file:border-0
    file:text-sm file:font-semibold
    file:bg-orange-100 file:text-orange-600
    hover:file:bg-orange-200 py-4 transition cursor-pointer "
              disabled={loading}
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-500"
          >
            {loading ? (
              <>
                <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Uploading blog...
              </>
            ) : (
              "Publish Blog"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogs;
