import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const baseurl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseurl}/api/auth/forgot-password`, {
        email,
      });
      setMsg({ type: 'success', text: res.data.message });
    } catch (err) {
      setMsg({ type: 'error', text: err?.response?.data?.message || "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
           <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
             Forgot password?
           </h2>
           <p className="text-sm text-gray-500 mt-2">
             No worries, we'll send you reset instructions
           </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 
                           placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg 
                         text-sm transition-all duration-200 shadow-sm"
            >
              {loading ? "Sending link..." : "Reset password"}
            </button>
          </form>

          {msg && (
            <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${
              msg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {msg.text}
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          <Link
            to="/login"
            className="text-gray-500 font-medium hover:text-gray-900 transition-colors flex items-center justify-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
