import express from "express";
import authRoutes from './routes/auth.route.js';
import paymentRoutes from './routes/payment.route.js'
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);



export default app;