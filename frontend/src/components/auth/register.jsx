import {useState} from "react";
import axios from "axios";

const Register =()=>{
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] =useState("")
    const [password, setPassword] = useState("");
    const baseUrl = import.meta.env.VITE_BASE_URL;
   
     const  handleSubmit= async(e)=>{
        e.preventDefault();

         const formData= {name, username, email, password};
         
        if(!name || !username || !email || !password){
            alert("all the fields are required");
        }
        
         try{
        const res = await axios.post(`${baseUrl}/api/auth/signup`,{
            name:formData.name,
            username:formData.username,
            email:formData.email,
            password:formData.password,

        })

        alert("registered successfully")
         
         }
         catch(error) {
               if(error.response){
                alert( " username is already taken", error.response.data.message);
               }
         }
    
     }

    return(
         <>
         <h3>Register</h3>
         <form onSubmit={handleSubmit}>
            <input type="text" placeholder="enter name" value={name} onChange={(e)=>setName(e.target.value)} />
            <input type="text" placeholder="enter username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
            <input type="email" placeholder="enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <button type='submit'>Submit</button>

         </form>
         </>
    )
}

export default Register;