import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import agentsRoutes from "./routes/agentsRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import testGraphRoutes from "./routes/testGraphRoutes.js";
import workflowRoutes from "./routes/workflowRoutes.js";

const app = express();

//app.use(cors({ origin: "https://daws-frontend.onrender.com" }));
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

// Routes
app.use("/api", userRoutes);
app.use("/auth", authRoutes);
app.use("/agents", agentsRoutes);
app.use("/projects", projectRoutes);
app.use("/a2a", agentsRoutes);
app.use("/api", testGraphRoutes);
app.use("/workflow", workflowRoutes);
export default app;
