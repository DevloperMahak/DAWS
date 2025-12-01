import {API} from "./axios";

// export const reqAgent = (payload: { text: string; model: string }) =>
//   API.post("/agents/requirements", payload);

// export const planAgent = (requirements: string) =>
//   API.post("/agents/planning", { requirements });

export const planAgent = (data: { goal: string }) =>
  API.post("/agents/planning", data);


export const docsAgent = (requirements , model = "gpt-4o-mini") =>
  API.post("/agents/docs", { requirements , model });

export const devChatAgent = (message: string) =>
  API.post("/agents/dev", { message });

export const knowledgeAgent = (query: string) =>
  API.post("/agents/knowledge", { query });

export const reqAgent = (formData: FormData) =>
  API.post("/agents", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  // 🔹 A2A Messaging (Planner -> Requirements OR Requirements -> Planner)
export const a2aMessage = (payload: {
  from: string;
  to: string;
  message: string;
}) => API.post("/agents/run", payload);

export const fetchInbox = async (agent) => {
  const res = await fetch(`http://localhost:5000/a2a/inbox/${agent}`);
  return await res.json();
};


