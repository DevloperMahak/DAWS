import { Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Pages
import Home from "../pages/Home";
import RequirementsAgent from "../agents/RequirementAgent";
import PlannerAgent from "../agents/PlannerAgent";
import DocumentationAgent from "../agents/DocumentationAgent";
import DevAssistantAgent from "../agents/DevAssistantAgent";
import KnowledgeAgent from "../agents/KnowledgeAgent";
import ProtectedRoute from "./ProtectedRoute";
import ProjectsPage from "../pages/projects";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth Routes - No Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* App Routes with Layout */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/requirements" element={<RequirementsAgent />} />
        <Route path="/planner" element={<PlannerAgent />} />
        <Route path="/docs" element={<DocumentationAgent />} />
        <Route path="/assistant" element={<DevAssistantAgent />} />
        <Route path="/knowledge" element={<KnowledgeAgent />} />
      </Route>
    </Routes>
  );
}
