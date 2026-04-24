import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const baseurl = import.meta.env.VITE_BASE_URL;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Username and password are required");
      return;
    }
    
    setLoading(true);
    try {
      const res = await axios.post(
        `${baseurl}/api/auth/login`,
        { username, password },
        { withCredentials: true }
      );
      localStorage.setItem("userid", res.data.userid);
      window.dispatchEvent(new Event("authStateChanged"));
      if (res.status === 200) navigate("/");
    } catch (error) {
      alert("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
           <img src="/newlogo.png" alt="Logo" className="h-12 w-auto mx-auto mb-4 object-contain mix-blend-multiply" />
           <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
             Welcome back
           </h2>
           <p className="text-sm text-gray-500 mt-2">
             Please enter your details to sign in
           </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Username
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 
                           placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                placeholder="Enter your username"
                required
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <Link
                  to="/forgot-pass"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 
                             placeholder-gray-400 focus:outline-none focus:ring-2 
                             focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                  )}
                </button>
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg 
                         text-sm transition-all duration-200 shadow-sm flex items-center justify-center"
              type="submit"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
          >
            Sign up
          </Link>
        </p>

      </div>
    </main>
  );
};

export default Login;
