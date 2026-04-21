import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("/api/blogs");
        setBlogData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const filteredBlogs = blogData.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      blog.content.toLowerCase().includes(search.toLowerCase()) ||
      (blog.tags && blog.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())))
  );

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

  const featuredBlog = blogData.find((blog) => blog.image) || blogData[0];

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div
          onClick={() => navigate(`/blogs/${featuredBlog._id}`)}
          className="mb-8 grid cursor-pointer overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg md:grid-cols-2"
        >
          {featuredBlog.image ? (
            <img
              src={featuredBlog.image}
              alt={featuredBlog.title}
              className="h-72 w-full object-cover md:h-full"
            />
          ) : (
            <div className="flex h-72 items-center justify-center bg-gradient-to-br from-orange-200 via-amber-100 to-white text-3xl font-black uppercase tracking-[0.2em] text-slate-700">
              Blog
            </div>
          )}

          <div className="flex flex-col justify-center p-8">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
              Featured Story
            </p>

            <h1 className="mb-4 text-4xl font-black tracking-tight text-slate-900">
              {featuredBlog.title}
            </h1>

            <p className="mb-3 text-sm font-medium text-slate-500">
              {featuredBlog.author?.fullName || "Unknown"}
            </p>

            <p className="line-clamp-3 leading-relaxed text-slate-600">
              {featuredBlog.content}
            </p>

            <span className="mt-6 text-sm font-semibold text-orange-500">
              Read featured blog
            </span>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 mx-auto mb-8">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs..."
            className="w-full rounded-full border border-slate-200 px-5 py-3 pr-32 shadow-sm outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
          />

          <button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-slate-900 px-6 py-2 text-sm text-white transition hover:bg-slate-700">
            Search
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-5 md:col-span-2">
            <h2 className="mb-6 text-3xl font-black tracking-tight text-slate-900">
              Explore blogs
            </h2>

            {filteredBlogs.map((blog) => (
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
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {Array.isArray(blog.tags)
                    ? blog.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs font-medium rounded-full border border-slate-200 bg-slate-100 text-slate-700 hover:bg-orange-100 hover:text-orange-600 hover:border-orange-200 transition duration-200"
                        >
                          #{tag}
                        </span>
                      ))
                    : blog.tags && (
                        <span className="px-3 py-1 text-xs font-medium rounded-full border border-slate-200 bg-slate-100 text-slate-700">
                          #{blog.tags}
                        </span>
                      )}
                </div>
                <div className="mt-3 text-sm font-semibold text-orange-500 hover:underline">
                  Read more
                </div>
              </div>
            ))}
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-slate-900">Latest</h2>

              <div className="space-y-3">
                {latestBlogs.map((blog) => (
                  <div
                    key={blog._id}
                    onClick={() => navigate(`/blogs/${blog._id}`)}
                    className="flex cursor-pointer items-center gap-3 rounded-lg p-3 transition hover:bg-slate-50"
                  >
                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-orange-100 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                        Blog
                      </div>
                    )}

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

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                Trending
              </h2>

              <div className="space-y-3">
                {trendingBlogs.map((blog, index) => (
                  <div
                    key={blog._id}
                    onClick={() => navigate(`/blogs/${blog._id}`)}
                    className="flex cursor-pointer items-center gap-3 rounded-lg p-3 transition hover:bg-slate-50"
                  >
                    <span className="text-lg font-bold text-orange-500">
                      {index + 1}
                    </span>

                    {blog.image ? (
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-orange-100 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
                        Blog
                      </div>
                    )}

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
    </div>
  );
};

export default Home;
