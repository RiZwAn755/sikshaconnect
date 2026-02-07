import express from "express"
import {addFriend, actionRequest, getFriends, getFriendshipDetails, removeFriend} from "../controllers/friendship.controller.js";
const router = express.Router();

router.post("/addFriend",addFriend);
router.put("/actionRequest", actionRequest);
router.get("/friends", getFriends);
router.get("/:friendshipId", getFriendshipDetails);
router.delete("/:friendshipId", removeFriend);

export default router;