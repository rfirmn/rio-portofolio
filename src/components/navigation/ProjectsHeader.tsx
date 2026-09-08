"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PROFILE } from "@/data";

export function ProjectsHeader() {
  const pathname = usePathname();

  return (
    <header className="w-full flex items-center justify-between px-6 py-8 sm:px-10 lg:px-24 max-w-7xl mx-auto">
      <Link href="/" className="flex items-center gap-3 select-none group">
        <span className="grid w-9 h-9 place-items-center rounded-full bg-foreground text-background font-serif italic text-lg leading-none transition-transform group-hover:scale-105">
          <span className="-translate-x-0.5">{PROFILE.monogram}</span>
        </span>
        <span className="px-3.5 py-2 border border-border rounded-full bg-card/85 backdrop-blur-md font-mono text-[0.65rem] font-semibold tracking-[0.18em] uppercase text-foreground transition-colors group-hover:border-accent">
          {PROFILE.brandTitle}
        </span>
      </Link>

      <nav className="flex items-center gap-6 sm:gap-8 font-mono text-xs uppercase tracking-[0.15em] font-semibold text-foreground">
        <Link
          href="/"
          className={`transition-colors duration-200 ${
            pathname === "/" ? "border-b-2 border-foreground pb-0.5" : "opacity-60 hover:opacity-100 hover:text-sky-500"
          }`}
        >
          Home
        </Link>
        <Link
          href="/projects"
          className={`transition-colors duration-200 ${
            pathname === "/projects"
              ? "border-b-2 border-foreground pb-0.5"
              : "opacity-60 hover:opacity-100 hover:text-sky-500"
          }`}
        >
          Projects
        </Link>
      </nav>
    </header>
  );
}
