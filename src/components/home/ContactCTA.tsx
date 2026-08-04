"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";
import { personal } from "@/data/resume";
import { TextReveal } from "@/components/ui/TextReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

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

          {/* Animated top line */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(252 87% 63% / 0.8), hsl(271 91% 65%), hsl(199 89% 52% / 0.8), transparent)",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          />

          {/* Floating glow orbs */}
          <motion.div
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary/10 blur-[80px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
              x: [0, 20, 0],
              y: [0, -15, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-violet-500/10 blur-[80px]"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.1, 0.18, 0.1],
              x: [0, -15, 0],
              y: [0, 20, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />

          <div className="relative z-10 px-8 py-16 sm:px-16 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
            >
              <MessageSquare size={14} />
              Let&apos;s Work Together
            </motion.div>

            <TextReveal
              as="h2"
              style="clip-reveal"
              stagger={0.08}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              Have a project in mind?
            </TextReveal>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-lg max-w-xl mx-auto mb-10"
            >
              I&apos;m actively looking for full-time opportunities and exciting freelance projects.
              Let&apos;s build something great together.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center gap-4"
            >
              <MagneticButton strength={0.25}>
                <Link
                  href="/contact"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-xl shadow-primary/30 hover:shadow-primary/55 transition-all hover:-translate-y-0.5 active:translate-y-0 overflow-hidden"
                >
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                  Start a Conversation
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </MagneticButton>
              <MagneticButton strength={0.2}>
                <a
                  href={`mailto:${personal.email}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass border border-border/60 text-foreground font-semibold text-sm hover:border-primary/40 transition-all glow-card"
                >
                  <Mail size={16} />
                  {personal.email}
                </a>
              </MagneticButton>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
