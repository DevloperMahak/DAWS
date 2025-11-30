// ProjectsPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../utils/projectApi";

import { FaTrash, FaEdit, FaExternalLinkAlt } from "react-icons/fa";

type Project = {
  id: number;
  user_id?: number;
  name: string;
  description?: string;
  created_at?: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  const fetch = async () => {
    setLoading(true);
    try {
      const projects = await getAllProjects();
      setProjects(projects || []);
    } catch (err) {
      console.error("fetch projects error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ name: "", description: "" });
    setModalOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditing(p);
    setForm({ name: p.name, description: p.description || "" });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name.trim()) return;
    try {
      if (editing) {
        await updateProject(editing.id, {
          name: form.name,
          description: form.description,
        });
      } else {
        await createProject({
          user_id: 1,
          name: form.name,
          description: form.description,
        });
      }
      setModalOpen(false);
      await fetch();
    } catch (err) {
      console.error("save project error", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this project?")) return;
    try {
      await deleteProject(id);
      await fetch();
    } catch (err) {
      console.error("delete project error", err);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-[var(--bg)] text-[var(--text)]">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Projects</h1>

        <button
          onClick={openCreate}
          className="px-4 py-2 rounded-lg text-white bg-gradient-to-r from-[#0AB2D7] to-[#308DEF]"
        >
          + New Project
        </button>
      </div>

      {/* PROJECT GRID */}
      {loading ? (
        <div>Loading...</div>
      ) : projects.length === 0 ? (
        <div>No projects yet. Create one to get started.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="relative rounded-xl p-4 shadow-md backdrop-blur-md hover:scale-[1.02] transition-all no-theme-border"
              style={{
                border: "2px solid transparent",
                background:
                  "linear-gradient(var(--bg), var(--bg)) padding-box, linear-gradient(90deg, #0AB2D7, #308DEF) border-box",
              }}
            >
              <div className="flex justify-between items-start gap-2">
                {/* TEXT SIDE */}
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-[var(--text)]">
                    {p.name}
                  </h2>
                  <p className="text-sm text-[var(--text)]/60 mt-1 line-clamp-2">
                    {p.description}
                  </p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col gap-3 text-xl">
                  <button
                    onClick={() => navigate(`/projects/${p.id}`)}
                    className="hover:scale-110 transition text-[var(--border)]"
                    title="Open Project"
                  >
                    <FaExternalLinkAlt />
                  </button>

                  <button
                    onClick={() => openEdit(p)}
                    className="hover:scale-110 transition text-yellow-400"
                    title="Edit Project"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="hover:scale-110 transition text-red-500"
                    title="Delete Project"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {/* FOLDER TAB TOP DESIGN */}
              <div
                className="absolute -top-3 left-4 w-16 h-3 rounded-t-lg"
                style={{
                  background: "linear-gradient(90deg, #0AB2D7, #308DEF)",
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setModalOpen(false)}
          />

          <div className="bg-[var(--bg2)] p-6 rounded-lg z-10 w-full max-w-md border border-[color:var(--text)/10]">
            <h3 className="text-lg font-semibold mb-3">
              {editing ? "Edit" : "Create"} Project
            </h3>

            <input
              placeholder="Project name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 rounded border mb-3 bg-[var(--bg)]"
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full p-2 rounded border mb-3 bg-[var(--bg)]"
              rows={4}
            />

            <div className="flex justify-end gap-2">
              <button onClick={() => setModalOpen(false)} className="px-3 py-1">
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-3 py-1 bg-[#8441A4] text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
