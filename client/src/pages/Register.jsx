import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password || !fullName) {
      toast.error("All fields are required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/users/register",
        { email, password, fullName },
        { withCredentials: true }
      );

      toast.success("Registration successful");
      navigate("/login");

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
             
             <h2 className="text-3xl font-bold text-center mb-2">Register</h2>
             <p className="text-center text-gray-500 mb-6">
               Welcome! Please register to create your account
             </p>
   
            
            
             <div className="form-control mb-4">
               <input
                 type="text"
                 placeholder="Full Name"
                 className="input input-bordered w-full"
                 value={fullName}
                 onChange={(e) => setFullName(e.target.value)}
               />
             </div>
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
           
             <button
               onClick={handleRegister}
               className="btn btn-primary w-full mb-4"
             >
               Register Now
             </button>
             <p className="text-center text-gray-500">
               Already have an account?{" "}
               <span
                 onClick={() => navigate("/login")}
                 className="text-blue-500 cursor-pointer"
               >
                 Login
               </span>
             </p>
           </div>
         </div>  
         
         <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-purple-600 to-indigo-600 items-center justify-center">
           <div className="text-white text-center p-10">
             <h1 className="text-4xl font-bold mb-4">
                Join Us Today 👋
             </h1>
             <p className="opacity-80">
               Register to get started with our platform
             </p>
           </div>
         </div>
       </div>
  );
};

export default Register;