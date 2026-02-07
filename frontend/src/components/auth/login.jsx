import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseurl = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Username and password are required");
      return;
    }
    try {
    const res = await axios.post(
  `${baseurl}/api/auth/login`,
  { username, password },
  { withCredentials: true }
);
    localStorage.setItem("userid", res.data.userid);
    if (res.status === 200) navigate("/");
    
  }
  catch (error) {
    alert("Login failed ");
  }
};

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-8">


          <h2 className="text-2xl font-semibold text-gray-900 text-center tracking-tight">
            Welcome Back
          </h2>

          <p className="text-center text-sm text-gray-500 mt-2">
            Please sign in to continue
          </p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black 
                           placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-red-600 focus:border-red-600 transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black 
                           placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-red-600 focus:border-red-600 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
              />
            </div>
            <button
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl 
                         text-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              type="submit"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Forgot your password?{" "}
            <span
              onClick={() => navigate("/forgot-pass")}
              className="text-red-600 font-medium hover:underline cursor-pointer"
            >
              Reset here
            </span>
          </p>

        </div>
      </div>
    </main>
  );
};

export default Login;
