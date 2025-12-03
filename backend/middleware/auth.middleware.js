import jwt from 'jsonwebtoken';
import { access_token_secret,refresh_token_secret } from '../config/config.js';
import { generateAccessToken,generateRefreshToken } from '../utils/generatetokens.js';
import User from '../models/user.model.js';


export const authMiddleware = async(req, resp, next)=>{
   try{
      const accessToken = req.cookies.accessToken;
      const refreshToken = req.cookies.refreshToken;

      if(!accessToken){
         return resp.status(401).json({message:"no access token provider"})
      }

      jwt.verify(accessToken, access_token_secret, async(err,decoded)=>{
         if(!err){
            req.username = decoded.username;
            return next();
         }

         if(err.name === "TokenExpiredError" && refreshToken){
            try{
               const user = await User.findOne({refreshToken});

               if(!user){
                  return resp.status(403).json({message:"Invalid refresh token in db"})
               }
             jwt.verify(refreshToken , refresh_token_secret, async(  refresherr, decoded)=>{
               if(refresherr) return resp.status(403).json({message: "refresh token expired"});

               const newAccessToken =generateAccessToken(user.username);
               const newRefreshToken =generateRefreshToken(user.username);
          
               user.refreshToken = newRefreshToken;
               await user.save();
            console.log("new token generate from refresh token");
            resp.cookie("accessToken", newAccessToken, {
              httpOnly: true,
              secure: false,
              sameSite: "lax",
            });
            resp.cookie("refreshToken", newRefreshToken, {
              httpOnly: true,
              secure: false,
              sameSite: "lax",
            });
          req.username = user.username;
          next();
            })  
            }
            catch(err){
               return resp.status(500).json({message:"token refresh failed"})
            }
         }
      })


   } catch(err){
     resp.status(500).json({ message: "Middleware error", error: error.message });
   }
    
   
}