🚩 1. Problem Statement

Software development involves a lot of repetitive manual work:

Writing requirements

Creating functional/technical documents

Breaking features into tasks

Designing architecture

Planning timelines

Updating docs again & again

Teams waste hours doing planning work instead of writing code.

Developers need an AI Workspace that handles everything — from idea → requirement → plan → documentation.

🚀 2. Solution: DAWS (Developer AI Workspace)

DAWS is a unified AI-powered workspace where you can:

✔ Enter any idea / problem / feature
✔ AI converts it into:

Requirements

Architecture

Mindmaps

Breakdown / flow

Tasks & subtasks

Project Plan

Documentation

✔ Built with:

Gemini 2.5 Pro (Planning, Docs)

Gemini Flash (Fast inference)

NotebookLM-like prompt chaining

Modular “Agents”:

Requirements Agent

Planner Agent

Docs Agent

🧩 3. Key Features
🔹 Requirements Agent

Extracts:

Functional Requirements

Non-Functional Requirements

Constraints

Acceptance Criteria

Priority, Status, Metadata

🔹 Planner Agent (NotebookLM Mode)

Generates:

Mindmap

Architecture Diagram (text-based)

Feature Breakdown

Sprint Tasks

Milestones

Timeline

🔹 Documentation Agent

Produces:

Technical documentation

API docs

System design

Developer onboarding docs

🔹 Modern UI

Dark/Light theme

Beautiful panels

Output formatting

Fast API integration

🏛 4. Architecture
┌───────────────────────────┐
│ Frontend │
│ React + Vite + TS │
│ │
│ ┌─────────────────────┐ │
User Input ─────────────┤ │ Requirements Agent │ │
│ ├─────────────────────┤ │
│ │ Planning Agent │ │
│ ├─────────────────────┤ │
│ │ Docs Agent │ │
│ └─────────────────────┘ │
└───────────┬───────────────┘
│
REST API Requests
│
┌───────────▼──────────────┐
│ BACKEND │
│ Node.js + Express │
│ │
│ llmService.js │
│ - Gemini 2.5 Pro │
│ - Gemini Flash │
└───────────┬──────────────┘
│
Gemini AI API

🧰 5. Tech Stack
Frontend

React

TypeScript

Axios

Tailwind CSS

Context + Theming

Backend

Node.js

Express

Google Gemini API

Environment Variables (.env)

📁 6. Folder Structure
DAWS/
│
├── backend/
│ ├── controllers/
│ │ ├── requirementsController.js
│ │ ├── planningController.js
│ │ └── documentationController.js
│ ├── routes/
│ │ └── agentsRoutes.js
│ ├── services/
│ │ └── llmService.js
│ ├── server.js
│ └── package.json
│
└── frontend/
├── src/
│ ├── agents/
│ │ ├── RequirementsAgent.tsx
│ │ ├── PlannerAgent.tsx
│ │ └── DocsAgent.tsx
│ ├── utils/
│ │ └── agentsApi.ts
│ └── App.tsx
├── package.json

🔧 7. Setup Instructions
Backend Setup
cd backend
npm install

Create .env:

GEMINI_API_KEY=your_key_here
PORT=5000

Run backend:

npm start

Frontend Setup
cd frontend
npm install
npm run dev

🔑 8. Environment Variables
GEMINI_API_KEY=your_google_api_key

📡 9. API Endpoints
Method Endpoint Purpose
POST /agents/requirements AI requirement extraction
POST /agents/planning NotebookLM-style planning
POST /agents/docs Documentation generator
🧠 10. Agents Showcase
📌 Requirements Agent

Extracts detailed structured requirements.

📌 Planning Agent (NotebookLM Mode)

Produces:

Mindmaps (ASCII text)

System architecture

Feature → tasks breakdown

Milestones

Sprint plans

📌 Docs Agent

Generates:

Developer docs

Tech specs

API documentation

🧭 11. Future Enhancements

Real mindmap diagrams (Mermaid.js)

Audio/video explanation using Gemini Audio

Multi-agent orchestration

Project saving to database

PDF export

Task → Jira/GitHub sync

🏁 12. Conclusion

DAWS is a powerful AI-driven software planning assistant designed to reduce manual developer workload. With Gemini AI’s reasoning and NotebookLM-style planning, it lets developers focus on building, not writing documents.
