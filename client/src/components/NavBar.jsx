import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );

      setUser(null);
      toast.success("Logged out");
      navigate("/");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/70 bg-white/80 shadow-sm backdrop-blur-xl">
      <Toaster position="top-right" />

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <Link
          to="/"
          className="text-2xl font-black tracking-tight text-slate-900"
        >
          write<span className="text-orange-500">Hub</span>
        </Link>

        <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <Link className="transition hover:text-slate-900" to="/">
            Home
          </Link>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-xs font-bold text-white">
                  {user.fullName?.charAt(0)}
                </div>
                <span className="text-sm font-medium text-slate-700">
                  {user.fullName}
                </span>
              </div>

              <button
                onClick={() => navigate("/add-blog")}
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
              >
                + Write
              </button>

              <button
                onClick={logout}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                Sign in
              </Link>

              <Link
                to="/register"
                className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg p-2 text-2xl text-slate-700 transition hover:bg-slate-100 md:hidden"
        >
          ☰
        </button>
      </nav>

      {menuOpen && (
        <div className="space-y-4 border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur-lg md:hidden">
          <Link className="block text-slate-700" to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          {user ? (
            <>
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-rose-500 text-xs font-bold text-white">
                  {user.fullName?.charAt(0)}
                </div>
                <span className="text-slate-700">{user.fullName}</span>
              </div>

              <button
                onClick={() => {
                  navigate("/add-blog");
                  setMenuOpen(false);
                }}
                className="block w-full rounded-lg bg-slate-900 px-3 py-2 text-left font-semibold text-white"
              >
                + Write
              </button>

              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="block w-full rounded-lg border border-red-200 px-3 py-2 text-left font-semibold text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="block text-slate-700" to="/login" onClick={() => setMenuOpen(false)}>
                Sign in
              </Link>
              <Link className="block text-slate-700" to="/register" onClick={() => setMenuOpen(false)}>
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default NavBar;