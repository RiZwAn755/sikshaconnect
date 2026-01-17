import express from "express"
import {addFriend, actionRequest, getFriends, getFriendshipDetails} from "../controllers/friendship.controller.js";
const router = express.Router();

router.post("/addFriend",addFriend);
router.put("/actionRequest", actionRequest);
router.get("/friends", getFriends);
router.get("/:friendshipId", getFriendshipDetails);

export default router;