// to connect with database
 import mongoose from "mongoose";
 import dotenv from 'dotenv';
 dotenv.config();
 const url= process.env.MONGO_URI;
 if (!url) {
  console.error("MONGO_URI is not defined in .env file");
  process.exit(1);
}
 mongoose.connect(url).then(
    ()=>{
         console.log("dbconnected succedfully");
    }
 ).catch(
    ()=>{
         console.log("error in connecting db");
    }
 )
     
    
 
 
 export default mongoose;
