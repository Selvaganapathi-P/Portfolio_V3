"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";
import { personal } from "@/data/resume";

export function ContactCTA() {
  return (
    <section className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative overflow-hidden rounded-3xl"
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-violet-500/10 to-cyan-500/10" />
          <div className="absolute inset-0 grid-pattern opacity-5" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-[80px]" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-violet-500/10 blur-[80px]" />

          <div className="relative z-10 px-8 py-16 sm:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <MessageSquare size={14} />
              Let&apos;s Work Together
            </motion.div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Have a project
              <br />
              <span className="gradient-text">in mind?</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-10">
              I&apos;m actively looking for full-time opportunities and exciting freelance projects.
              Let&apos;s build something great together.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5"
              >
                Start a Conversation
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`mailto:${personal.email}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass border border-border/60 text-foreground font-semibold text-sm hover:border-primary/40 transition-all"
              >
                <Mail size={16} />
                {personal.email}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
