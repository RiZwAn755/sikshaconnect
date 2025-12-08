import { useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";

   const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const baseurl = import.meta.env.VITE_BASE_URL;
      
    const formData = {username , password};

     const handleSubmit = async (e) =>{
       e.preventDefault();
       if(!formData.username || !formData.password){
        alert("username and password is required");
       }
       const res = await axios.post(`${baseurl}/api/auth/login`,{
            username:formData.username,
            password:formData.password
       })

      //  console.log(res);
       
       if(!res){
         console.log("unable to login");
       }else{
         console.log("login successfull");
         Cookies.set("token", res.data.token);         
       }
    }

    return (

        <>
           <h3> whooo!! Welcome back </h3>
           <form onSubmit={handleSubmit}>
            <input value={username} onChange = {(e) => {setUsername(e.target.value)}} type="text" placeholder="Username" />
            <input value={password} onChange = {(e) => {setPassword(e.target.value)}} type="password" placeholder="password"/>
            <button type="submit">Login</button>
           </form>
        </>
    )

}
   

export default Login;


