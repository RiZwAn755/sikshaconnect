// endpoints

import express from 'express';
import {signup, login, logout} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup",signup);
router.post("/login", login);
router.get("/logout", logout);

router.get("/testAuth", authMiddleware, (req, res) => {
  res.json({ message: "Protected route", username: req.username });
});

export default router;