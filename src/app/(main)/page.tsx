import { Hero } from "@/components/home/Hero";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { ContactCTA } from "@/components/home/ContactCTA";
import type { Metadata } from "next";
import { personal } from "@/data/resume";

export const metadata: Metadata = {
  title: `${personal.name} — ${personal.title}`,
  description: personal.summary,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ExperiencePreview />
      <SkillsPreview />
      <ContactCTA />
    </>
  );
}
