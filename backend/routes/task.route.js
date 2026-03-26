import express from "express";
import { createGroupTask, payForTask, getUserTasks, contributeToTask } from "../controllers/task.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createGroupTask);
router.put("/pay/:taskId", authMiddleware, payForTask);
router.put("/contribute/:taskId", authMiddleware, contributeToTask);
router.get("/user", authMiddleware, getUserTasks);

export default router;
