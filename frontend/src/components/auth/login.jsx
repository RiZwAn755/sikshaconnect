import { useEffect, useState } from "react";
import axios from "axios";

   const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const baseurl = import.meta.env.BASE_URL;

     const handleSubmit = async (e) =>{
        e.preventDefault();

        const res = await axios.post(`${baseurl}/api/auth/login`, 
            {username : username.trim() , password: password.trim()},
            Headers = {"Content-Type": "application/json"}
        );
        if(res && res.token){

            cookieStore.set("toke" , res.token);
            alert("login successfull");
        }
    }

    useEffect(handleSubmit, []);

    return (

        <>
           <h3> whooo!! Welcome back </h3>
           <form onSubmit={handleSubmit}>
            <input value={username} onChange={(e) => {setUsername(e.target.value)}} type="text" placeholder="Username" />
            <input value={password} onChange = {(e) => {setPassword(e.target.password)}} type="password" placeholder="password"/>
            <button type="submit">Login</button>
           </form>
        </>
    )

}
   

export default Login;


