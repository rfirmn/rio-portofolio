# GithubSection Specification

## Overview
- **Target file:** `src/components/sites/iqmal-dev-e1babc1b/root-8a5edab2/GithubSection.tsx`
- **Screenshot:** `docs/design-references/iqmal-dev-e1babc1b/root-8a5edab2/iqmal_dev_homepage_1788629917502.png`
- **Interaction model:** Static data visualization with interactive hover cells and profile links

## DOM Structure
- `<section class="github-section">`
  - Blurred watermark "CONTRIBUTIONS"
  - Header with subtitle "Coding activity"
  - Left stats cards:
    - 365 Days total: 918 contributions
    - Longest streak: 13 days
    - Active days: 60 days
  - Right container:
    - 52-week SVG contribution heatmap with emerald color levels
    - Legend: Less -> More with 5 color intensity blocks
    - External profile link to `@fthliqml`
