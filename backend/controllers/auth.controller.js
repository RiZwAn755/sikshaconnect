// just for http requests related to authentication like login, signup, logout etc. and then validate using servises folder

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generatetokens.js";
import { refresh_token_secret } from "../config/config.js";
import jwt from "jsonwebtoken";

export const signup = async (req, resp) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return resp.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return resp.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    resp.status(201).send("user registered succesfully");
  } catch (error) {
    resp.status(500).send("error creating user");
  }
};

export const login = async (req, resp) => {
  try {
    const { username, password } = req.body;
    const res = await User.findOne({ username });
    if (!res) {
      resp.status(401).send("user not found");
    }

    const isMatch = await bcrypt.compare(password, res.password);
    if (!isMatch) {
      return resp.status(401).json({ message: "invalid password" });
    }

    const accessToken = generateAccessToken(res.username);
    const refreshToken = generateRefreshToken(res.username);

    res.refreshToken = refreshToken;
    await res.save();

    // send tokens in cookies
    resp.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    resp.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    resp.status(200).json({ message: "login successfull" });
  } catch (error) {
    resp.status(500).json({ message: "login failed", error: error.message });
  }
};

///  refresh token

// export const refreshToken = async (req, resp) => {
//   const oldRefreshToken = req.cookies.refreshToken;
//   if (!oldRefreshToken)
//     return resp.status(401).json({ message: "no refresh token" });

//   const user = await User.findOne({ refreshToken: oldRefreshToken });
//   if (!user) return resp.status(403).json({ message: "invalid refresh token" });

//   jwt.verify(oldRefreshToken, refresh_token_secret, async (err, decoded) => {
//     if (err) return resp.status(403).json({ message: "expired refresh token" });

//     // genrate karo new token
//     const newAccessToken = generateAccessToken(user.username);
//     const newRefreshToken = generateRefreshToken(user.username);

//     user.refreshToken = newRefreshToken;
//     await user.save();

//     resp.cookie("accessToken", newAccessToken, { httpOnly: true });
//     resp.cookie("refreshToken", newRefreshToken, { httpOnly: true });

//     resp.json({ message: "tokens refreshed" });
//   });
// };

///    logout

export const logout = async (req, resp) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }
  resp.clearCookie("accessToken");
  resp.clearCookie("refreshToken");

  resp.json({ message: "logged out successfully" });
};
