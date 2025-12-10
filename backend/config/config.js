// all .env variables will be here


 import dotenv from 'dotenv';
 dotenv.config();

 export const url= process.env.MONGO_URI;
 export const refresh_token_secret= process.env.REFRESH_SECRET;
 export const access_token_secret= process.env.ACCESS_SECRET;
 export const reset_token_secret= process.env.JWT_RESET_SECRET;