import Friendship from "../models/friendship.model.js";
import User from "../models/user.model.js";
// here u1 and u2 are ids of users sent by frontend
export const addFriend = async (req, res) => {
    try {
        const { user1: u1, user2: u2 } = req.body;
        const existing = await Friendship.findOne({ $or: [{ user1: u1, user2: u2 }, { user1: u2, user2: u1 }] });
        if (existing) {
            return res.status(400).json({ message: `You have already requested` });
        }
        const friendship = await Friendship.create({
            user1: u1,
            user2: u2,
            status: "Requested"
        });

        if(u1==u2){
            return res.status(400).json({ message: "You cannot send friend request to yourself" });
        }
        return res.status(201).json({
            message: "Friend request sent",
            friendship
        });

    } catch (err) {
        console.error("ERROR:", err);
        return res.status(500).json({ message: "Server error" });
    }
};

export const actionRequest = async (req, res) => {
    try {
        const { user1: u1, user2: u2, action } = req.body;

        if (!u1 || !u2 || !action) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (!["Accept", "Reject"].includes(action)) {
            return res.status(400).json({ message: "Invalid action" });
        }

        const friendship = await Friendship.findOne({
            $or: [
                { user1: u1, user2: u2 },
                { user1: u2, user2: u1 }
            ]
        });
        if (!friendship) {
            return res.status(404).json({ message: "Friend request not found" });
        }
        if (friendship.status !== "Requested") {
            return res.status(400).json({ message: "Request already processed" });
        }
        
        if (action === "Accept") {
            await Friendship.updateOne(
                { _id: friendship._id },
                { status: "Accepted" }
            );
            await Promise.all([
                User.updateOne(
                    { _id: u1 },
                    { $addToSet: { friends: u2 } }
                ),
                User.updateOne(
                    { _id: u2 },
                    { $addToSet: { friends: u1 } }
                )
            ]);
            return res.status(200).json({ message: "Friend request accepted" });
        }
        //  await Friendship.updateOne(
        //     { _id: friendship._id },
        //     { status: "Rejected" }
        // );
         await Friendship.deleteOne({ _id: friendship._id });
        return res.status(200).json({ message: "Friend request rejected" });
    } catch (err) {
        console.error("Error processing friendship request:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const getFriends = async (req, res) => {
  try {
    const { user1 } = req.query;
    if (!user1) {
      return res.status(400).json({ message: "userid is required" });
    }

        const friendships = await Friendship.find({
            $or: [
                { user1: user1 },
                { user2: user1 }
            ]
        })
            .populate('user1', 'name username')
            .populate('user2', 'name username');

    return res.status(200).json({
      message: "Fetch successful",
      friendships
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Unexpected error occurred"
    });
  }
};


export const getFriendshipDetails = async (req, res)=>{
     try{
        const {friendshipId} = req.params;
        if(!friendshipId){
            return res.status(400).json({message: "friendshipId is required"});
        }
        const friendship = await Friendship.findById(friendshipId)
        .populate('user1', 'name username email')
        .populate('user2', 'name username email')
        // .populate('currentTask');

        if(!friendship){
            return res.status(404).json({message: "Friendship not found"});
        }
        return res.status(200).json({message: "Fetch successful", friendship});

     }
     catch(err){
        console.error(err);
        return res.status(500).json({message: "Unexpected error occurred"});
     }
}
