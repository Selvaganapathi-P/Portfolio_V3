"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, ExternalLink, Github, Star, RefreshCw } from "lucide-react";
import { api, type Project } from "@/lib/api";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  live: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  completed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  wip: "bg-amber-500/10 text-amber-500 border-amber-500/20",
};

function ProjectForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<Project>;
  onSave: (data: Partial<Project>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<Project>>(
    initial ?? { title: "", slug: "", description: "", status: "completed", featured: false, category: "Full Stack", techStack: [], year: new Date().getFullYear() }
  );

  const set = (k: keyof Project, v: unknown) => setForm((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="glass border border-border/40 rounded-2xl p-6 space-y-4">
      <h3 className="font-bold text-foreground">{initial?._id ? "Edit Project" : "New Project"}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {([
          ["title", "Title", "text"],
          ["slug", "Slug (URL)", "text"],
          ["category", "Category", "text"],
          ["year", "Year", "number"],
          ["github", "GitHub URL", "url"],
          ["live", "Live URL", "url"],
        ] as const).map(([k, label, type]) => (
          <div key={k}>
            <label className="block text-xs text-muted-foreground mb-1">{label}</label>
            <input
              type={type}
              value={(form[k as keyof Project] as string | number) ?? ""}
              onChange={(e) => set(k as keyof Project, type === "number" ? Number(e.target.value) : e.target.value)}
              className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border/40 rounded-lg text-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        ))}
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Description</label>
        <textarea
          rows={3}
          value={form.description ?? ""}
          onChange={(e) => set("description", e.target.value)}
          className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border/40 rounded-lg text-foreground focus:outline-none focus:border-primary/50 transition-colors resize-none"
        />
      </div>
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="block text-xs text-muted-foreground mb-1">Status</label>
          <select
            value={form.status ?? "completed"}
            onChange={(e) => set("status", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border/40 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
          >
            <option value="live">Live</option>
            <option value="completed">Completed</option>
            <option value="wip">WIP</option>
          </select>
        </div>
        <div className="flex items-end pb-0.5">
          <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer select-none">
            <input
              type="checkbox"
              checked={form.featured ?? false}
              onChange={(e) => set("featured", e.target.checked)}
              className="w-4 h-4 rounded accent-primary"
            />
            Featured
          </label>
        </div>
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Tech Stack (comma-separated)</label>
        <input
          type="text"
          value={(form.techStack ?? []).join(", ")}
          onChange={(e) => set("techStack", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
          className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border/40 rounded-lg text-foreground focus:outline-none focus:border-primary/50"
        />
      </div>
      <div className="flex gap-2 pt-2">
        <button
          onClick={() => onSave(form)}
          className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
        >
          {initial?._id ? "Save Changes" : "Create Project"}
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm rounded-lg border border-border/40 text-muted-foreground hover:text-foreground transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Project> | null>(null);
  const [creating, setCreating] = useState(false);

  async function load() {
    setLoading(true);
    try { const res = await api.projects.list(); setProjects(res.data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleSave(data: Partial<Project>) {
    try {
      if (editing?._id) {
        const res = await api.projects.update(editing._id, data);
        setProjects((prev) => prev.map((p) => p._id === editing._id ? res.data : p));
      } else {
        const res = await api.projects.create(data);
        setProjects((prev) => [res.data, ...prev]);
      }
      setEditing(null);
      setCreating(false);
    } catch (e) { alert(e instanceof Error ? e.message : "Save failed"); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    await api.projects.delete(id);
    setProjects((prev) => prev.filter((p) => p._id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-sm text-muted-foreground mt-1">{projects.length} projects</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button
            onClick={() => { setCreating(true); setEditing(null); }}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            <Plus size={15} /> New Project
          </button>
        </div>
      </div>

      {creating && !editing && (
        <div className="mb-6">
          <ProjectForm onSave={handleSave} onCancel={() => setCreating(false)} />
        </div>
      )}

      <div className="space-y-3">
        {loading && <div className="text-center py-12 text-muted-foreground text-sm">Loading...</div>}
        {projects.map((project) => (
          <motion.div key={project._id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            {editing?._id === project._id ? (
              <ProjectForm initial={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
            ) : (
              <div className="glass border border-border/40 rounded-xl p-5 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-foreground">{project.title}</h3>
                      {project.featured && <Star size={12} className="text-amber-500 fill-amber-500" />}
                      <span className={cn("px-2 py-0.5 text-xs rounded-full border", STATUS_COLORS[project.status])}>
                        {project.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {(project.techStack ?? []).slice(0, 5).map((t) => (
                        <span key={t} className="px-1.5 py-0.5 text-xs rounded bg-secondary text-muted-foreground border border-border/50">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    {project.live && <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"><ExternalLink size={14} /></a>}
                    {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"><Github size={14} /></a>}
                    <button onClick={() => { setEditing(project); setCreating(false); }} className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"><Pencil size={14} /></button>
                    <button onClick={() => handleDelete(project._id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"><Trash2 size={14} /></button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
