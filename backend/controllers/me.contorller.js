import User from "../models/user.model.js";

export const getMe = async (req, resp) => {
    const username = req.body;
    const data = await User.findOne(username);

    if(data){
        return resp.status(200).json(data);
    }else {
        return resp.status(400).send("No user found");
    }

}