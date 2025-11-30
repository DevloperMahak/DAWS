// ProjectsPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../utils/projectApi";

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
      console.log("Projects fetched from backend:", projects);
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
    <div className="p-6 bg-[var(--bg)] min-h-screen text-[var(--text)]">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <div className="flex gap-3">
          <button
            onClick={openCreate}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#8441A4] to-[#FF5894] text-white"
          >
            + New Project
          </button>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : projects.length === 0 ? (
        <div>No projects yet. Create one to get started.</div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-lg border bg-[var(--card-bg)]"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold">{p.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-[#8b949e] mt-1">
                    {p.description}
                  </p>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => navigate(`/projects/${p.id}`)}
                    className="text-sm text-[#FF5894] hover:underline"
                  >
                    Open
                  </button>
                  <button
                    onClick={() => openEdit(p)}
                    className="text-sm text-gray-600 dark:text-[#cbd5e1]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-sm text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal (simple) */}
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
