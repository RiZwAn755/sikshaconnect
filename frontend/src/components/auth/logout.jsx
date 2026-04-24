import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseurl = import.meta.env.VITE_BASE_URL;

const Logout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`${baseurl}/api/auth/logout`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        localStorage.removeItem('userid');
        window.dispatchEvent(new Event("authStateChanged"));
        navigate('/landing');
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button 
      onClick={handleLogout} 
      disabled={loading}
      className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed font-medium rounded-lg transition-colors border border-red-100 shadow-sm text-sm flex items-center justify-center min-w-[90px]"
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        "Sign out"
      )}
    </button>
  )
}
export default Logout;