"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, ProjectItem } from "@/data";
import { ArrowUpRightIcon } from "@/components/shared/Icons";

type DisciplineFilter = "all" | "frontend" | "backend" | "fullstack";

export function ProjectsArchive() {
  const [filter, setFilter] = useState<DisciplineFilter>("all");

  const filteredProjects = PROJECTS.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  const countByDiscipline = {
    all: PROJECTS.length,
    frontend: PROJECTS.filter((p) => p.category === "frontend").length,
    backend: PROJECTS.filter((p) => p.category === "backend").length,
    fullstack: PROJECTS.filter((p) => p.category === "fullstack").length,
  };

  return (
    <div className="w-full px-6 py-12 sm:px-10 lg:px-24 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative mb-16 sm:mb-20">
        {/* Background Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 -top-10 flex select-none text-[clamp(6rem,18vw,16rem)] font-bold leading-none tracking-[-0.07em] text-foreground/[0.045] blur-[1px]"
        >
          WORK
        </div>

        <div className="relative z-10 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/60">
            Project Index / 0{PROJECTS.length}
          </p>
          <h1 className="mt-3 text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-[-0.04em] text-foreground leading-[0.95]">
            All projects.
          </h1>
          <p className="mt-6 text-base sm:text-xl text-foreground/75 leading-relaxed font-light">
            A growing archive of digital products, internal systems, and web experiences — from interface craft to fullstack delivery.
          </p>

          <div className="mt-6">
            <a
              href="#projects-grid"
              className="inline-flex items-center gap-1.5 border-b border-foreground/80 pb-1 font-mono text-xs uppercase tracking-[0.18em] font-semibold text-foreground hover:opacity-75 transition-opacity"
            >
              <span>Open Project Archive</span>
              <ArrowUpRightIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div
        id="projects-grid"
        className="pt-10 border-t border-foreground/10 mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-foreground/60 mb-3 font-semibold">
            Filter by discipline
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`font-mono text-[0.65rem] uppercase tracking-[0.14em] font-semibold px-4 py-2 rounded-full transition-all ${
                filter === "all"
                  ? "bg-foreground text-background"
                  : "border border-foreground/15 text-foreground/80 hover:border-foreground/40"
              }`}
            >
              All Projects 0{countByDiscipline.all}
            </button>
            <button
              onClick={() => setFilter("frontend")}
              className={`font-mono text-[0.65rem] uppercase tracking-[0.14em] font-semibold px-4 py-2 rounded-full transition-all ${
                filter === "frontend"
                  ? "bg-foreground text-background"
                  : "border border-foreground/15 text-foreground/80 hover:border-foreground/40"
              }`}
            >
              Frontend 0{countByDiscipline.frontend}
            </button>
            <button
              onClick={() => setFilter("backend")}
              className={`font-mono text-[0.65rem] uppercase tracking-[0.14em] font-semibold px-4 py-2 rounded-full transition-all ${
                filter === "backend"
                  ? "bg-foreground text-background"
                  : "border border-foreground/15 text-foreground/80 hover:border-foreground/40"
              }`}
            >
              Backend 0{countByDiscipline.backend}
            </button>
            <button
              onClick={() => setFilter("fullstack")}
              className={`font-mono text-[0.65rem] uppercase tracking-[0.14em] font-semibold px-4 py-2 rounded-full transition-all ${
                filter === "fullstack"
                  ? "bg-foreground text-background"
                  : "border border-foreground/15 text-foreground/80 hover:border-foreground/40"
              }`}
            >
              Fullstack 0{countByDiscipline.fullstack}
            </button>
          </div>
        </div>

        <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/60">
          Showing 0{filteredProjects.length} Projects
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {filteredProjects.map((project, idx) => {
          const coverImage = project.images?.[0]?.src;
          return (
            <article
              key={project.id}
              className="group min-w-0 flex flex-col justify-between rounded-2xl border border-foreground/10 bg-card p-6 sm:p-8 transition-all duration-300 hover:shadow-xl hover:border-foreground/25"
            >
              <div>
                {/* Image Showcase */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#111114] mb-6">
                  {coverImage && (
                    <Image
                      src={coverImage}
                      alt={project.name}
                      fill
                      priority={idx === 0}
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  )}
                  {/* Category Pill */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.15em] px-3 py-1 rounded-full bg-black/60 text-white backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Meta details */}
                <div className="flex items-center justify-between gap-4 mb-2">
                  <p className="font-mono text-xs uppercase tracking-[0.15em] text-foreground/60">
                    {project.experienceLabel}
                  </p>
                  <span className="font-serif text-lg font-bold text-foreground/40">
                    {project.number || `0${idx + 1}`}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-foreground group-hover:text-foreground/80 transition-colors">
                  {project.name}
                </h2>

                <p className="mt-4 text-sm sm:text-base text-foreground/75 leading-relaxed">
                  {project.summary}
                </p>

                {/* Impact Stats */}
                {project.impactStats && project.impactStats.length > 0 && (
                  <div className="mt-6 flex items-center gap-6 border-y border-foreground/10 py-3">
                    {project.impactStats.map((stat, sIdx) => (
                      <div key={sIdx}>
                        <span className="font-serif text-2xl font-bold text-foreground">
                          {stat.value}+
                        </span>{" "}
                        <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-foreground/60">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Badges */}
                {project.techStack && (
                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="font-mono text-[0.6rem] uppercase tracking-[0.08em] px-2.5 py-1 rounded-full border border-foreground/15 text-foreground/70"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* CTA Box at Bottom */}
      <div className="mt-20 sm:mt-28 rounded-3xl bg-[#0d121c] text-white p-8 sm:p-14 lg:p-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8 border border-white/10">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-sky-400 font-semibold">
            Have a project in mind?
          </p>
          <h2 className="mt-4 text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[0.95]">
            Let’s build something useful.
          </h2>
        </div>
        <Link
          href="/#contact"
          className="inline-flex w-fit border-b border-white/70 pb-1.5 font-mono text-xs uppercase tracking-[0.2em] font-semibold text-white hover:text-sky-400 hover:border-sky-400 hover:opacity-100 transition-all shrink-0"
        >
          Start a conversation
        </Link>
      </div>
    </div>
  );
}
