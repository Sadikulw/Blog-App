import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = ({ setUser }) => {  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        { withCredentials: true }
      );

   
      setUser(res.data.user);

      toast.success("Login successful");

      setTimeout(() => navigate("/"), 1000);

    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error");
      }
    }
  };

  return (
    <div className="min-h-screen flex">
    

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-base-100">
        <div className="w-full max-w-md p-8">

          <h2 className="text-3xl font-bold text-center mb-2">LOGIN</h2>

          <div className="form-control mb-4">
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-control mb-4">
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button onClick={handleLogin} className="btn btn-primary w-full mb-4">
            Login Now
          </button>

          <p className="text-center text-gray-500">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-500 cursor-pointer"
            >
              Register
            </span>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;