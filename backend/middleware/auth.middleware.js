import jwt from 'jsonwebtoken';
import { access_token_secret } from '../config/config.js';

export const authMiddleware = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).json({ message: "No access token provided" });
  }

  jwt.verify(accessToken, access_token_secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid or expired access token" });
    }

    req.user = decoded;
    next();
  });
};
