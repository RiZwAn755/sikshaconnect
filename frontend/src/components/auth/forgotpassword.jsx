import { useState } from "react";
import axios from "axios";

const ForgotPassword = ()=>{
    const [email, setEmail] = useState("");
    const [msg ,setMsg] = useState("");
    const baseurl = import.meta.env.VITE_BASE_URL;

     const handleSubmit = async(e)=>{
       e.preventDefault();
       try{
       const res = await axios.post(`${baseurl}/api/auth/forgot-password`,{
        email
       })
       setMsg(res.data.message);
    } catch(err){
          setMsg("something went wrong")
         console.log(err)
    }
     }
    return (
        <>
        <h2>forgot password</h2>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
            <button type="submit">Send reset link</button>
        </form>
        <p>{msg}</p>
        </>
    )
}
export default ForgotPassword;