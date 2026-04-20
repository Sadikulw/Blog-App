import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
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
        const res = await axios.get(
          `http://localhost:5000/api/blogs/${id}`
        );
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        console.error("Error fetching blog", err);
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
        { withCredentials: true }
      );

      toast.success("Blog updated");
      navigate(`/blogs/${id}`);
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update blog");
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Link to={`/blogs/${id}`} className="text-blue-500 mb-4">
        ⬅ Go Back
      </Link>
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-md p-8 bg-white rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>

        <input
          type="text"
          className="input input-bordered w-full mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="textarea textarea-bordered w-full mb-4"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="btn btn-primary w-full">
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default Edit;