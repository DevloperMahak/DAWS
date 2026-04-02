import { projectPlanningGraph } from "../langgraph/projectPlanningGraph.js";

export const runPlanningWorkflow = async (req, res) => {
  try {
    // Temporary hardcoded values for browser testing
    const projectName = "DAWS";
    const description = "Unified AI workspace for software teams";

    //const { projectName, description } = req.body;

    const result = await projectPlanningGraph.invoke({
      projectName,
      description,
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
