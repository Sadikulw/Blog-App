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

      console.log("Blog created:", res.data);

    
      navigate(`/blogs/${res.data._id}`);
    } catch (err) {
      console.error("Error creating blog:", err);
      alert("Failed to create blog");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}   
        className="w-full max-w-md p-8 bg-white rounded shadow"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Add New Blog
        </h2>

        <input
          type="text"
          placeholder="Blog Title"
          className="input input-bordered w-full mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Blog Content"
          className="textarea textarea-bordered w-full mb-4"
          rows={6}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="btn btn-primary w-full">
          Submit Blog
        </button>
      </form>
    </div>
  );
};

export default Addblogs;