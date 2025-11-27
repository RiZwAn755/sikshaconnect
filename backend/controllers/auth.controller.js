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
    resp.status(201).send("user register succesfully");
    }
    catch(error){
        resp.status(500).send("error creating user");
    }
 }; 

 export const demo= (req, resp)=>{
     resp.status(200).send("working correctly");
 }
 
