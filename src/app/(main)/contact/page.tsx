"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Send,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Clock,
  Loader2,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { personal } from "@/data/resume";
import { cn } from "@/lib/utils";

const schema = z.object({
  name:    z.string().min(2, "Name must be at least 2 characters"),
  email:   z.string().email("Please enter a valid email"),
  subject: z.string().min(2, "Subject required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const contactInfo = [
  { icon: Mail,    label: "Email",         value: personal.email,         href: `mailto:${personal.email}` },
  { icon: MapPin,  label: "Location",      value: personal.location,      href: null },
  { icon: Clock,   label: "Response Time", value: "Within 24 hours",      href: null },
];

const inputBase =
  "w-full px-4 py-3 text-sm bg-secondary/40 border rounded-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none transition-all duration-200 focus:bg-secondary/60";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormData) {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSubmitted(true);
      reset();
      toast.success("Message sent! I'll get back to you soon.");
    } catch {
      toast.error("Failed to send. Please email me directly.");
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="section border-b border-border/30 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-1/3 w-72 h-72 rounded-full bg-primary/6 blur-[100px] pointer-events-none" />
        <div className="container relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-primary" />
              <span className="text-xs text-primary font-mono uppercase tracking-widest">Contact</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Let&apos;s Build Something
              <span className="gradient-text"> Together</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Open to full-time roles, freelance projects, and collaborations.
              Drop me a message and I&apos;ll respond within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Info sidebar */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Availability card */}
              <div className="glass border border-emerald-500/25 rounded-2xl p-5">
                <div className="flex items-center gap-2.5 mb-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-sm font-semibold text-emerald-500">Available for Work</span>
                </div>
                <p className="text-sm text-muted-foreground">{personal.availabilityNote}</p>
              </div>

              {/* Contact info */}
              {contactInfo.map((info, i) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="glass border border-border/40 rounded-2xl p-5 flex items-start gap-4 hover:border-primary/30 transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <info.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Social links */}
              <div className="glass border border-border/40 rounded-2xl p-5 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Connect Online
                </p>
                {[
                  { href: personal.github, icon: Github, label: "github.com/Selvaganapathi-P" },
                  { href: personal.linkedin, icon: Linkedin, label: "linkedin.com/in/selvaganapathims" },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all"
                  >
                    <Icon size={16} />
                    {label}
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="glass border border-emerald-500/20 rounded-2xl p-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4"
                    >
                      <CheckCircle size={32} className="text-emerald-500" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground mb-6">
                      Thanks for reaching out. I&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-4 py-2 text-sm text-primary hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="glass border border-border/40 rounded-2xl p-8 space-y-5"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <Sparkles size={16} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">Send a Message</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Your Name *
                        </label>
                        <input
                          {...register("name")}
                          placeholder="John Doe"
                          className={cn(
                            inputBase,
                            errors.name
                              ? "border-destructive focus:border-destructive"
                              : "border-border/40 focus:border-primary/60"
                          )}
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email Address *
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="john@company.com"
                          className={cn(
                            inputBase,
                            errors.email
                              ? "border-destructive focus:border-destructive"
                              : "border-border/40 focus:border-primary/60"
                          )}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <input
                        {...register("subject")}
                        placeholder="Job opportunity / Project inquiry"
                        className={cn(
                          inputBase,
                          errors.subject
                            ? "border-destructive focus:border-destructive"
                            : "border-border/40 focus:border-primary/60"
                        )}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-xs text-destructive">{errors.subject.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <textarea
                        {...register("message")}
                        rows={6}
                        placeholder="Tell me about your project, role, or how I can help..."
                        className={cn(
                          inputBase,
                          "resize-none",
                          errors.message
                            ? "border-destructive focus:border-destructive"
                            : "border-border/40 focus:border-primary/60"
                        )}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-primary/25 hover:shadow-primary/40 overflow-hidden relative group"
                    >
                      <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      {isSubmitting ? (
                        <>
                          <Loader2 size={16} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
