// controllers/projectController.js
import db from "../config/db.js"; // Your MySQL connection

// Get all projects
export const getAllProjects = (req, res) => {
  const sql = "SELECT * FROM projects";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ projects: results });
  });
};

// Get project by ID
export const getProjectById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM projects WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!result.length)
      return res.status(404).json({ message: "Project not found" });
    res.json({ project: result[0] });
  });
};

// Create new project
export const createProject = (req, res) => {
  console.log("🔥 Create Project API Hit:", req.body); // <-- ADD THIS
  const { user_id, name, description } = req.body;
  const sql =
    "INSERT INTO projects (user_id, name, description) VALUES (?, ?, ?)";
  db.query(sql, [user_id, name, description], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res
      .status(201)
      .json({ message: "Project created", projectId: result.insertId });
  });
};

// Update project
export const updateProject = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const sql = "UPDATE projects SET name = ?, description = ? WHERE id = ?";
  db.query(sql, [name, description, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Project updated" });
  });
};

// Delete project
export const deleteProject = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM projects WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Project deleted" });
  });
};
