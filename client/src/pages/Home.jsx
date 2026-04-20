import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        setBlogData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-lg text-slate-500">
        Loading blogs...
      </div>
    );
  }

  if (blogData.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-slate-500">
        No blogs available right now.
      </div>
    );
  }

  const latestBlogs = blogData.slice(0, 4);

  const trendingBlogs = [...blogData]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 md:px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
        <div className="space-y-5 md:col-span-2">
          <h1 className="mb-6 text-4xl font-black tracking-tight text-slate-900">
            Explore blogs
          </h1>

          {blogData.map((blog) => (
            <div
              key={blog._id}
              onClick={() => navigate(`/blogs/${blog._id}`)}
              className="cursor-pointer rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="mb-4 h-44 w-full rounded-xl object-cover"
                />
              )}

              <h2 className="mb-2 text-xl font-bold text-slate-900">
                {blog.title}
              </h2>

              <p className="mb-2 text-sm text-slate-500">
                {blog.author?.fullName || "Unknown"}
              </p>

              <p className="line-clamp-2 leading-relaxed text-slate-600">
                {blog.content}
              </p>

              <div className="mt-3 text-sm font-semibold text-orange-500 hover:underline">
                Read more →
              </div>
            </div>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Latest
            </h2>

            <div className="space-y-3">
              {latestBlogs.map((blog) => (
                <div
                  key={blog._id}
                  onClick={() => navigate(`/blogs/${blog._id}`)}
                  className="cursor-pointer rounded-lg p-3 transition hover:bg-slate-50"
                >
                  <h3 className="line-clamp-2 text-sm font-semibold text-slate-800">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-500">
                    {blog.author?.fullName || "Unknown"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-bold text-slate-900">
              Trending
            </h2>

            <div className="space-y-3">
              {trendingBlogs.map((blog, index) => (
                <div
                  key={blog._id}
                  onClick={() => navigate(`/blogs/${blog._id}`)}
                  className="flex cursor-pointer items-start gap-3 rounded-lg p-3 transition hover:bg-slate-50"
                >
                  <span className="text-lg font-bold text-orange-500">
                    {index + 1}
                  </span>

                  <div>
                    <h3 className="line-clamp-2 text-sm font-semibold text-slate-800">
                      {blog.title}
                    </h3>

                    <p className="text-xs text-slate-500">
                      {blog.author?.fullName || "Unknown"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;