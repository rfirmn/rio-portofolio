import React from "react";
import type { Metadata } from "next";
import { ProjectsHeader } from "@/components/navigation/ProjectsHeader";
import { ProjectsArchive } from "@/components/projects/ProjectsArchive";
import { Footer } from "@/components/shared/Footer";
import { PROFILE } from "@/data";

export const metadata: Metadata = {
  title: `Projects | ${PROFILE.name}`,
  description: `Explore ${PROFILE.name}'s applied AI work: Strata PDA, Streamly, and Market Intelligence; Swift iOS apps Slate, BrandLens, and Personal Money Tracker; and Rantang for Flutter Android/iOS and web.`,
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <div>
        <ProjectsHeader />
        <ProjectsArchive />
      </div>
      <Footer />
    </main>
  );
}
