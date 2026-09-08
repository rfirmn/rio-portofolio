import React from "react";
import { StaggeredMenu } from "@/components/navigation/StaggeredMenu";
import { Footer } from "@/components/shared/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { GithubSection } from "@/components/sections/GithubSection";

export default function HomePage() {
  return (
    <main className="relative isolate min-h-dvh bg-background text-foreground">
      {/* Navigation Header and Slide-out Drawer */}
      <StaggeredMenu />

      {/* Hero Section (#home) */}
      <HeroSection />

      {/* About Section (#about) */}
      <AboutSection />

      {/* Experience Section (#experience) */}
      <ExperienceSection />

      {/* Projects Showcase Section (#projects) */}
      <ProjectsSection />

      {/* GitHub Activity Section */}
      <GithubSection />

      {/* Contact Section / Footer (#contact) */}
      <Footer />
    </main>
  );
}
