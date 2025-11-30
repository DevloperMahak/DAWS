import {API} from "./axios";

// export const reqAgent = (payload: { text: string; model: string }) =>
//   API.post("/agents/requirements", payload);

export const planAgent = (requirements: string) =>
  API.post("/agents/planning", { requirements });

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

