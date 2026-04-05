import { projectPlanningGraph } from "../langgraph/projectPlanningGraph.js";

export const runPlanningWorkflow = async (req, res) => {
  try {
    const { projectName, description } = req.body;

    const result = await projectPlanningGraph.invoke({
      projectName,
      description,
      currentStep: "started",
    });

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("Workflow Error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
