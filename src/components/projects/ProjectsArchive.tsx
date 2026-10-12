"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECTS, PROJECT_CATEGORIES, type ProjectItem } from "@/data";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ArrowUpRightIcon, ChevronRightIcon } from "@/components/shared/Icons";

type ProjectFilter = "all" | ProjectItem["category"];

const FILTERS: Array<{ id: ProjectFilter; label: string }> = [
  { id: "all", label: "All projects" },
  ...Object.entries(PROJECT_CATEGORIES).map(([id, label]) => ({
    id: id as ProjectItem["category"],
    label,
  })),
];

export function ProjectsArchive() {
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const filteredProjects = PROJECTS.filter((project) => filter === "all" || project.category === filter);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-10 lg:px-24">
      <div className="relative mb-14 sm:mb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-10 right-0 select-none text-[clamp(6rem,18vw,16rem)] font-bold leading-none tracking-[-0.07em] text-foreground/[0.045] blur-[1px]"
        >
          WORK
        </div>
        <div className="relative z-10 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/60">
            Independent projects / {String(PROJECTS.length).padStart(2, "0")}
          </p>
          <h1 className="mt-4 text-5xl font-bold uppercase leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-8xl">
            Ideas,<br /><span className="font-serif font-normal lowercase italic text-primary">engineered.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-foreground/75 sm:text-lg">
            Applied AI is my primary focus, from retrieval to live insights and evidence-backed research.
            I also build native iOS apps in Swift and cross-platform products with Flutter.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {PROJECTS.filter((project) => project.featured).map((project) => (
              <a
                key={project.id}
                href={`#${project.id}`}
                onClick={() => setFilter("all")}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold text-primary transition-colors hover:bg-primary/10"
              >
                {project.name} <ArrowUpRightIcon className="size-3.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-10 flex flex-col justify-between gap-5 border-t border-foreground/15 pt-8 md:flex-row md:items-end">
        <div>
          <p className="mb-3 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-foreground/55">
            Explore by focus
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects by focus">
            {FILTERS.map(({ id, label }) => {
              const count = PROJECTS.filter((project) => id === "all" || project.category === id).length;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFilter(id)}
                  aria-pressed={filter === id}
                  className={`rounded-full border px-4 py-2.5 font-mono text-[0.6rem] font-semibold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${filter === id
                    ? "border-foreground bg-foreground text-background"
                    : "border-foreground/15 text-foreground/70 hover:border-foreground/40"}`}
                >
                  {label} <span className="ml-1 opacity-60">{String(count).padStart(2, "0")}</span>
                </button>
              );
            })}
          </div>
        </div>
        <p aria-live="polite" className="shrink-0 font-mono text-[0.6rem] uppercase tracking-wider text-foreground/55">
          {String(filteredProjects.length).padStart(2, "0")} projects
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:gap-10">
        {filteredProjects.map((project) => (
          <article
            key={project.id}
            id={project.id}
            className={`min-w-0 scroll-mt-8 overflow-hidden rounded-3xl border bg-card ${project.featured ? "border-primary/25" : "border-foreground/10"}`}
          >
            <div className="p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3 font-mono text-[0.56rem] uppercase tracking-wider">
                <span className={project.featured ? "font-semibold text-primary" : "text-foreground/55"}>
                  {project.featured ? "Featured / Applied AI" : PROJECT_CATEGORIES[project.category]}
                </span>
                <span className="text-foreground/40">Project {project.number}</span>
              </div>
              <ProjectGallery project={project} />
              <div className="mt-5">
                <p className="font-mono text-[0.56rem] uppercase leading-relaxed tracking-wider text-foreground/55">
                  {project.role}
                </p>
                <h2 className="mt-2 text-2xl font-extrabold uppercase leading-tight tracking-tight sm:text-3xl">
                  {project.name}
                </h2>
                <p className="mt-3 font-serif text-xl italic leading-snug text-primary">{project.tagline}</p>
                <p className="mt-4 text-sm leading-relaxed text-foreground/75">{project.summary}</p>
              </div>

              <ul className="mt-5 space-y-2">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2 text-xs leading-relaxed text-foreground/75">
                    <span aria-hidden="true" className="mt-1.5 size-1 shrink-0 rounded-full bg-primary" />
                    {highlight}
                  </li>
                ))}
              </ul>

              <div className="mt-6 grid grid-cols-2 gap-4 border-y border-foreground/10 py-4">
                {project.impactStats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-base font-bold tracking-tight">{stat.value}</p>
                    <p className="mt-1 text-[0.6rem] leading-relaxed text-foreground/55">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span key={tech} className="rounded-full border border-foreground/15 px-2.5 py-1 font-mono text-[0.56rem] text-foreground/70">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                <span className="font-mono text-[0.56rem] uppercase tracking-wider text-foreground/50">{project.status}</span>
                {project.link?.githubUrl && (
                  <a
                    href={project.link.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${project.name} source on GitHub (new tab)`}
                    className="inline-flex items-center gap-1 border-b border-foreground/25 pb-0.5 font-mono text-[0.6rem] font-semibold uppercase tracking-wider hover:text-primary"
                  >
                    View source <ArrowUpRightIcon className="size-3" />
                  </a>
                )}
              </div>
            </div>

            <details className="group/case border-t border-foreground/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 text-sm font-semibold transition-colors hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-primary sm:px-6 [&::-webkit-details-marker]:hidden">
                Explore the case study
                <ChevronRightIcon className="size-4 shrink-0 transition-transform group-open/case:rotate-90" />
              </summary>
              <div className="space-y-6 px-5 pb-6 text-sm leading-relaxed text-foreground/75 sm:px-6">
                <div>
                  <h3 className="mb-2 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-primary">The problem</h3>
                  <p>{project.problem}</p>
                </div>
                <div>
                  <h3 className="mb-3 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-primary">What I built</h3>
                  <ol className="space-y-3">
                    {project.contributions.map((contribution, index) => (
                      <li key={contribution} className="flex gap-3">
                        <span className="mt-0.5 shrink-0 font-mono text-[0.6rem] text-foreground/40">{String(index + 1).padStart(2, "0")}</span>
                        <span>{contribution}</span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="mb-2 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-primary">The engineering decision</h3>
                  <p>{project.engineeringDecision}</p>
                </div>
                <div>
                  <h3 className="mb-2 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-primary">The result</h3>
                  <p>{project.impactSummary}</p>
                </div>
                <div className="rounded-xl border border-foreground/10 bg-background p-4">
                  <h3 className="mb-2 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-foreground/55">Demo & verification</h3>
                  <p className="text-xs leading-relaxed text-foreground/65">{project.scope}</p>
                </div>
              </div>
            </details>
          </article>
        ))}
      </div>

      <div className="mt-20 flex flex-col justify-between gap-8 rounded-3xl border border-white/10 bg-[#0d121c] p-8 text-white sm:mt-28 sm:p-12 lg:flex-row lg:items-center">
        <div>
          <p className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.24em] text-sky-400">Open to engineering opportunities</p>
          <h2 className="mt-4 max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">Looking for someone who connects AI to real products?</h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/60">My primary focus is applied AI. I’m also open to iOS developer roles, with hands-on SwiftUI, UIKit, and native app projects. Let’s talk about what your team is building.</p>
        </div>
        <Link href="/#contact" className="inline-flex w-fit shrink-0 items-center gap-2 border-b border-white/70 pb-2 font-mono text-xs font-semibold uppercase tracking-wider transition-colors hover:border-sky-400 hover:text-sky-400">
          Start a conversation <ArrowUpRightIcon className="size-4" />
        </Link>
      </div>
    </div>
  );
}
