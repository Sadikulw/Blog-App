import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!fullName || !email || !password) {
      toast.error("All fields required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/users/register",
        { fullName, email, password },
        { withCredentials: true }
      );

      toast.success("Account created 🎉");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">

      <div className="hidden w-1/2 items-center justify-center bg-slate-900 p-10 text-white lg:flex">
        <div>
          <h1 className="mb-4 text-5xl font-extrabold">
            Start your journey with
            <span className="text-orange-500">writeHub</span>
          </h1>
          <p className="text-lg text-slate-300">
            Create, share, and explore blogs from developers worldwide.
          </p>
        </div>
      </div>

      <div className="flex w-full items-center justify-center px-4 py-10 lg:w-1/2">
        <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <h2 className="mb-2 text-center text-3xl font-black text-slate-900">
            Create Account
          </h2>
          <p className="mb-6 text-center text-sm text-slate-500">
            Join and start publishing your ideas.
          </p>

          <input
            type="text"
            placeholder="Full Name"
            className="mb-4 w-full rounded-xl border border-slate-200 px-4 py-3 placeholder-slate-400 outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            onKeyDown={handleKeyDown}
          />

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
            onClick={handleRegister}
            className="w-full rounded-xl bg-slate-900 py-3 font-semibold text-white transition hover:bg-slate-700"
          >
            Register
          </button>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-orange-500 hover:underline">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;