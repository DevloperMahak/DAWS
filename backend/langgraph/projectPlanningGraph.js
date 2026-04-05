import { StateGraph, START, END, Annotation } from "@langchain/langgraph";
import { requirementNode } from "../agents/requirementNode.js";
import { plannerNode } from "../agents/plannerNode.js";
import { devNode } from "../agents/devNode.js";
import { docsNode } from "../agents/docsNode.js";

const ProjectState = Annotation.Root({
  projectName: Annotation(),
  description: Annotation(),
  requirements: Annotation(),
  mindmap: Annotation(),
  devOutput: Annotation(),
  documentation: Annotation(),
  currentStep: Annotation(),
});

export const projectPlanningGraph = new StateGraph(ProjectState)
  .addNode("requirements_agent", requirementNode)
  .addNode("planner_agent", plannerNode)
  .addNode("dev_agent", devNode)
  .addNode("docs_agent", docsNode)
  .addEdge(START, "requirements_agent")
  .addEdge("requirements_agent", "planner_agent")
  .addEdge("planner_agent", "dev_agent")
  .addEdge("dev_agent", "docs_agent")
  .addEdge("docs_agent", END)
  .compile();
