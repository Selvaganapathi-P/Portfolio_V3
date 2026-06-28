"use client";

import { motion } from "framer-motion";

const uses = [
  {
    category: "Development",
    items: [
      { name: "VS Code", description: "Primary code editor with a carefully curated extension set.", link: null },
      { name: "Node.js", description: "JavaScript runtime for backend development.", link: null },
      { name: "MongoDB Compass", description: "GUI for MongoDB database management.", link: null },
      { name: "Postman", description: "API testing and documentation.", link: null },
      { name: "Git & GitHub", description: "Version control and code hosting.", link: null },
    ],
  },
  {
    category: "Deployment",
    items: [
      { name: "Vercel", description: "Frontend deployment and hosting with zero-config setup.", link: null },
      { name: "Netlify", description: "Static site and JAMstack deployment.", link: null },
      { name: "MongoDB Atlas", description: "Cloud MongoDB hosting and management.", link: null },
    ],
  },
  {
    category: "Design & Productivity",
    items: [
      { name: "Figma", description: "UI/UX design and prototyping.", link: null },
      { name: "Notion", description: "Notes, project planning, and documentation.", link: null },
      { name: "Chrome DevTools", description: "Debugging, performance profiling, and network analysis.", link: null },
    ],
  },
];

export default function UsesPage() {
  return (
    <div className="min-h-screen">
      <section className="section border-b border-border/30">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-primary" />
              <span className="text-xs text-primary font-mono uppercase tracking-widest">Setup</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              What I <span className="gradient-text">Use</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              My development setup, tools, and tech stack that I use daily to build software.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container max-w-3xl">
          {uses.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
              className="mb-12"
            >
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {group.category}
              </h2>
              <div className="space-y-3">
                {group.items.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: gi * 0.1 + i * 0.06 }}
                    className="glass border border-border/40 rounded-xl p-5 flex items-start justify-between gap-4"
                  >
                    <div>
                      <p className="font-medium text-foreground mb-1">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
