import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );

      setUser(null);
      toast.success("Logout successful");

      setTimeout(() => navigate("/"), 800);
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50">
      <Toaster position="top-right" />

      <nav className="flex items-center justify-between px-6 py-3 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
        
 
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-gray-800 hover:opacity-80 transition"
        >
          write<span className="text-orange-500">Hub</span>
        </Link>

       
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-500 transition">
            Home
          </Link>
        </div>

  
        <div className="flex items-center gap-3">
          {user ? (
            <>
             
              <span className="hidden sm:block text-sm text-gray-600">
                Hi, <span className="font-semibold">{user.fullName}</span>
              </span>

             
              <button
                onClick={() => navigate("/add-blog")}
                className="px-4 py-2 text-sm font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition shadow-sm"
              >
                + Add Blog
              </button>

             
              <button
                onClick={logout}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-full hover:bg-red-600 transition shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-semibold text-blue-500 border border-blue-500 rounded-full hover:bg-blue-500 hover:text-white transition"
              >
                Login
              </Link>

           
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 transition shadow-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;