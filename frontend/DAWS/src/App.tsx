import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AppLayout from "./layouts/AppLayout";
import RequirementsAgent from "./agents/RequirementAgent";
import PlannerAgent from "./agents/PlannerAgent";

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
      {/* <Route
        path="/docs"
        element={
          <AppLayout>
            <DocsPage />
          </AppLayout>
        }
      />
      <Route
        path="/assistant"
        element={
          <AppLayout>
            <DevAssistantPage />
          </AppLayout>
        }
      />
      <Route
        path="/knowledge"
        element={
          <AppLayout>
            <KnowledgePage />
          </AppLayout>
        } 
      />*/}
    </Routes>
  );
}
