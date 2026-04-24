// for app.listen
import './config/db.js'
import cluster from 'cluster';
import os from 'os';

import express from "express";
import authRoutes from './routes/auth.route.js';
import paymentRoutes from './routes/payment.route.js'
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import friendshipRoutes from "./routes/friendship.route.js"
import taskRoutes from "./routes/task.route.js"
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cookieParser());

const corsOptions = {
	origin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
	credentials: true,
};
app.use(cors(corsOptions));
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/friendship", friendshipRoutes)
app.use("/api/task", taskRoutes)





app.get("/", (req, resp) => {
    resp.send("hii");
})



































// const numcpus = os.cpus().length;
// console.log(numcpus);

// if(cluster.isPrimary){ // primary node serves as load balancer

//     for(let i = 0;  i < numcpus; i++){
//         cluster.fork();
//     }
// }else{
// app.listen(3000, () => {
//     console.log(`Server running on port 3000 with process id ${process.pid}`);
// });
// }
app.listen(3000, () => {
    console.log(`Server running on port 3000 with process id ${process.pid}`);
});
