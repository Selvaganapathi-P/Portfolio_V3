import { Hero } from "@/components/home/Hero";
import { TechMarquee } from "@/components/home/TechMarquee";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { ExperiencePreview } from "@/components/home/ExperiencePreview";
import { SkillsPreview } from "@/components/home/SkillsPreview";
import { ContactCTA } from "@/components/home/ContactCTA";
import { SectionDivider } from "@/components/ui/SectionDivider";
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
      <TechMarquee />
      <SectionDivider variant="wave" />
      <FeaturedProjects />
      <SectionDivider variant="line" />
      <ExperiencePreview />
      <SectionDivider variant="dots" />
      <SkillsPreview />
      <SectionDivider variant="wave" />
      <ContactCTA />
    </>
  );
}
