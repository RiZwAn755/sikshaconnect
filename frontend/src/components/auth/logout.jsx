import axios from "axios";
import { useNavigate } from "react-router-dom";


const baseurl = import.meta.env.VITE_BASE_URL;
const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${baseurl}/api/auth/logout`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        localStorage.removeItem('userid');
        navigate('/landing');
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed");
    }
  }

  return (
    <>
      <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-black rounded-sm">Logut</button>
    </>
  )
}
export default Logout;