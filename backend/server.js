import express from "express";
import authRoutes from './routes/auth.route.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("working");
});

export default app;