const BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

function getAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return { "Content-Type": "application/json" };
  const token = localStorage.getItem("admin_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: { ...getAuthHeaders(), ...(init?.headers ?? {}) },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "API error");
  return json;
}

export const api = {
  // Auth
  login: (username: string, password: string) =>
    apiFetch<{ token: string; user: { username: string; role: string } }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    }),
  me: () => apiFetch<{ user: { username: string; role: string } }>("/api/auth/me"),

  // Contacts
  contacts: {
    list: (params?: string) => apiFetch<{ data: Contact[]; pagination: Pagination }>(`/api/contact?${params ?? ""}`),
    stats: () => apiFetch<{ data: ContactStats }>("/api/contact/stats"),
    get: (id: string) => apiFetch<{ data: Contact }>(`/api/contact/${id}`),
    update: (id: string, body: Partial<Contact>) =>
      apiFetch<{ data: Contact }>(`/api/contact/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    delete: (id: string) => apiFetch<{ message: string }>(`/api/contact/${id}`, { method: "DELETE" }),
  },

  // Projects
  projects: {
    list: () => apiFetch<{ data: Project[] }>("/api/projects"),
    get: (slug: string) => apiFetch<{ data: Project }>(`/api/projects/${slug}`),
    create: (body: Partial<Project>) =>
      apiFetch<{ data: Project }>("/api/projects", { method: "POST", body: JSON.stringify(body) }),
    update: (id: string, body: Partial<Project>) =>
      apiFetch<{ data: Project }>(`/api/projects/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    delete: (id: string) => apiFetch<{ message: string }>(`/api/projects/${id}`, { method: "DELETE" }),
  },

  // Blog
  blog: {
    list: (params?: string) => apiFetch<{ data: BlogPost[]; pagination: Pagination }>(`/api/blog?${params ?? ""}`),
    create: (body: Partial<BlogPost>) =>
      apiFetch<{ data: BlogPost }>("/api/blog", { method: "POST", body: JSON.stringify(body) }),
    update: (id: string, body: Partial<BlogPost>) =>
      apiFetch<{ data: BlogPost }>(`/api/blog/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    delete: (id: string) => apiFetch<{ message: string }>(`/api/blog/${id}`, { method: "DELETE" }),
  },
};

// Types
export interface Contact {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  notes?: string;
  createdAt: string;
}

export interface ContactStats {
  new: number;
  read: number;
  replied: number;
  archived: number;
  total: number;
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  status: string;
  featured: boolean;
  category: string;
  techStack: string[];
  live?: string;
  github?: string;
  year: number;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  status: "draft" | "published" | "archived";
  readTime: number;
  views: number;
  createdAt: string;
  publishedAt?: string;
}

export interface Pagination {
  total: number;
  page: number;
  pages: number;
}
