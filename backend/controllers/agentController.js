export const runAgents = async (req, res) => {
  const { from, to, message } = req.body;

  console.log(`📨 A2A Message from ${from} → ${to}:`, message);

  try {
    // forward message to correct agent logic
    if (to === "requirements") {
      return res.json({
        reply: `Requirements Agent received: ${message}`,
        forwardedTo: "requirements",
      });
    }

    if (to === "planner") {
      return res.json({
        reply: `Planner Agent received: ${message}`,
        forwardedTo: "planner",
      });
    }

    return res.status(400).json({ error: "Unknown target agent" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
