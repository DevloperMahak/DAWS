import pool from "../config/mysql.js";

export const saveWorkspaceMemory = ({
  projectId,
  agent,
  type = "output",
  title = "",
  content,
}) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
      INSERT INTO workspace_memory
      (project_id, agent, type, title, content)
      VALUES (?, ?, ?, ?, ?)
    `,
      [projectId, agent, type, title, JSON.stringify(content)],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      },
    );
  });
};
