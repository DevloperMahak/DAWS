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
import { runAgents } from "../controllers/agentController.js";
import { inboxStore } from "../a2aStore.js";

const router = express.Router();

//router.post("/requirements", generateRequirements);
router.post("/", requirementsUpload, generateRequirements);
router.post("/planning", generatePlan);
router.post("/docs", generateDocs);
router.post("/dev", devChat);
router.post("/knowledge", knowledgeSearch);
router.post("/run", runAgents);

// SEND MESSAGE (A2A)
router.post("/run", (req, res) => {
  const { from, to, message } = req.body;

  if (!to || !message) {
    return res.status(400).json({ error: "Missing fields" });
  }

  // Save message to recipient inbox
  inboxStore[to].push({
    from,
    message,
    timestamp: Date.now(),
  });

  return res.json({ success: true });
});

// FETCH INBOX FOR ANY AGENT
router.get("/inbox/:agent", (req, res) => {
  const { agent } = req.params;

  if (!inboxStore[agent]) {
    return res.status(404).json({ error: "Agent not found" });
  }

  return res.json(inboxStore[agent]);
});

export default router;
