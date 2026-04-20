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
        console.error("Error fetching blogs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-600 text-lg">
        Loading blogs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Latest Blogs
        </h1>

        {blogData.length > 0 ? (
          <div className="grid gap-6">
            {blogData.map((blog) => (
              <div
                key={blog._id}
                onClick={() => navigate(`/blogs/${blog._id}`)}
                className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer border border-gray-100"
              >
           
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  {blog.title}
                </h2>

            
                <p className="text-sm text-gray-500 mb-3">
                  By {blog.author?.fullName || "Unknown"}
                </p>

         
                <p className="text-gray-700 line-clamp-3">
                  {blog.content}
                </p>

               
                <div className="mt-4 text-blue-500 text-sm font-medium">
                  Read more →
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No blogs found</p>
        )}
      </main>
    </div>
  );
};

export default Home;