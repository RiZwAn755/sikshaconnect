import User from "../models/user.model.js";

export const getMe = async (req, resp) => {
    const {username} = req.body;
    const data = await User.findOne({username});

    if(data){
        return resp.status(200).json(data);
    }else {
        return resp.status(400).send("No user found");
    }

}

export const search = async(req, resp) =>{
    const {username} = req.body;
    const res = await User.findOne({username});
    if(res){
       return resp.status(200).json(res);
    }else{
        return resp.status(404).json({"message":"no user with this username"});
    }
}