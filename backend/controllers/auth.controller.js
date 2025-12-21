import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import SendEmail from "../utils/sendemail.js";
import { generateAccessToken, generateRefreshToken, generateResetToken } from "../utils/generatetokens.js";
import { reset_token_secret } from "../config/config.js";

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
    resp.status(200).json({ message: "login successfull", token: accessToken, userid: res._id });
  } catch (error) {
    resp.status(500).json({ message: "login failed", error: error.message });
  }
};

export const logout = async (req, resp) => {
  const refreshToken = req.cookies.refreshToken;
  if (refreshToken) {
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }
  resp.clearCookie("token");
  resp.clearCookie("refreshToken");

  resp.json({ message: "logged out successfully" });
};

export const forgotPassword = async (req, resp) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return resp.json({ message: "If email exists, reset link sent" });

  const token = generateResetToken(user._id);
  const resetURL = `http://localhost:5173/reset-password/${token}` // ya deployed frontend ka url 

  await SendEmail({
    to: email,
    subject: "Reset Your Password",

    html: `
         <p>Reset your password </p>
         <a href="${resetURL}">${resetURL}</a>`
  })
  console.log("Generated token:", token);

  resp.json({ message: "if email exist , reset link sent" });

}

export const resetPassword = async (req, resp) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!newPassword) return resp.status(400).json({ message: "missing new password" });
  if (!token) return resp.status(400).json({ message: "invalid or missing token" });

  try {
    const decoded = jwt.verify(token, reset_token_secret);
    console.log("Decoded token:", decoded);

    const user = await User.findById(decoded.id);
    if (!user) return resp.status(400).json({ message: "user not found" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();
    resp.json({ message: "password reset successfully" });
  } catch (err) {
    resp.status(400).json({ message: "token expired or invalid" });
  }

}
