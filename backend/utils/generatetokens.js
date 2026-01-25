import jwt from 'jsonwebtoken';
import {refresh_token_secret, access_token_secret , reset_token_secret} from '../config/config.js';

export const generateAccessToken= (user)=>{
    return jwt.sign(user,  access_token_secret, {expiresIn: "10m"});
}

export const generateRefreshToken= (user)=>{
    return jwt.sign(user, refresh_token_secret, {expiresIn: "7d"});
}

export const generateResetToken = (id)=>{
     return jwt.sign({id}, reset_token_secret, {expiresIn: "1h"})
}