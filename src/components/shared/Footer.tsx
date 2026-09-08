"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowUpRightIcon, PixelRobotIcon } from "./Icons";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const [time, setTime] = useState<string>("");
  const footerRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: PROFILE.timezone.ianaZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const formatted = new Intl.DateTimeFormat("en-GB", options).format(now);
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const footer = footerRef.current;
      const watermark = watermarkRef.current;
      const title = titleRef.current;
      const cta = ctaRef.current;
      const bottom = bottomRef.current;
      if (!footer || !watermark || !title || !cta || !bottom) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          isAll: "(min-width: 0px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion } = context.conditions ?? {};
          const words = title.querySelectorAll(".contact-word");

          if (reduceMotion) {
            gsap.set([footer, watermark, cta, bottom, words], { clearProps: "all" });
            return;
          }

          // Parallax watermark scrub
          gsap.fromTo(
            watermark,
            { yPercent: -10, opacity: 0 },
            {
              yPercent: 10,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: footer,
                start: "top 90%",
                end: "bottom bottom",
                scrub: true,
              },
            }
          );

          // Content reveal on scroll
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: footer,
              start: "top 80%",
            },
          });

          tl.fromTo(
            words,
            { yPercent: 80, opacity: 0 },
            { yPercent: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: "power2.out" },
            0
          )
            .fromTo(
              cta,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, ease: "power2.out", duration: 0.8 },
              0.3
            )
            .fromTo(
              bottom,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, ease: "power2.out", duration: 0.8 },
              0.5
            );
        }
      );
    },
    { scope: footerRef }
  );

  return (
    <footer
      id="contact"
      ref={footerRef}
      aria-labelledby="contact-heading"
      className="contact-section relative z-10 w-full bg-[#0d121c] text-white flex flex-col justify-between overflow-hidden px-6 py-12 sm:px-10 text-center min-h-screen min-h-dvh md:h-screen md:min-h-screen md:px-24 md:py-16"
    >
      {/* Background Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-center text-[clamp(6rem,22vw,22rem)] font-bold leading-none tracking-[-0.075em] text-white/[0.035] blur-[3px]"
      >
        CONTACT
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between items-center gap-12">
        {/* Top Meta info */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-sky-400/80">
            Get in touch
          </p>
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-white/65">
            {PROFILE.timezone.city} / {time || "00:00:00"} {PROFILE.timezone.label}
          </p>
        </div>

        {/* Main Title & Email */}
        <div className="my-auto max-w-5xl py-6">
          <h2
            id="contact-heading"
            ref={titleRef}
            className="font-sans font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase tracking-[-0.04em] leading-[0.95] flex flex-wrap justify-center gap-x-4 sm:gap-x-7 overflow-hidden py-2"
          >
            <span className="inline-block overflow-hidden py-1">
              <span className="contact-word inline-block will-change-transform">Let’s</span>
            </span>
            <span className="inline-block overflow-hidden py-1">
              <span className="contact-word inline-block will-change-transform">work</span>
            </span>
            <span className="inline-block overflow-hidden py-1">
              <span className="contact-word inline-block will-change-transform">together</span>
            </span>
          </h2>

          <div ref={ctaRef} className="mt-8 sm:mt-12 flex justify-center will-change-transform">
            <a
              href={`mailto:${PROFILE.socials.email}`}
              className="group inline-flex items-center gap-2 text-lg sm:text-2xl md:text-3xl font-light tracking-tight text-white/90 hover:text-sky-400 transition-colors duration-300 border-b border-white/20 pb-1 hover:border-sky-400"
            >
              <span>{PROFILE.socials.email}</span>
              <ArrowUpRightIcon className="w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </div>

          {/* Links row */}
          <div className="mt-10 flex items-center justify-center gap-6 sm:gap-10 font-mono text-xs uppercase tracking-[0.18em] text-white/60">
            <a
              href={PROFILE.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors duration-200"
            >
              Resume
            </a>
            <a
              href={PROFILE.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors duration-200"
            >
              GitHub
            </a>
            <a
              href={PROFILE.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors duration-200"
            >
              LinkedIn
            </a>
            <a
              href={PROFILE.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition-colors duration-200"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Bottom Robot Icon & Copyright */}
        <div ref={bottomRef} className="flex flex-col items-center gap-3 pb-2 will-change-transform">
          <PixelRobotIcon className="w-7 h-7 text-white/40" />
          <p className="font-mono text-[0.62rem] tracking-[0.15em] text-white/40 uppercase">
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
