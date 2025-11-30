import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import agentsRoutes from "./routes/agentsRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";

const app = express();

app.use(cors({ origin: "https://daws-frontend.onrender.com" }));

app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/auth", authRoutes);
app.use("/agents", agentsRoutes);
app.use("/projects", projectRoutes);
export default app;
