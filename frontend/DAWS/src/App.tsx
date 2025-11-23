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
      <Route
        path="/"
        element={
          <AppLayout>
            <Home />
          </AppLayout>
        }
      />
      <Route
        path="/requirements"
        element={
          <AppLayout>
            <RequirementsAgent />
          </AppLayout>
        }
      />
      <Route
        path="/planner"
        element={
          <AppLayout>
            <PlannerAgent />
          </AppLayout>
        }
      />
      <Route
        path="/docs"
        element={
          <AppLayout>
            <DocumentationAgent />
          </AppLayout>
        }
      />
      <Route
        path="/assistant"
        element={
          <AppLayout>
            <DevAssistantAgent />
          </AppLayout>
        }
      />
      <Route
        path="/knowledge"
        element={
          <AppLayout>
            <KnowledgeAgent />
          </AppLayout>
        }
      />
    </Routes>
  );
}
