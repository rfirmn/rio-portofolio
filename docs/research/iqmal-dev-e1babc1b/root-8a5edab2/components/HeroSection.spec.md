# HeroSection Specification

## Overview
- **Target file:** `src/components/sites/iqmal-dev-e1babc1b/root-8a5edab2/HeroSection.tsx`
- **Screenshot:** `docs/design-references/iqmal-dev-e1babc1b/root-8a5edab2/iqmal_dev_homepage_1788629917502.png`
- **Interaction model:** Interactive click, hover tilt, and time-driven typewriter

## DOM Structure
- `<section id="home">`
  - Subtle radial dot background
  - Left column:
    - Social links list (GitHub, LinkedIn, Instagram, Email)
    - Subtitle location text
    - Greetings `Hi, I’m Iqmal.`
    - Typewriter animated role container with blinking cursor block `█`
    - Resume CTA pill button
  - Right column:
    - Perspective wrapper `[perspective:1200px]`
    - 3D tilt card container
    - Ambient code bracket SVGs
    - Portrait Next/Image with bottom gradient overlay
    - Floating pill `@fthliqml` with green availability radar
  - Scroll down mouse bounce indicator

## Computed Styles
- Background: `#e8e8e5`
- Foreground: `#111114`
- Heading font: Instrument Serif (italicized accent)
- Body font: Manrope
- Code / Mono font: Geist Mono
- Card border: `border-white/18`, background: `bg-[#0b0b0d]`
- Floating pill: `border-white/12 bg-white/[0.08] backdrop-blur-md`

## States & Behaviors
- Typewriter: 90ms step interval for "Full-Stack Web Developer"
- 3D Tilt: mouse tracking calculation `(rotateX, rotateY)` up to +/- 8deg
- Portrait grayscale: `grayscale(100%)` to `grayscale(0%)` over 700ms on hover
