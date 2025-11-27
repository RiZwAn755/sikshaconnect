// just for http requests related to authentication like login, signup, logout etc. and then validate using servises folder

import User from '../models/user.model.js';

 export const signup=   async(req, resp)=>{
    try{

        const data= req.body;
         if (!data.name || !data.username || !data.email || !data.password) {
            return resp.status(400).json({ message: "All fields are required" });
        }

        const user = new User(data);
        await user.save();
        resp.status(201).send("user registered succesfully");
    }catch(error){
        resp.status(500).send("error creating user");
    }
 }; 

 export const login  = async (req, resp) => {
    const {username , password} = req.body;
    const res = await User.findOne({username, password});
    if(!res){
        resp.status(401).send("user not found");
    }
    
    resp.status(200).send("login succuessfull");
 };


 
