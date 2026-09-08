"use client";

import React, { useRef, useState, useEffect } from "react";
import { GITHUB_CALENDAR_SVG } from "./github-svg-data";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROFILE } from "@/data";

gsap.registerPlugin(ScrollTrigger);

const CACHE_KEY = "rfirmn_github_contributions_v1";
const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export function GithubSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const gridWrapperRef = useRef<HTMLDivElement>(null);

  const [svgHtml, setSvgHtml] = useState<string>(GITHUB_CALENDAR_SVG);
  const [liveStats, setLiveStats] = useState({
    total: PROFILE.githubStats.contributionsCount,
    streak: PROFILE.githubStats.longestStreakDays,
    active: PROFILE.githubStats.activeDays,
  });

  const [contributionsCount, setContributionsCount] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [activeDaysCount, setActiveDaysCount] = useState(0);

  // Client-side weekly sync with localStorage caching (7 days)
  useEffect(() => {
    let isMounted = true;

    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        const age = Date.now() - (parsed.timestamp || 0);

        // If cached within the last 7 days, use it directly without API fetch
        if (age < ONE_WEEK_MS && parsed.data) {
          if (isMounted) {
            setLiveStats({
              total: parsed.data.total,
              streak: parsed.data.longestStreakDays,
              active: parsed.data.activeDays,
            });
            if (parsed.data.svg) {
              setSvgHtml(parsed.data.svg);
            }
          }
          return;
        }
      }
    } catch {
      // LocalStorage unavailable, proceed to fetch
    }

    // Cache expired (> 7 days) or missing: fetch /api/github
    fetch("/api/github")
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted || !data?.success) return;

        setLiveStats({
          total: data.total ?? PROFILE.githubStats.contributionsCount,
          streak: data.longestStreakDays ?? PROFILE.githubStats.longestStreakDays,
          active: data.activeDays ?? PROFILE.githubStats.activeDays,
        });

        if (data.svg) {
          setSvgHtml(data.svg);
        }

        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), data })
          );
        } catch {
          // Ignore quota/storage errors
        }
      })
      .catch((err) => {
        console.warn("GitHub weekly sync fallback active:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useGSAP(
    () => {
      // Parallax watermark
      if (watermarkRef.current && sectionRef.current) {
        gsap.fromTo(
          watermarkRef.current,
          { y: -50, opacity: 0 },
          {
            y: 50,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Staggered pop-in for heatmap cells
      if (gridWrapperRef.current) {
        gsap.fromTo(
          ".contrib-cell",
          { scale: 0, opacity: 0, transformOrigin: "center center" },
          {
            scale: 1,
            opacity: 1,
            stagger: { grid: [7, 53], from: "start", amount: 1.5 },
            duration: 0.6,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: gridWrapperRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // Counter animation for statistics
      if (sectionRef.current) {
        const stats = { contrib: 0, streak: 0, active: 0 };
        gsap.to(stats, {
          contrib: liveStats.total,
          streak: liveStats.streak,
          active: liveStats.active,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
          onUpdate: () => {
            setContributionsCount(Math.floor(stats.contrib));
            setStreakCount(Math.floor(stats.streak));
            setActiveDaysCount(Math.floor(stats.active));
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [liveStats, svgHtml] }
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="github-heading"
      className="github-section relative z-20 -mt-8 bg-background px-6 pt-24 pb-32 text-foreground shadow-[0_20px_50px_rgba(0,0,0,0.08)] sm:px-10 lg:px-24 overflow-hidden"
    >
      <h2 id="github-heading" className="sr-only">
        GitHub Contributions
      </h2>

      {/* Large Blurred Watermark with Parallax */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-12 flex select-none items-center justify-center text-center text-[clamp(4rem,15vw,15rem)] font-bold leading-none tracking-[-0.075em] text-foreground/[0.045] blur-[3px] will-change-transform"
      >
        CONTRIBUTIONS
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-foreground/10 pb-8 lg:mb-20">
          <div>
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-foreground/65">
              Coding activity
            </p>
            <p className="mt-3 text-3xl sm:text-4xl font-semibold uppercase tracking-[-0.035em] text-foreground">
              GitHub Contributions
            </p>
          </div>
          <p className="hidden max-w-sm text-right text-sm leading-relaxed text-foreground/50 md:block">
            Open-source activity tracker showing commits, pull requests, and code reviews.
          </p>
        </div>

        {/* Stats and Calendar Grid */}
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16 items-center">
          {/* Stats Column with Animated Counters */}
          <div className="flex flex-col justify-center gap-6">
            <div className="rounded-2xl border border-foreground/12 bg-card/30 p-6 sm:p-8 backdrop-blur-xs">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-foreground/65">
                Last 365 Days
              </p>
              <div className="mt-3 font-serif text-5xl font-bold text-foreground sm:text-6xl">
                {contributionsCount}
              </div>
              <p className="mt-2 text-sm text-foreground/60">contributions in the last year</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-foreground/12 bg-card/20 p-5">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-foreground/65">
                  Longest Streak
                </p>
                <div className="mt-2 text-2xl font-semibold text-foreground">
                  {streakCount} days
                </div>
              </div>
              <div className="rounded-xl border border-foreground/12 bg-card/20 p-5">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-foreground/65">
                  Active Days
                </p>
                <div className="mt-2 text-2xl font-semibold text-foreground">
                  {activeDaysCount} days
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Heatmap Container */}
          <div
            ref={gridWrapperRef}
            className="overflow-x-auto pb-4 rounded-2xl border border-foreground/10 bg-card/20 p-6 backdrop-blur-xs"
            data-lenis-prevent="true"
          >
            <div
              className="min-w-[680px] flex justify-center [&_svg]:max-w-full"
              dangerouslySetInnerHTML={{ __html: svgHtml }}
            />

            {/* Legend Footer */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-[10px] text-foreground/65 border-t border-foreground/10 pt-4">
              <div className="flex items-center gap-2.5">
                <a
                  href={PROFILE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono hover:text-foreground hover:underline transition-colors font-medium text-sky-500"
                >
                  @{PROFILE.githubStats.username}
                </a>
                <span className="hidden sm:inline-block text-foreground/30">•</span>
                <span className="hidden sm:inline-block font-mono text-[9px] uppercase tracking-wider text-foreground/45">
                  Live sync · Updated weekly
                </span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <span>Less</span>
                <span className="inline-block w-2.5 h-2.5 rounded-xs bg-foreground/10" />
                <span className="inline-block w-2.5 h-2.5 rounded-xs bg-sky-900/35" />
                <span className="inline-block w-2.5 h-2.5 rounded-xs bg-sky-700/55" />
                <span className="inline-block w-2.5 h-2.5 rounded-xs bg-sky-500/80" />
                <span
                  className="inline-block w-2.5 h-2.5 rounded-xs bg-sky-400"
                  style={{ backgroundColor: "#38bdf8" }}
                />
                <span>More</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
