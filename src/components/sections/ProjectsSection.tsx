"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS, ProjectItem, ProjectImage } from "@/data";
import { ChevronLeftIcon, ChevronRightIcon, ArrowUpRightIcon } from "@/components/shared/Icons";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const [imageIndex, setImageIndex] = useState(0);
  const images: ProjectImage[] = project.images || [];

  const prevImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setImageIndex((prev) => (prev + 1) % images.length);
  };

  const isReversed = index % 2 !== 0;

  return (
    <article
      data-project-card="true"
      className={`grid gap-8 lg:grid-cols-2 lg:gap-14 items-center will-change-[transform,opacity] ${
        isReversed ? "lg:[direction:rtl]" : ""
      }`}
    >
      {/* Left: Media Gallery */}
      <div className="lg:[direction:ltr]">
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#111114] border border-foreground/10 shadow-lg group">
          {images.length > 0 && (
            <Image
              src={images[imageIndex]?.src}
              alt={images[imageIndex]?.alt || project.name}
              fill
              priority={index === 0}
              className="object-cover transition-opacity duration-300"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          )}

          {/* Slider Arrow Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xs text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 z-10"
                aria-label="Previous image"
              >
                <ChevronLeftIcon className="w-4 h-4" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-xs text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 z-10"
                aria-label="Next image"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </button>
            </>
          )}

          {/* Category Pill on top-left */}
          <div className="absolute top-4 left-4 z-10">
            <span className="font-mono text-[0.58rem] font-semibold uppercase px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/15 tracking-wider">
              {project.category}
            </span>
          </div>
        </div>

        {/* Caption & Indicators */}
        <div className="mt-3 flex items-center justify-between text-xs text-foreground/60 font-mono">
          <p className="tracking-wide">
            0{imageIndex + 1} / 0{images.length} · {images[imageIndex]?.label || "Preview"}
          </p>
          <div className="flex items-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setImageIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  imageIndex === i ? "w-5 bg-foreground" : "w-1.5 bg-foreground/25"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
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
            href="/projects"
            className="group/title inline-flex items-start gap-2.5 mt-1"
          >
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase leading-[1.08] tracking-tight decoration-foreground/35 decoration-1 underline-offset-6 group-hover/title:underline">
              {project.name}
            </h3>
            <ArrowUpRightIcon className="mt-1 size-5 shrink-0 text-foreground/40 transition-transform duration-300 group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5" />
          </Link>

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
            // Parallax sheet rising transition over Experience section
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
        <div className="mb-16 flex items-end justify-between gap-6 border-b border-foreground/10 pb-8 sm:mb-20">
          <div>
            <p className="font-mono text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.28em] text-foreground/50">
              Featured Archive
            </p>
            <p className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-[-0.03em] text-foreground">
              Selected projects
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-foreground hover:border-foreground transition-colors"
          >
            <span>View all projects</span>
            <ArrowUpRightIcon className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Project Cards Sequence */}
        <div ref={containerRef} className="space-y-24 sm:space-y-32">
          {PROJECTS.map((project, idx) => (
            <ProjectCard key={project.id} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
