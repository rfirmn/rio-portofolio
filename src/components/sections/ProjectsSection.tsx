"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { PROJECTS, type ProjectItem } from "@/data";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ArrowUpRightIcon } from "@/components/shared/Icons";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const isReversed = index % 2 !== 0;

  return (
    <article
      data-project-card="true"
      className={`grid gap-8 lg:grid-cols-2 lg:gap-14 items-center will-change-[transform,opacity] ${
        isReversed ? "lg:[direction:rtl]" : ""
      }`}
    >
      <div className="lg:[direction:ltr]">
        <ProjectGallery project={project} />
      </div>

      {/* Right: Content */}
      <div className="flex flex-col justify-center lg:[direction:ltr]">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-foreground/50 font-semibold">
              Project {project.number} / {project.role}
            </p>
          </div>

          <Link
            href={`/projects#${project.id}`}
            className="group/title inline-flex items-start gap-2.5 mt-1"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase leading-[1.08] tracking-tight decoration-foreground/35 decoration-1 underline-offset-6 group-hover/title:underline">
              {project.name}
            </h3>
            <ArrowUpRightIcon className="mt-1 size-5 shrink-0 text-foreground/40 transition-transform duration-300 group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5" />
          </Link>

          <p className="mt-3 font-serif text-xl italic text-primary sm:text-2xl">
            {project.tagline}
          </p>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-foreground/75 max-w-[55ch]">
            {project.summary}
          </p>
        </div>

        {/* Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mt-6">
            <p className="font-mono text-[0.6rem] font-bold uppercase tracking-[0.22em] text-foreground/45 mb-2.5">
              Highlights
            </p>
            <ul className="space-y-1.5">
              {project.highlights.slice(0, 3).map((h, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80">
                  <span className="font-mono text-[0.65rem] text-foreground/45 shrink-0 mt-0.5">
                    0{i + 1}
                  </span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 grid grid-cols-3 gap-3 border-y border-foreground/10 py-4">
          {project.impactStats.map((stat) => (
            <div key={stat.label}>
              <p className="text-sm font-bold sm:text-base">{stat.value}</p>
              <p className="mt-1 text-[0.6rem] leading-relaxed text-foreground/55">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        {project.techStack && (
          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 6).map((tech, i) => (
              <span
                key={i}
                className="font-mono text-[0.62rem] uppercase tracking-wider px-2.5 py-1 rounded-full border border-foreground/15 text-foreground/70"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
        <Link
          href={`/projects#${project.id}`}
          className="mt-6 inline-flex w-fit items-center gap-2 border-b border-foreground/30 pb-1 font-mono text-[0.65rem] font-semibold uppercase tracking-wider hover:border-primary hover:text-primary"
        >
          Explore the case study <ArrowUpRightIcon className="size-4" />
        </Link>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const container = containerRef.current;
      const watermark = watermarkRef.current;
      if (!section || !container || !watermark) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, isMobile, reduceMotion } = context.conditions ?? {};
          const cards = container.querySelectorAll("[data-project-card]");

          if (reduceMotion) {
            gsap.set([section, watermark, cards], { clearProps: "all" });
            return;
          }

          if (isMobile) {
            gsap.set([section, watermark], { clearProps: "all" });
            cards.forEach((card) => {
              gsap.fromTo(
                card,
                { opacity: 0, y: 36 },
                {
                  opacity: 1,
                  y: 0,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 92%",
                    end: "top 62%",
                    scrub: 0.25,
                    invalidateOnRefresh: true,
                  },
                }
              );
            });
            return;
          }

          if (isDesktop) {
            // Keep initial anchor coordinates stable when opening a project group directly.
            if (!["#projects", "#ios-projects"].includes(window.location.hash)) {
              gsap.fromTo(
                section,
                { yPercent: 16 },
                {
                  yPercent: 0,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "top 58%",
                    scrub: 0.65,
                    invalidateOnRefresh: true,
                  },
                }
              );
            }

            // Watermark parallax
            gsap.fromTo(
              watermark,
              { y: -100, opacity: 0 },
              {
                y: 100,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );

            // Stagger each project card
            cards.forEach((card) => {
              gsap.fromTo(
                card,
                { opacity: 0, y: 40, scale: 0.98 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.8,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                  },
                }
              );
            });
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      aria-labelledby="projects-heading"
      className="projects-section relative z-30 mt-0 rounded-t-[2rem] bg-background px-6 pt-16 pb-20 text-foreground sm:px-10 sm:pt-24 md:-mt-[14vh] md:rounded-t-[2.5rem] md:pt-36 md:shadow-[0_-30px_60px_rgba(0,0,0,0.15)] lg:-mt-[10vh] lg:px-24 lg:pt-40"
    >
      <h2 id="projects-heading" className="sr-only">
        Selected projects
      </h2>

      {/* Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-12 flex select-none items-center justify-center text-center text-[clamp(4rem,17vw,17rem)] font-bold leading-none tracking-[-0.075em] text-foreground/[0.045] blur-[3px]"
      >
        PROJECTS
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end border-b border-foreground/10 pb-8 sm:mb-20">
          <div>
            <p className="font-mono text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.28em] text-foreground/50">
              Selected work / Applied AI
            </p>
            <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[-0.03em] text-foreground">
              AI, put to work.
            </p>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-foreground/65 sm:text-base">
              Three different problems. One focus: useful AI, grounded in context,
              connected to reliable systems, and built for people.
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-4 sm:items-end">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground hover:border-foreground transition-colors"
            >
              <span>View all projects</span>
              <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <a href="#ios-projects" className="inline-flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-wider text-primary underline underline-offset-4">
              Explore Swift / iOS <ArrowUpRightIcon className="size-3.5" />
            </a>
          </div>
        </div>

        {/* Project Cards Sequence */}
        <div ref={containerRef} className="space-y-24 sm:space-y-32">
          {PROJECTS.filter((project) => project.featured).map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>

        <section id="ios-projects" aria-labelledby="ios-projects-heading" className="mt-24 scroll-mt-8 border-t border-foreground/15 pt-10 sm:mt-32">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-foreground/55">
            Native iOS / Swift · 03 projects
          </p>
          <h3 id="ios-projects-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">Built for iOS. Written in Swift.</h3>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/65 sm:text-base">
            UIKit and SwiftUI interfaces, durable uploads, local persistence, and AR experiences.
            Three native apps that show how I build beyond the model and into the hands of users.
          </p>
          <div className="mt-8 grid items-start gap-8 md:grid-cols-3">
            {PROJECTS.filter((project) => project.category === "ios").map((project) => (
              <article key={project.id} className="min-w-0">
                <ProjectGallery project={project} />
                <Link href={`/projects#${project.id}`} className="group mt-5 flex items-start justify-between gap-3">
                  <h4 className="text-xl font-bold leading-tight tracking-tight group-hover:text-primary">{project.name}</h4>
                  <ArrowUpRightIcon className="mt-0.5 size-4 shrink-0 text-foreground/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
                <p className="mt-3 text-sm leading-relaxed text-foreground/65">{project.tagline}</p>
                <p className="mt-3 text-xs leading-relaxed text-foreground/75">{project.highlights[0]}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="rounded-full border border-foreground/15 px-2.5 py-1 font-mono text-[0.6rem] text-foreground/65">{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="cross-platform-heading" className="mt-14 border-t border-foreground/15 pt-8 sm:mt-20">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-foreground/55">Cross-platform / Flutter & Web</p>
          <h3 id="cross-platform-heading" className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">One product. Android, iOS, and web.</h3>
          <div className="mt-2">
            {PROJECTS.filter((project) => project.category === "fullstack").map((project) => (
              <Link
                key={project.id}
                href={`/projects#${project.id}`}
                className="group flex items-start justify-between gap-4 border-b border-foreground/10 py-6"
              >
                <div className="max-w-3xl">
                  <p className="font-mono text-[0.6rem] uppercase tracking-wider text-foreground/50">{project.role}</p>
                  <p className="mt-2 text-xl font-bold group-hover:text-primary">{project.name}</p>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/65">{project.summary}</p>
                </div>
                <ArrowUpRightIcon className="mt-1 size-5 shrink-0 text-foreground/50 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
