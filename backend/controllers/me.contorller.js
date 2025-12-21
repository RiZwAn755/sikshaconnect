import User from "../models/user.model.js";
import mongoose from "mongoose";

export const getMe = async (req, res) => {
    try {
        const { userid } = req.query; // coming from frontend
        if (!userid) {
            return res.status(400).json({ message: "userid is required" });
        }
        // prevent Mongo CastError
        if (!mongoose.Types.ObjectId.isValid(userid)) {
            return res.status(400).json({ message: "Invalid userid" });
        }
        const user = await User.findById(userid).select("username email name friends createdAt");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    } catch (err) {
        console.error("getMe error:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const search = async (req, resp) => {
    const { username } = req.body;
    const res = await User.findOne({ username });
    if (res) {
        return resp.status(200).json(res);
    } else {
        return resp.status(404).json({ "message": "no user with this username" });
    }
}

   
