import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AppLayout from "./layouts/AppLayout";
import RequirementsAgent from "./agents/RequirementAgent";
import PlannerAgent from "./agents/PlannerAgent";
import DocumentationAgent from "./agents/DocumentationAgent";
import DevAssistantAgent from "./agents/DevAssistantAgent";
import KnowledgeAgent from "./agents/KnowledgeAgent";

export default function App() {
  return (
    <Routes>
      {/* Layout Route */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/requirements" element={<RequirementsAgent />} />
        <Route path="/planner" element={<PlannerAgent />} />
        <Route path="/docs" element={<DocumentationAgent />} />
        <Route path="/assistant" element={<DevAssistantAgent />} />
        <Route path="/knowledge" element={<KnowledgeAgent />} />
      </Route>
    </Routes>
  );
}
