import { useState  } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = ()=>{

    const navigate = useNavigate();
    const {token} =useParams();

    const [newpass, setNewpass] = useState("");
    const [confirmpass, setConfirmpass] = useState("");
    const [msg, setMsg] =useState("");
    const baseurl = import.meta.env.VITE_BASE_URL;
    const handleSubmit = async(e)=>{
       e.preventDefault();
       if(newpass != confirmpass){
         alert("password not matched")
         return;
       }
       try{
       const res = await axios.post(`${baseurl}/api/auth/reset-password/${token}` ,{
        newPassword: newpass
       })
       setMsg(res.data.message);
       navigate('/login');

    } catch(err){
         setMsg("something is wrong");
         console.log(err);
    }
    }
    return (
        <>
         <h2>Reset Password</h2>
         <form onSubmit={handleSubmit}>
            <input type="text" value={newpass} placeholder="enter new pass" onChange={(e)=>setNewpass(e.target.value)}  required/>
            <input type="text" value={confirmpass} placeholder="confirm new password" onChange={(e)=>setConfirmpass(e.target.value)}  required/>
            <button>Reset Password</button>
         </form>
         <p>{msg}</p>
        </>
    )
}
 export default ResetPassword;