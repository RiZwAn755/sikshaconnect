import jwt from 'jsonwebtoken';
const access_token_secret = process.env.ACCESS_TOKEN_SECRET||"jhcgkhcxxgxkfg";

export const authMiddleware = async(req, resp, next)=>{
   try{
      const accessToken = req.cookies.accessToken;
      
      if(!accessToken){
         return resp.status(401).json({message:"no access token provider"})
      }

      jwt.verify(accessToken, access_token_secret, async(err,decoded)=>{
         if(!err){
            req.user = decoded;
            return next();
         }
      })
   } catch(err){
     resp.status(500).json({ message: "Middleware error", error: error.message });
   }
    
   
}