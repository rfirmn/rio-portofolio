"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  MailIcon,
  CodeBracketIcon,
} from "@/components/shared/Icons";
import { PROFILE } from "@/data";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Cycling typewriter effect across all roles
  const roles = PROFILE.roles && PROFILE.roles.length > 0
    ? PROFILE.roles
    : ["Machine Learning & Applied AI Engineer", "Backend Engineer", "Full-Stack Engineer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex % roles.length];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), 2400);
    } else if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    } else {
      const speed = isDeleting ? 38 : 75;
      timeout = setTimeout(() => {
        setDisplayText((prev) =>
          isDeleting
            ? currentRole.slice(0, prev.length - 1)
            : currentRole.slice(0, prev.length + 1)
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex, roles]);

  // 3D card tilt effect
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // GSAP Entrance Timeline
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions ?? {};
          if (reduceMotion) return;

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          if (isDesktop) {
            tl.from(".hero-socials a", { opacity: 0, y: -20, stagger: 0.1, duration: 0.8 })
              .from(".location", { opacity: 0, x: -200, duration: 1.2 }, "-=0.6")
              .from(".greetings", { opacity: 0, x: 200, duration: 1.6 }, "-=0.8")
              .from(".profile-card", { scale: 0.85, opacity: 0, duration: 1.2, rotate: 4 }, "-=1.4")
              .from(".hero-resume", { opacity: 0, scale: 0.8, duration: 0.6 }, "-=0.8")
              .from(".hero-scroll-indicator", { opacity: 0, y: 15, duration: 1 }, "-=1.3");
          } else {
            tl.from(".hero-socials a", { opacity: 0, stagger: 0.08, duration: 0.45 })
              .from(".location", { opacity: 0, duration: 0.4 }, "-=0.25")
              .from(".greetings", { opacity: 0, duration: 0.55 }, "-=0.2")
              .from(".profile-card", { opacity: 0, scale: 0.9, duration: 0.6 }, "-=0.3")
              .from(".hero-resume", { opacity: 0, duration: 0.4 }, "-=0.2")
              .from(".hero-scroll-indicator", { opacity: 0, duration: 0.35 }, "-=0.15");
          }
        }
      );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      className="hero-section relative mb-0 grid min-h-[calc(100vh-5rem)] content-start items-start gap-8 px-6 pb-16 pt-28 sm:gap-10 sm:px-10 sm:pb-20 sm:pt-32 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.7fr)] lg:content-center lg:items-center lg:gap-12 lg:px-24 lg:py-10"
    >
      {/* Subtle Dot Matrix Background with Cold Tint */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(14,165,233,0.08)_1.5px,transparent_1.5px)] [background-size:32px_32px]"
        style={{
          maskImage: "radial-gradient(ellipse at center, white 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, white 40%, transparent 100%)",
        }}
      />

      {/* Left Column: Bio & Title */}
      <div className="relative z-10 max-w-4xl">
        {/* Social Links */}
        <div className="hero-socials mb-4 flex items-center gap-6 sm:mb-5 lg:mb-6">
          <a
            href={PROFILE.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/45 hover:text-foreground transition-colors duration-300"
            aria-label="GitHub"
          >
            <GithubIcon className="h-5 w-5" />
          </a>
          <a
            href={PROFILE.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/45 hover:text-foreground transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-5 w-5" />
          </a>
          <a
            href={PROFILE.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground/45 hover:text-foreground transition-colors duration-300"
            aria-label="Instagram"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
          <a
            href={`mailto:${PROFILE.socials.email}`}
            className="text-foreground/45 hover:text-foreground transition-colors duration-300"
            aria-label="Email"
          >
            <MailIcon className="h-5 w-5" />
          </a>
        </div>

        {/* Location */}
        <p className="location font-sans text-xs sm:text-sm uppercase tracking-[0.28em] text-muted-foreground">
          {PROFILE.location}
        </p>

        {/* Greetings */}
        <h1 className="greetings mt-4 min-h-[4.5rem] max-w-[12ch] font-serif text-6xl leading-[0.95] sm:mt-5 sm:min-h-[7rem] sm:text-8xl lg:min-h-[9rem] lg:text-9xl text-foreground">
          Hi, I’m <span className="italic font-serif">{PROFILE.shortName}.</span>
        </h1>

        {/* Typewriter Role */}
        <div className="inline-block mt-2 sm:mt-3">
          <div
            className="inline-block whitespace-nowrap tracking-tight role text-xl sm:text-4xl lg:text-5xl font-light leading-tight tracking-[0.04em] text-foreground/80"
            aria-label={roles[roleIndex % roles.length]}
          >
            <span>{displayText}</span>
            <span className="text-type-cursor ml-1 inline-block opacity-100 text-sky-500">
              █
            </span>
          </div>
        </div>

        {/* Resume Button */}
        <div className="hero-resume mt-6 sm:mt-8 flex">
          <a
            href={PROFILE.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center rounded-full border border-foreground/15 bg-foreground px-6 py-3 font-mono text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-background transition-all duration-300 hover:bg-sky-500 hover:text-white hover:border-sky-500 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-500"
          >
            Resume
          </a>
        </div>
      </div>

      {/* Right Column: 3D Perspective Profile Card */}
      <div className="profile-card relative z-10 flex w-full justify-center [perspective:1200px] lg:justify-end">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative h-[480px] w-full max-w-[390px] overflow-hidden rounded-[2rem] border border-white/18 bg-[#0b0f17] will-change-transform sm:h-[560px] sm:max-w-[450px] lg:h-[640px] lg:max-w-[500px] transition-transform duration-200 ease-out"
          style={{
            transformStyle: "preserve-3d",
            boxShadow: "0 28px 70px rgba(10, 15, 26, 0.25)",
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          }}
        >
          {/* Titanium Cold Slate Gradient Background */}
          <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(180deg,rgba(56,189,248,0.14),rgba(56,189,248,0)_36%),linear-gradient(180deg,#1c2430_0%,#0e1420_48%,#06080e_100%)]" />
          <div className="absolute inset-x-8 top-8 h-px bg-sky-400/20" />

          {/* Decorative Code Bracket SVGs with Cold Ice Blue Tint */}
          <div className="absolute left-8 top-24 -rotate-12 text-sky-400/10 pointer-events-none">
            <CodeBracketIcon className="w-20 h-20" />
          </div>
          <div className="absolute right-8 top-16 rotate-12 text-sky-400/10 pointer-events-none">
            <CodeBracketIcon className="w-24 h-24" />
          </div>
          <div className="absolute bottom-32 left-10 rotate-6 text-sky-400/8 pointer-events-none">
            <CodeBracketIcon className="w-16 h-16" />
          </div>

          {/* Portrait Image */}
          <div className="absolute inset-0 z-10">
            <Image
              src={PROFILE.avatar.src}
              alt={PROFILE.avatar.alt}
              fill
              priority
              className="object-cover object-bottom rounded-[2rem] grayscale hover:grayscale-0 transition-[filter] duration-700 ease-out"
              sizes="(min-width: 1024px) 520px, (min-width: 640px) 450px, 90vw"
            />
          </div>

          {/* Bottom Gradient Fade */}
          <div className="absolute inset-x-0 bottom-0 z-20 h-44 rounded-b-[2rem] bg-gradient-to-t from-[#06080e] via-[#06080e]/85 to-transparent pointer-events-none" />

          {/* Floating Availability Pill with Ice Blue Pulse */}
          <div className="absolute inset-x-5 bottom-5 z-30 flex items-center justify-between gap-4 rounded-2xl border border-sky-400/20 bg-slate-900/70 px-5 py-4 text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <div>
              <p className="text-sm font-semibold leading-none">{PROFILE.availability.handle}</p>
              <p className="mt-2 text-xs leading-none text-white/65">{PROFILE.availability.status}</p>
            </div>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500 shadow-[0_0_14px_rgba(56,189,248,0.9)]" />
            </span>
          </div>
        </div>
      </div>

      {/* Bouncing Scroll Down Indicator */}
      <div className="hero-scroll-indicator absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none opacity-50">
        <div className="w-5 h-8 border border-foreground/40 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-sky-500 rounded-full animate-bounce" style={{ animationDuration: "1.8s" }} />
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-foreground/70">
            Scroll Down
          </span>
        </div>
      </div>
    </section>
  );
}
