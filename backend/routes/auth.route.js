// endpoints

import express from 'express';
import {signup, login, logout,forgotPassword, resetPassword, refresh} from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/signup",signup);
router.post("/login", login);
router.get("/logout", logout);
router.post("/refresh", refresh);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password/:token",resetPassword);
router.get("/testAuth", authMiddleware, (req, res) => {
  res.json({ message: "Protected route", username: req.username });
});

export default router;