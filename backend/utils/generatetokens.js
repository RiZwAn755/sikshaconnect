import jwt from 'jsonwebtoken';
import {refresh_token_secret, access_token_secret , reset_token_secret} from '../config/config.js';

export const generateAccessToken= ({username, id})=>{
    return jwt.sign({username, id},  access_token_secret, {expiresIn: "10m"});
}

export const generateRefreshToken= ({username, id})=>{
    return jwt.sign({username, id}, refresh_token_secret, {expiresIn: "7d"});
}

export const generateResetToken = (id)=>{
     return jwt.sign({id}, reset_token_secret, {expiresIn: "1h"})
}