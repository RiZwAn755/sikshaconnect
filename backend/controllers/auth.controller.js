// just for http requests related to authentication like login, signup, logout etc. and then validate using servises folder

import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateAccessToken,generateRefreshToken,} from "../utils/generatetokens.js";


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
    resp.status(200).json({ message: "login successfull" , token : accessToken});
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
  resp.clearCookie("accessToken");
  resp.clearCookie("refreshToken");

  resp.json({ message: "logged out successfully" });
};
