import express from "express";
import authRoutes from './routes/auth.route.js';
import paymentRoutes from './routes/payment.route.js'
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import friendshipRoutes from "./routes/friendship.route.js"
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/friendship", friendshipRoutes)




export default app;