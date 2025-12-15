import express from "express"
import {addFriend, actionRequest} from "../controllers/friendship.controller.js";
const router = express.Router();

router.post("/addFriend",addFriend);
router.put("/actionRequest", actionRequest);

export default router;