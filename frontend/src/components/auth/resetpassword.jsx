import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const [newpass, setNewpass] = useState("");
  const [confirmpass, setConfirmpass] = useState("");
  const [msg, setMsg] = useState("");

  const baseurl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newpass !== confirmpass) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${baseurl}/api/auth/reset-password/${token}`,
        {
          newPassword: newpass,
        }
      );

      setMsg(res.data.message);
      navigate("/login");

    } catch (err) {
      setMsg("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center px-4 bg-white">
      <div className="max-w-md w-full bg-white border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-2xl p-8">

       
        <h2 className="text-2xl font-semibold text-gray-900 text-center tracking-tight">
          Reset Password
        </h2>

        <p className="text-center text-sm text-gray-500 mt-2">
          Enter your new password to regain access
        </p>

        
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              type="password"
              value={newpass}
              onChange={(e) => setNewpass(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none 
                         focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all"
              placeholder="Enter new password"
              required
            />
          </div>

        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmpass}
              onChange={(e) => setConfirmpass(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none 
                         focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all"
              placeholder="Confirm new password"
              required
            />
          </div>

          
          <button
            type="submit"
            className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl 
                       text-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            Reset Password
          </button>
        </form>

       
        {msg && (
          <p className="mt-4 text-center text-sm font-medium text-gray-700">
            {msg}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
