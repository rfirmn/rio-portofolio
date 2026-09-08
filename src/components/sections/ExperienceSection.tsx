"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { EXPERIENCES, ExperienceItem } from "@/data";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function formatNumber(num: number) {
  return String(num).padStart(2, "0");
}

function ExperienceCardMedia({ experience }: { experience: ExperienceItem }) {
  if (experience.image) {
    return (
      <Image
        src={experience.image}
        alt={experience.imageAlt || experience.company}
        fill
        sizes="(min-width: 1024px) 480px, 100vw"
        className="h-full w-full object-cover object-[center_62%] grayscale transition-[filter,transform] duration-1000 ease-out hover:grayscale-0 hover:scale-105"
      />
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-accent" aria-hidden="true">
      <div className="absolute inset-5 border border-card-foreground/12 sm:inset-7" />
      <div className="absolute -right-20 top-16 h-px w-[130%] -rotate-12 bg-card-foreground/20" />
      <div className="absolute -left-16 bottom-28 h-px w-[130%] rotate-12 bg-card-foreground/20" />
      <div className="absolute right-8 top-8 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-card-foreground/50">
        Selected work
      </div>
      <div className="absolute inset-x-8 bottom-8 sm:inset-x-10 sm:bottom-10">
        <p className="text-[clamp(5.5rem,14vw,10rem)] font-bold leading-[0.72] tracking-[-0.09em] text-card-foreground/10">
          {experience.monogram}
        </p>
        <p className="mt-8 max-w-[24rem] text-sm font-semibold uppercase leading-relaxed tracking-[0.18em] text-card-foreground/70">
          {experience.company}
        </p>
      </div>
    </div>
  );
}

function ExperienceCard({ experience, index }: { experience: ExperienceItem; index: number }) {
  return (
    <article
      data-experience-card="true"
      className="experience-card grid h-full w-[calc(100vw-2rem)] shrink-0 grid-rows-[auto_minmax(10rem,1fr)] overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-card text-card-foreground shadow-[0_32px_90px_rgba(0,0,0,0.28)] sm:w-[calc(100vw-5rem)] sm:grid-rows-[auto_minmax(12rem,1fr)] md:grid-cols-[1.28fr_0.92fr] md:grid-rows-none lg:w-[min(1120px,calc(100vw-12rem))]"
    >
      {/* Left Column: Details */}
      <div className="flex min-h-0 flex-col justify-between overflow-hidden px-5 py-5 sm:px-8 sm:py-7 lg:px-12 lg:py-10">
        <header>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[0.55rem] uppercase tracking-[0.24em] text-card-foreground/50 sm:gap-3 sm:text-[0.65rem]">
            <span>Professional experience</span>
            <span className="rounded-full border border-card-foreground/14 px-2 py-0.5 text-[0.48rem] font-semibold tracking-[0.18em] text-card-foreground/65 sm:px-2.5 sm:text-[0.58rem]">
              {experience.type}
            </span>
          </div>
          <h3 className="mt-3 text-[clamp(1.45rem,4.5vw,2.4rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] sm:mt-4 lg:mt-5">
            {experience.role}
          </h3>
          <p className="mt-2 text-xs font-bold uppercase tracking-[0.08em] text-card-foreground/80 sm:mt-3 sm:text-sm">
            {experience.company}
          </p>
        </header>

        <p className="my-4 text-xs sm:text-sm leading-relaxed text-card-foreground/75 lg:text-base lg:leading-[1.65]">
          {experience.summary}
        </p>

        <div className="mt-auto border-t border-card-foreground/10 pt-4 sm:pt-6">
          <p className="mb-2 text-[0.55rem] font-bold uppercase tracking-[0.24em] text-card-foreground/50 sm:text-xs">
            Highlights
          </p>
          <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {experience.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-baseline gap-2">
                <span className="font-mono text-[0.6rem] text-card-foreground/45">
                  {formatNumber(idx + 1)}
                </span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.04em] text-card-foreground/90 sm:text-[0.75rem]">
                  {highlight}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Right Column: Media */}
      <div className="group/media relative min-h-[220px] overflow-hidden border-t border-card-foreground/12 bg-black/90 md:min-h-full md:border-l md:border-t-0">
        <ExperienceCardMedia experience={experience} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <p className="absolute right-5 top-4 font-mono text-3xl font-semibold text-white/90 sm:right-7 sm:top-6 sm:text-4xl">
          {formatNumber(index + 1)}
        </p>
        <p className="absolute bottom-4 left-5 flex max-w-[calc(100%-2.5rem)] flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white sm:bottom-6 sm:left-7 sm:text-xs">
          <span>{experience.period}</span>
          <span aria-hidden="true" className="opacity-50">·</span>
          <span>{experience.duration}</span>
        </p>
      </div>
    </article>
  );
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const watermark = watermarkRef.current;
      const header = headerRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      const progressBar = progressBarRef.current;
      if (!section || !watermark || !viewport || !track) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobile: "(max-width: 1023px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, isMobile, reduceMotion } = context.conditions ?? {};
          const cards = track.querySelectorAll("[data-experience-card]");

          if (reduceMotion) {
            gsap.set([section, watermark, header, cards, progressBar], { clearProps: "all" });
            return;
          }

          // Watermark unblur on scroll entrance
          gsap.fromTo(
            watermark,
            { opacity: 0, filter: "blur(20px)", scale: 0.8 },
            {
              opacity: 1,
              filter: "blur(3px)",
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "top top",
                scrub: true,
                invalidateOnRefresh: true,
              },
            }
          );

          if (isDesktop && progressBar) {
            const getScrollDistance = () =>
              Math.max(0, track.scrollWidth - viewport.clientWidth);

            const tl = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${getScrollDistance() + window.innerHeight}`,
                pin: true,
                scrub: 0.85,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            if (header) {
              tl.fromTo(
                header,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.15, ease: "power2.out" },
                0
              );
            }

            tl.fromTo(
              cards,
              { opacity: 0, y: 40, scale: 0.96 },
              { opacity: 1, y: 0, scale: 1, stagger: 0.08, duration: 0.2, ease: "power2.out" },
              0
            )
              .to(track, { x: () => -getScrollDistance(), duration: 1, ease: "none" }, 0)
              .fromTo(
                progressBar,
                { scaleX: 0 },
                { scaleX: 1, transformOrigin: "left center", duration: 1, ease: "none" },
                0
              );
          }

          if (isMobile) {
            if (header) {
              gsap.fromTo(
                header,
                { opacity: 0, y: 18 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.65,
                  ease: "power2.out",
                  scrollTrigger: { trigger: section, start: "top 72%" },
                }
              );
            }

            gsap.fromTo(
              cards,
              { opacity: 0, y: 70, scale: 0.96 },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.12,
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: { trigger: viewport, start: "top 78%" },
              }
            );
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="relative z-20 h-svh overflow-hidden bg-subtle px-4 py-5 sm:px-8 sm:py-7 lg:px-24 lg:py-10 motion-reduce:h-auto motion-reduce:min-h-svh motion-reduce:overflow-visible"
    >
      <span
        id="experience-komatsu-remanufacturing-asia"
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0"
      />
      <h2 id="experience-heading" className="sr-only">
        Professional experience
      </h2>

      {/* Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-center text-[clamp(5rem,17vw,17rem)] font-bold leading-none tracking-[-0.075em] text-white/4.5 blur-[3px]"
      >
        EXPERIENCES
      </div>

      <div className="relative z-10 mx-auto flex h-full min-h-0 max-w-7xl flex-col">
        {/* Header */}
        <div
          ref={headerRef}
          className="mb-4 flex shrink-0 items-end justify-between gap-6 sm:mb-5 lg:mb-8"
        >
          <div>
            <p className="font-mono text-[0.58rem] uppercase tracking-[0.28em] text-white/45 sm:text-[0.65rem]">
              Career archive
            </p>
            <p className="mt-2 text-[clamp(1.9rem,9vw,2.6rem)] font-semibold uppercase leading-none tracking-[-0.035em] text-white sm:mt-3 lg:text-3xl">
              experiences
            </p>
          </div>
          <p className="hidden max-w-[26rem] text-right text-sm leading-relaxed text-white/45 md:block">
            Roles, systems, and the work behind them.
          </p>
        </div>

        {/* Viewport & Track */}
        <div
          ref={viewportRef}
          data-experience-viewport="true"
          className="min-h-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-visible"
        >
          <div
            ref={trackRef}
            data-experience-track="true"
            className="experience-track mx-auto flex h-full w-max gap-4 will-change-transform sm:gap-8"
          >
            {EXPERIENCES.map((exp, idx) => (
              <ExperienceCard key={exp.id} experience={exp} index={idx} />
            ))}
          </div>
        </div>

        {/* Bottom Progress Bar */}
        <div
          aria-hidden="true"
          className="mt-6 hidden h-px shrink-0 overflow-hidden bg-white/12 lg:block"
        >
          <div
            ref={progressBarRef}
            className="h-full w-full origin-left scale-x-0 bg-white/70 will-change-transform"
          />
        </div>
      </div>
    </section>
  );
}
