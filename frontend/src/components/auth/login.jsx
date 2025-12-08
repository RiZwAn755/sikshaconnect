import { useState, useEffect} from "react";
import axios from "axios";

   const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const baseurl = import.meta.env.VITE_BASE_URL;
      
    const formData = {username , password};

     const handleSubmit = async (e) =>{
       e.preventDefault();
       console.log(baseurl);
       console.log( username, password);
       if(!formData.username || !formData.password){
        alert("username and password is required");
       }

       const res = await axios.post(`${baseurl}/api/auth/login`,{
        headers:{
             "Content-Type":"application/json",
        },
        body:formData
       })

       if(!res){
        alert("unable to login ");
       }
       else {
        alert("login successfull");
        console.log(res.token);
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


