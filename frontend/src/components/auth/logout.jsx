import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from  "js-cookie";

const baseurl = import.meta.env.VITE_BASE_URL;
const Logout = () => {
  const navigate = useNavigate();

    const handleLogout = async(e) =>{
        e.preventDefault();
       const res = await axios.get(`${baseurl}/api/auth/logout`)
       if(res){
        Cookies.remove('token');
        localStorage.removeItem('userid');
        navigate('/landing');
       }else{
        return {"message":"unable to logout"};
       }
    }

    return (
        <>
        <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-black rounded-sm">Logut</button>
        </>
    )
}
export default Logout;