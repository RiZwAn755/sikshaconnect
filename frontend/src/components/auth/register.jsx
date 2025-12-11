import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !username || !email || !password) {
      alert("All fields are required");
      return;
    }

    try {
      const res = await axios.post(`${baseUrl}/api/auth/signup`, {
        name,
        username,
        email,
        password,
      });

      if (res?.data) {
        alert("Registered successfully");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed");
      }
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] p-8">

          
          <h2 className="text-2xl font-semibold text-gray-900 text-center tracking-tight">
            Create Account
          </h2>

          <p className="text-center text-sm text-gray-500 mt-2">
            Join SikshaConnect and start your journey
          </p>

        
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">

           
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black 
                           placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-red-600 focus:border-red-600 transition-all"
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

          
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black 
                           placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-red-600 focus:border-red-600 transition-all"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-black 
                           placeholder-gray-500 focus:outline-none focus:ring-2 
                           focus:ring-red-600 focus:border-red-600 transition-all"
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

          
            <button
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl 
                         text-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
              type="submit"
            >
              Create Account
            </button>
          </form>

          
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-red-600 font-medium hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>

        </div>
      </div>
    </main>
  );
};

export default Register;
