"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Eye, Clock, RefreshCw } from "lucide-react";
import { api, type BlogPost } from "@/lib/api";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  draft: "bg-secondary text-muted-foreground border-border/50",
  published: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  archived: "bg-secondary text-muted-foreground border-border/30 opacity-60",
};

function PostForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<BlogPost>;
  onSave: (data: Partial<BlogPost>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState<Partial<BlogPost>>(
    initial ?? { title: "", slug: "", excerpt: "", content: "", tags: [], status: "draft" }
  );
  const set = (k: keyof BlogPost, v: unknown) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="glass border border-border/40 rounded-2xl p-6 space-y-4">
      <h3 className="font-bold text-foreground">{initial?._id ? "Edit Post" : "New Blog Post"}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Title</label>
          <input type="text" value={form.title ?? ""} onChange={(e) => set("title", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border/40 rounded-lg text-foreground focus:outline-none focus:border-primary/50" />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Slug (optional — auto-generated)</label>
          <input type="text" value={form.slug ?? ""} onChange={(e) => set("slug", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border/40 rounded-lg text-foreground focus:outline-none focus:border-primary/50" />
        </div>
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Excerpt</label>
        <textarea rows={2} value={form.excerpt ?? ""} onChange={(e) => set("excerpt", e.target.value)}
          className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border/40 rounded-lg text-foreground focus:outline-none focus:border-primary/50 resize-none" />
      </div>
      <div>
        <label className="block text-xs text-muted-foreground mb-1">Content (Markdown / HTML)</label>
        <textarea rows={10} value={form.content ?? ""} onChange={(e) => set("content", e.target.value)}
          className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border/40 rounded-lg text-foreground font-mono focus:outline-none focus:border-primary/50 resize-y" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Tags (comma-separated)</label>
          <input type="text" value={(form.tags ?? []).join(", ")} onChange={(e) => set("tags", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border/40 rounded-lg text-foreground focus:outline-none focus:border-primary/50" />
        </div>
        <div>
          <label className="block text-xs text-muted-foreground mb-1">Status</label>
          <select value={form.status ?? "draft"} onChange={(e) => set("status", e.target.value)}
            className="w-full px-3 py-2 text-sm bg-secondary/50 border border-border/40 rounded-lg text-foreground focus:outline-none focus:border-primary/50">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={() => onSave(form)} className="px-4 py-2 text-sm rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90">
          {initial?._id ? "Save Changes" : "Create Post"}
        </button>
        <button onClick={onCancel} className="px-4 py-2 text-sm rounded-lg border border-border/40 text-muted-foreground hover:text-foreground transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [creating, setCreating] = useState(false);

  async function load() {
    setLoading(true);
    try { const res = await api.blog.list(); setPosts(res.data); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  async function handleSave(data: Partial<BlogPost>) {
    try {
      if (editing?._id) {
        const res = await api.blog.update(editing._id, data);
        setPosts((prev) => prev.map((p) => p._id === editing._id ? res.data : p));
      } else {
        const res = await api.blog.create(data);
        setPosts((prev) => [res.data, ...prev]);
      }
      setEditing(null); setCreating(false);
    } catch (e) { alert(e instanceof Error ? e.message : "Save failed"); }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    await api.blog.delete(id);
    setPosts((prev) => prev.filter((p) => p._id !== id));
  }

  const published = posts.filter((p) => p.status === "published").length;
  const drafts = posts.filter((p) => p.status === "draft").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Blog Posts</h1>
          <p className="text-sm text-muted-foreground mt-1">{published} published · {drafts} drafts</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          </button>
          <button onClick={() => { setCreating(true); setEditing(null); }}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90">
            <Plus size={15} /> New Post
          </button>
        </div>
      </div>

      {creating && !editing && (
        <div className="mb-6"><PostForm onSave={handleSave} onCancel={() => setCreating(false)} /></div>
      )}

      <div className="space-y-3">
        {loading && <div className="text-center py-12 text-muted-foreground text-sm">Loading...</div>}
        {!loading && posts.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            <p className="text-sm">No posts yet. Create your first blog post.</p>
          </div>
        )}
        {posts.map((post) => (
          <motion.div key={post._id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            {editing?._id === post._id ? (
              <PostForm initial={editing} onSave={handleSave} onCancel={() => setEditing(null)} />
            ) : (
              <div className="glass border border-border/40 rounded-xl p-5 hover:border-primary/30 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-foreground line-clamp-1">{post.title}</h3>
                      <span className={cn("px-2 py-0.5 text-xs rounded-full border flex-shrink-0", STATUS_COLORS[post.status])}>
                        {post.status}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock size={11} /> {post.readTime} min</span>
                      <span className="flex items-center gap-1"><Eye size={11} /> {post.views} views</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                      {post.tags.slice(0, 3).map((t) => (
                        <span key={t} className="px-1.5 py-0.5 rounded bg-secondary border border-border/50">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button onClick={() => { setEditing(post); setCreating(false); }}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                      <Pencil size={14} />
                    </button>
                    <button onClick={() => handleDelete(post._id)}
                      className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors">
                      <Trash2 size={14} />
                    </button>
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
