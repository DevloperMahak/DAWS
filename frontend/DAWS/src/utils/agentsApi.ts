import { API } from "./axios";

export const runAutonomousBuilder = (data: {
  projectName: string;
  description: string;
}) => API.post("/workflow/project-plan", data);

// ✅ Requirements Agent
export const reqAgent = (formData: FormData) =>
  API.post("/agents", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

// ✅ Planner Agent
export const planAgent = (data: {
  goal: string;
  projectId: string;
}) => API.post("/agents/planning", data);

// ✅ Docs Agent
export const docsAgent = (
  requirements: string,
  projectId: string,
  model = "gpt-4o-mini"
) =>
  API.post("/agents/docs", {
    requirements,
    model,
    projectId,
  });

// ✅ Dev Agent
export const devChatAgent = (
  message: string,
  projectId: string
) =>
  API.post("/agents/dev", {
    message,
    projectId,
  });

// ✅ Knowledge Agent
export const knowledgeAgent = (
  query: string,
  projectId: string
) =>
  API.post("/agents/knowledge", {
    query,
    projectId,
  });

// ✅ A2A Messaging
export const a2aMessage = (payload: {
  from: string;
  to: string;
  message: string;
  projectId: string;
}) => API.post("/agents/run", payload);

// ✅ Inbox Fetch
export const fetchInbox = async (
  agent: string,
  projectId: string
) => {
  const res = await API.get(
    `/agents/inbox/${agent}?projectId=${projectId}`
  );
  return res.data;
};


