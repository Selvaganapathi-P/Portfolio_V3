"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen, Clock, Tag, ArrowRight } from "lucide-react";
import { BlogCardSkeleton } from "@/components/ui/skeleton";

const posts = [
  {
    title: "Building Scalable REST APIs with Express.js and MongoDB",
    excerpt: "A deep dive into designing robust API architectures with proper error handling, authentication, and MongoDB optimization.",
    tags: ["Node.js", "MongoDB", "REST API"],
    readTime: "8 min read",
    date: "Coming Soon",
    slug: "building-rest-apis-express-mongodb",
  },
  {
    title: "JWT Authentication Done Right: Patterns and Pitfalls",
    excerpt: "Exploring secure JWT implementation patterns, refresh token rotation, and common security mistakes to avoid.",
    tags: ["Security", "JWT", "Authentication"],
    readTime: "6 min read",
    date: "Coming Soon",
    slug: "jwt-authentication-patterns",
  },
  {
    title: "React Hooks Deep Dive: Beyond useState and useEffect",
    excerpt: "Mastering custom hooks, useCallback, useMemo, and building performance-optimized React applications.",
    tags: ["React", "JavaScript", "Performance"],
    readTime: "10 min read",
    date: "Coming Soon",
    slug: "react-hooks-deep-dive",
  },
];

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="min-h-screen">
      <section className="section border-b border-border/30">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-primary" />
              <span className="text-xs text-primary font-mono uppercase tracking-widest">Writing</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Tech <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Technical articles on MERN stack development, web architecture, and software engineering best practices.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {!mounted ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => <BlogCardSkeleton key={i} />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group glass border border-border/40 rounded-2xl p-6 hover:border-primary/30 transition-all hover:-translate-y-1"
                >
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                    <Clock size={12} />
                    {post.readTime}
                    <span>·</span>
                    <span className="text-amber-500 font-medium">{post.date}</span>
                  </div>

                  <h2 className="font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-2 py-0.5 text-xs rounded-md bg-secondary text-muted-foreground border border-border/50"
                      >
                        <Tag size={9} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <BookOpen size={13} />
                    <span>Article coming soon</span>
                    <ArrowRight size={13} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.article>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="glass border border-primary/20 rounded-2xl p-10 max-w-xl mx-auto">
              <BookOpen size={32} className="text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Blog Coming Soon</h3>
              <p className="text-muted-foreground text-sm">
                I&apos;m working on in-depth technical articles about MERN stack development,
                API design, and React patterns. Stay tuned!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
