// to connect with database
import mongoose from "mongoose";
import { url } from "./config.js";

mongoose.connect(url).then(() =>  console.log("dbconnected succedfully"))
                      .catch(() =>console.log("error in connecting db"));

 export default mongoose;
