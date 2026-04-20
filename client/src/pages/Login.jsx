import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("All fields required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        { withCredentials: true },
      );

      setUser(res.data.user);
      toast.success("Welcome back ");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <div className="hidden w-1/2 items-center justify-center bg-slate-900 p-10 text-white lg:flex">
        <div>
          <h1 className="mb-4 text-5xl font-extrabold">
            Welcome to <span className="text-orange-500">writeHub</span>
          </h1>
          <p className="text-lg text-slate-300">
            Share your ideas, write blogs, and explore content from others.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4 py-10 lg:w-1/2">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="mb-2 text-center text-3xl font-black text-slate-900">Sign In</h2>
          <p className="mb-6 text-center text-sm text-slate-500">
            Continue to your writing dashboard.
          </p>

          <input
            type="email"
            placeholder="Email"
            className="mb-4 w-full rounded-xl border border-slate-200 px-4 py-3 placeholder-slate-400 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <input
            type="password"
            placeholder="Password"
            className="mb-6 w-full rounded-xl border border-slate-200 px-4 py-3 placeholder-slate-400 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <button
            onClick={handleLogin}
            className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            Login
          </button>

          <p className="mt-5 text-center text-sm text-slate-500">
            Don’t have an account?{" "}
            <Link to="/register" className="font-semibold text-orange-500 hover:underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
