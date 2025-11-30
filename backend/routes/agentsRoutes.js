import express from "express";
import { generateRequirements } from "../controllers/requirementController.js";
import { generatePlan } from "../controllers/planningController.js";
import { generateDocs } from "../controllers/documentationController.js";
import { devChat } from "../controllers/devController.js";

const router = express.Router();

router.post("/requirements", generateRequirements);
router.post("/planning", generatePlan);
router.post("/docs", generateDocs);
router.post("/dev", devChat);

export default router;
