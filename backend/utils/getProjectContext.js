import pool from "../config/mysql.js";

export const getProjectContext = (projectId) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `
      SELECT * FROM workspace_memory
      WHERE project_id = ?
      ORDER BY created_at DESC
      LIMIT 20
    `,
      [projectId],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      },
    );
  });
};
