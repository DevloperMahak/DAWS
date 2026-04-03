import pool from "../config/db.js";

export const getWorkspaceMemory = (projectId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
      SELECT agent, type, title, content, created_at
      FROM workspace_memory
      WHERE project_id = ?
      ORDER BY created_at ASC
      `,
      [projectId],
      (err, results) => {
        if (err) reject(err);
        else resolve(results);
      },
    );
  });
};
