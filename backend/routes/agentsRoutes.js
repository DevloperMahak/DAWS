import express from "express";
//import { generateRequirements } from "../controllers/requirementController.js";
import { generatePlan } from "../controllers/planningController.js";
import { generateDocs } from "../controllers/documentationController.js";
import { devChat } from "../controllers/devController.js";
import { knowledgeSearch } from "../controllers/knowledgeController.js";
import {
  generateRequirements,
  requirementsUpload,
} from "../controllers/requirementController.js";

const router = express.Router();

//router.post("/requirements", generateRequirements);
router.post("/", requirementsUpload, generateRequirements);
router.post("/planning", generatePlan);
router.post("/docs", generateDocs);
router.post("/dev", devChat);
router.post("/knowledge", knowledgeSearch);

export default router;
