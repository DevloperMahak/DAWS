import express from "express";
import { runPlanningWorkflow } from "../controllers/workflowController.js";

const router = express.Router();

router.post("/project-plan", runPlanningWorkflow);

export default router;
