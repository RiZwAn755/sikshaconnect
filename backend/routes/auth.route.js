// endpoints
import express from 'express';
import {signup, demo} from '../controllers/auth.controller.js';

const router = express.Router();

router.post("/signup",signup);
router.get("/demo", demo);
export default router;