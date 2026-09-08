"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const domeRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Parallax dome morphing transition
      if (domeRef.current && sectionRef.current) {
        gsap.fromTo(
          domeRef.current,
          { scaleY: 0.6, y: 50 },
          {
            scaleY: 1.5,
            y: -50,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "top 20%",
              scrub: 1,
            },
          }
        );
      }

      // Line-by-line staggered scrub reveal
      if (sectionRef.current) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "center 40%",
              scrub: 1.2,
            },
          })
          .fromTo(
            ".line",
            { opacity: 0, yPercent: 100 },
            {
              opacity: 1,
              yPercent: 0,
              duration: 2,
              stagger: { each: 0.25, ease: "power2.out" },
              ease: "power2.out",
            }
          );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="relative flex h-fit flex-col items-center justify-center gap-16 sm:gap-20 bg-[#0d121c] text-white px-6 pb-28 pt-20 sm:pb-36 sm:pt-24 mt-16 sm:mt-24"
    >
      <h2 id="about-heading" className="sr-only">
        About {PROFILE.name}, {PROFILE.roles[0]}
      </h2>

      {/* Curved Top Dome Transition with GSAP Parallax */}
      <div
        ref={domeRef}
        aria-hidden="true"
        className="absolute left-1/2 -top-28 sm:-top-36 lg:-top-44 h-[180px] sm:h-[240px] lg:h-[280px] w-[180vw] sm:w-[160vw] -translate-x-1/2 rounded-[50%] bg-[#0d121c] pointer-events-none origin-bottom will-change-transform"
      />

      {/* Main Narrative Paragraph with Staggered Line Animation */}
      <div className="relative z-10 max-w-5xl text-center font-sans text-[clamp(1.75rem,3.8vw,3.6rem)] leading-[1.25] tracking-[-0.04em]">
        {PROFILE.narrative.lines.map((line, idx) => (
          <div key={idx} className="overflow-hidden py-1">
            <div className="line will-change-transform">
              {line.normal && <span className="text-white/45 font-normal">{line.normal}</span>}
              {line.bold && <span className="text-white font-semibold">{line.bold}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Infinite Horizontal Skills Marquee */}
      <div
        className="relative z-10 mt-4 w-full max-w-5xl overflow-hidden border-y border-white/10 py-6"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
        }}
      >
        <div className="animate-marquee flex gap-12 sm:gap-20 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-white/50">
          {[...PROFILE.skills, ...PROFILE.skills].map((skill, idx) => (
            <span key={idx} className="whitespace-nowrap hover:text-sky-400 transition-colors duration-200">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
