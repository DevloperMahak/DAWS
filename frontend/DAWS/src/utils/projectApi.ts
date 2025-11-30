// src/api/projectApi.ts
import { API } from "../utils/axios";

export const getAllProjects = async () => {
  const res = await API.get("/projects");
  return res.data.projects;
};

export const getProjectById = async (id) => {
  const res = await API.get(`/projects/${id}`);
  return res.data.project;
};

export const createProject = async (data) => {
  const res = await API.post("/projects", data);
  return res.data;
};

export const updateProject = async (id, data) => {
  const res = await API.put(`/projects/${id}`, data);
  return res.data;
};

export const deleteProject = async (id) => {
  const res = await API.delete(`/projects/${id}`);
  return res.data;
};

export default {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
