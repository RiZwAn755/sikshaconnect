import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const baseurl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("username and password are required");
      return;
    }

    try {
      const res = await axios.post(`${baseurl}/api/auth/login`, {
        username,
        password,
      });

      if (res?.data?.token) {
        Cookies.set("token", res.data.token);
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.log(err);
      alert("Login error");
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-md px-6 py-8">
        <div className="bg-black text-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-red-500">Sign in</h2>
          <p className="text-sm text-gray-200 mt-2">Welcome back — enter your credentials</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              className="w-full px-4 py-2 rounded-sm bg-white text-black placeholder-gray-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Username"
            />

            <input
              className="w-full px-4 py-2 rounded-sm bg-white text-black placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
            />

            <button className="w-full py-2 bg-red-500 text-black font-semibold rounded-sm" type="submit">
              Login
            </button>
          </form>
          
        </div>
         <button onClick={()=>navigate('/forgot-pass')}>forgot password</button>
      </div>
    </main>
  );
};

export default Login;


