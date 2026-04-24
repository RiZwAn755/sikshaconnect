import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [newpass, setNewpass] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const baseurl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newpass !== confirmpass) {
      setMsg({ type: 'error', text: "Passwords do not match" });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${baseurl}/api/auth/reset-password/${token}`,
        { newPassword: newpass }
      );

      setMsg({ type: 'success', text: res.data.message });
      setTimeout(() => navigate("/login"), 2000);
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
             Set new password
           </h2>
           <p className="text-sm text-gray-500 mt-2">
             Must be at least 8 characters long
           </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                New Password
              </label>
              <input
                type="password"
                value={newpass}
                onChange={(e) => setNewpass(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 
                           placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Confirm new password
              </label>
              <input
                type="password"
                value={confirmpass}
                onChange={(e) => setConfirmpass(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 
                           placeholder-gray-400 focus:outline-none focus:ring-2 
                           focus:ring-blue-500/20 focus:border-blue-500 transition-all sm:text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg 
                         text-sm transition-all duration-200 shadow-sm mt-2"
            >
              {loading ? "Resetting..." : "Reset password"}
            </button>
          </form>

          {msg && (
            <div className={`mt-4 p-3 rounded-lg text-sm font-medium text-center ${
              msg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {msg.text}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ResetPassword;
