# AboutSection Specification

## Overview
- **Target file:** `src/components/sites/iqmal-dev-e1babc1b/root-8a5edab2/AboutSection.tsx`
- **Screenshot:** `docs/design-references/iqmal-dev-e1babc1b/root-8a5edab2/about_section_1788630213306.png`
- **Interaction model:** Time-driven infinite marquee with hover pause

## DOM Structure
- `<section id="about">`
  - Top dome curved transition (`rounded-[50%] bg-[#1e1e1e]`)
  - Highlighted statement paragraph with alternating opacity levels
  - Linear masked marquee strip (`border-y border-white/10`)
  - Continuous animated items with diamond icons (`✦`)

## Computed Styles
- Background: `#1e1e1e` (Dark subtle)
- Text high emphasis: `#ffffff font-semibold`
- Text low emphasis: `rgba(255, 255, 255, 0.45) font-normal`
- Font size: `clamp(1.75rem, 3.8vw, 3.6rem)`

## Behaviors
- Marquee: 25s linear infinite translation `-50%`
- Hover state: `animation-play-state: paused`
