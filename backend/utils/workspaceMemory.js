import pool from "../config/db.js";

// SAVE MEMORY
export const saveWorkspaceMemory = ({
  projectId,
  agent,
  type = "output",
  title = "",
  content,
}) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO workspace_memory
      (project_id, agent, type, title, content)
      VALUES (?, ?, ?, ?, ?)
    `;

    pool.query(sql, [projectId, agent, type, title, content], (err, result) => {
      if (err) {
        console.error("❌ saveWorkspaceMemory error:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

// GET FULL PROJECT MEMORY
export const getWorkspaceMemory = (projectId) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM workspace_memory
      WHERE project_id = ?
      ORDER BY created_at ASC
    `;

    pool.query(sql, [projectId], (err, result) => {
      if (err) {
        console.error("❌ getWorkspaceMemory error:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};

// GET SINGLE AGENT MEMORY
export const getAgentMemory = (projectId, agent) => {
  return new Promise((resolve, reject) => {
    const sql = `
      SELECT * FROM workspace_memory
      WHERE project_id = ? AND agent = ?
      ORDER BY created_at ASC
    `;

    pool.query(sql, [projectId, agent], (err, result) => {
      if (err) {
        console.error("❌ getAgentMemory error:", err);
        return reject(err);
      }
      resolve(result);
    });
  });
};
