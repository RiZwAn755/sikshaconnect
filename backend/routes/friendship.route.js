import express from "express"
import {addFriend, actionRequest, getFriends} from "../controllers/friendship.controller.js";
const router = express.Router();

router.post("/addFriend",addFriend);
router.put("/actionRequest", actionRequest);
router.get("/friends", getFriends);

export default router;