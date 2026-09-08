"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSmoothScroll } from "@/components/providers/SmoothScrollProvider";
import { PROFILE } from "@/data";

interface MenuItem {
  title: string;
  href: string;
  index: string;
}

const MENU_ITEMS: MenuItem[] = [
  { title: "Home", href: "/#home", index: "01" },
  { title: "About", href: "/#about", index: "02" },
  { title: "Experience", href: "/#experience", index: "03" },
  { title: "Projects", href: "/#projects", index: "04" },
  { title: "All Projects", href: "/projects", index: "05" },
  { title: "Contact", href: "/#contact", index: "06" },
];

export function StaggeredMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();
  const { lenis } = useSmoothScroll();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    }
    return () => {
      document.body.style.overflow = "";
      if (lenis) lenis.start();
    };
  }, [isOpen, lenis]);

  // Scroll detection for auto-hiding header
  useEffect(() => {
    let ticking = false;
    const handleScroll = (scrollY: number) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (isOpen) {
            setIsHeaderHidden(false);
          } else if (scrollY <= 50) {
            setIsHeaderHidden(false);
          } else if (scrollY > lastScrollY.current && scrollY > 80) {
            setIsHeaderHidden(true);
          } else if (scrollY < lastScrollY.current) {
            setIsHeaderHidden(false);
          }
          lastScrollY.current = scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    if (lenis) {
      const unsubscribe = lenis.on("scroll", (e: { scroll: number }) => {
        handleScroll(e.scroll);
      });
      return () => {
        if (typeof unsubscribe === "function") unsubscribe();
      };
    } else {
      const onWindowScroll = () => handleScroll(window.scrollY);
      window.addEventListener("scroll", onWindowScroll, { passive: true });
      return () => window.removeEventListener("scroll", onWindowScroll);
    }
  }, [isOpen, lenis]);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/#") && pathname === "/") {
      const targetId = href.replace("/", "");
      if (lenis) {
        lenis.scrollTo(targetId, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        const elem = document.querySelector(targetId);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <div className="sm-scope">
      {/* Fixed Header Bar */}
      <header
        className={`staggered-menu-header ${isHeaderHidden ? "sm-header-hidden" : ""} ${isOpen ? "sm-menu-open" : ""
          }`}
        aria-label="Main navigation header"
      >
        <Link href="/#home" className="sm-logo" onClick={() => handleNavClick("/#home")}>
          <span className="sm-logo-mark" aria-hidden="true">
            <span>{PROFILE.monogram}</span>
          </span>
          <span className="sm-logo-copy">{PROFILE.brandTitle}</span>
        </Link>

        {/* Toggle Button */}
        <button
          className="sm-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          type="button"
        >
          <span className="sm-toggle-textWrap">
            <span
              className="sm-toggle-textInner transition-transform duration-300 ease-out"
              style={{ transform: isOpen ? "translateY(-1.15em)" : "translateY(0)" }}
            >
              <span className="sm-toggle-line">Menu</span>
              <span className="sm-toggle-line">Close</span>
            </span>
          </span>
          <span className="sm-icon" aria-hidden="true">
            <span
              className="sm-icon-line transition-transform duration-300"
              style={{
                transform: isOpen
                  ? "translate(-50%, -50%) rotate(45deg)"
                  : "translate(-50%, -50%) translateY(-2.5px)",
              }}
            />
            <span
              className="sm-icon-line transition-transform duration-300"
              style={{
                transform: isOpen
                  ? "translate(-50%, -50%) rotate(-45deg)"
                  : "translate(-50%, -50%) translateY(2.5px)",
              }}
            />
          </span>
        </button>
      </header>

      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity duration-500 pointer-events-auto ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Pre-layer sliding curtains */}
      <div className="sm-prelayers" aria-hidden="true">
        {/* Layer 1: Ice blue accent */}
        <div
          className="sm-prelayer"
          style={{
            background: "#38bdf8",
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            transitionDelay: isOpen ? "0ms" : "200ms",
          }}
        />
        {/* Layer 2: Slate navy */}
        <div
          className="sm-prelayer"
          style={{
            background: "#1e293b",
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
            transitionDelay: isOpen ? "100ms" : "100ms",
          }}
        />
      </div>

      {/* Main Staggered Menu Panel */}
      <aside
        id="staggered-menu-panel"
        className="staggered-menu-panel"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transitionDelay: isOpen ? "200ms" : "0ms",
          pointerEvents: isOpen ? "auto" : "none",
        }}
        aria-hidden={!isOpen}
        data-lenis-prevent="true"
      >
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list">
            {MENU_ITEMS.map((item, index) => (
              <li
                key={item.href}
                className="sm-panel-itemWrap"
                style={{
                  transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                  transitionDelay: isOpen ? `${250 + index * 50}ms` : "0ms",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateY(0)" : "translateY(30px)",
                }}
              >
                <Link
                  href={item.href}
                  className="sm-panel-item"
                  onClick={() => handleNavClick(item.href)}
                >
                  <span className="sm-panel-itemLabel">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Socials at bottom */}
          <div
            className="sm-socials"
            style={{
              transition: "all 0.5s ease",
              transitionDelay: isOpen ? "600ms" : "0ms",
              opacity: isOpen ? 1 : 0,
            }}
          >
            <h3 className="sm-socials-title">Socials</h3>
            <ul className="sm-socials-list" role="list">
              <li>
                <a
                  href={PROFILE.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm-socials-link"
                >
                  Resume
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm-socials-link"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm-socials-link"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={PROFILE.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm-socials-link"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}
