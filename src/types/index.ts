export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  github: string | null;
  live: string | null;
  status: "live" | "completed" | "wip";
  featured: boolean;
  category: string;
  year: number;
  problem: string;
  solution: string;
  architecture: string;
  challenges: string[];
  metrics: Record<string, string | undefined>;
  techStack: string[];
  features: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  impact: string[];
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  cgpa: string;
  coursework: string[];
  location: string;
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
