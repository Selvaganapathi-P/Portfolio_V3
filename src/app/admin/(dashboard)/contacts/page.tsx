"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Trash2, Eye, MoreHorizontal, RefreshCw } from "lucide-react";
import { api, type Contact, type ContactStats } from "@/lib/api";
import { cn } from "@/lib/utils";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  read: "bg-secondary text-muted-foreground border-border/50",
  replied: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  archived: "bg-secondary text-muted-foreground border-border/30 opacity-60",
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [stats, setStats] = useState<ContactStats | null>(null);
  const [selected, setSelected] = useState<Contact | null>(null);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const [c, s] = await Promise.all([
        api.contacts.list(filter ? `status=${filter}` : ""),
        api.contacts.stats(),
      ]);
      setContacts(c.data);
      setStats(s.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [filter]); // eslint-disable-line

  async function updateStatus(id: string, status: Contact["status"]) {
    await api.contacts.update(id, { status });
    setContacts((prev) => prev.map((c) => c._id === id ? { ...c, status } : c));
    if (selected?._id === id) setSelected((s) => s ? { ...s, status } : s);
  }

  async function deleteContact(id: string) {
    if (!confirm("Delete this message?")) return;
    await api.contacts.delete(id);
    setContacts((prev) => prev.filter((c) => c._id !== id));
    if (selected?._id === id) setSelected(null);
  }

  async function openContact(contact: Contact) {
    setSelected(contact);
    if (contact.status === "new") await updateStatus(contact._id, "read");
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Contact Messages</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {stats?.total ?? 0} total · {stats?.new ?? 0} new
          </p>
        </div>
        <button onClick={load} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {/* Stats row */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {(["new", "read", "replied", "archived"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(filter === s ? "" : s)}
              className={cn(
                "glass border rounded-xl p-4 text-left transition-all hover:-translate-y-0.5",
                filter === s ? "border-primary/40 bg-primary/5" : "border-border/40"
              )}
            >
              <div className="text-xl font-bold text-foreground">{stats[s]}</div>
              <div className="text-xs text-muted-foreground capitalize">{s}</div>
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* List */}
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {loading && (
            <div className="text-center py-12 text-muted-foreground text-sm">Loading...</div>
          )}
          {!loading && contacts.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">No messages found.</div>
          )}
          {contacts.map((contact) => (
            <motion.div
              key={contact._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => openContact(contact)}
              className={cn(
                "glass border rounded-xl p-4 cursor-pointer transition-all hover:border-primary/30",
                selected?._id === contact._id ? "border-primary/40 bg-primary/5" : "border-border/40"
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-sm text-foreground truncate">{contact.name}</p>
                    <span className={cn("px-1.5 py-0.5 text-xs rounded-md border flex-shrink-0", STATUS_COLORS[contact.status])}>
                      {contact.status}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{contact.email}</p>
                  <p className="text-xs text-foreground/70 mt-1 truncate">{contact.subject}</p>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0">
                  {new Date(contact.createdAt).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail */}
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected._id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="glass border border-border/40 rounded-xl p-6 max-h-[600px] overflow-y-auto"
            >
              <div className="flex items-start justify-between gap-3 mb-5">
                <div>
                  <h3 className="font-bold text-foreground text-lg">{selected.name}</h3>
                  <a href={`mailto:${selected.email}`} className="text-sm text-primary hover:underline">{selected.email}</a>
                </div>
                <button onClick={() => deleteContact(selected._id)} className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors">
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="mb-4">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Subject</p>
                <p className="font-medium text-foreground">{selected.subject}</p>
              </div>
              <div className="mb-6">
                <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Message</p>
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">{selected.message}</p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40">
                <p className="text-xs text-muted-foreground w-full mb-1">Update status:</p>
                {(["new", "read", "replied", "archived"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(selected._id, s)}
                    className={cn(
                      "px-2.5 py-1 text-xs rounded-lg border capitalize transition-all",
                      selected.status === s
                        ? STATUS_COLORS[s]
                        : "border-border/40 text-muted-foreground hover:border-primary/30"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass border border-border/40 rounded-xl flex items-center justify-center text-muted-foreground text-sm"
            >
              <div className="text-center">
                <Mail size={32} className="mx-auto mb-3 opacity-20" />
                <p>Select a message to view</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
