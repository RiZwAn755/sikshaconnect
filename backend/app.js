import "./config/db.js";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import paymentRoutes from "./routes/payment.route.js";
import userRoutes from "./routes/user.route.js";
import friendshipRoutes from "./routes/friendship.route.js";
import taskRoutes from "./routes/task.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/friendship", friendshipRoutes);
app.use("/api/task", taskRoutes);

app.get("/", (req, resp) => {
  resp.send("hii");
});

export default app;
