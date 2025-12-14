import express from 'express';
import { getMe, search} from '../controllers/me.contorller.js';

const router = express.Router();
router.get("/me", getMe);
router.post("/search", search);

export default router;