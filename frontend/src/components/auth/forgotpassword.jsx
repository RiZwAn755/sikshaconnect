import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const baseurl = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseurl}/api/auth/forgot-password`, {
        email,
      });
      setMsg(res.data.message);
    } catch (err) {
      setMsg("Something went wrong");
      console.log(err);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center px-4 bg-white">
      <div className="max-w-md w-full bg-white border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-2xl p-8">

      
        <h2 className="text-2xl font-semibold text-gray-900 text-center tracking-tight">
          Forgot Password
        </h2>

        <p className="text-center text-sm text-gray-500 mt-2">
          Enter your email to receive a reset link
        </p>

        
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

       
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none 
                         focus:ring-2 focus:ring-red-600 focus:border-red-600 transition-all"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl 
                       text-lg transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
          >
            Send Reset Link
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

export default ForgotPassword;
