# ProjectsSection Specification

## Overview
- **Target file:** `src/components/sites/iqmal-dev-e1babc1b/root-8a5edab2/ProjectsSection.tsx`
- **Screenshot:** `docs/design-references/iqmal-dev-e1babc1b/root-8a5edab2/projects_section_1788630297761.png`
- **Interaction model:** Click-driven multi-screenshot gallery and project carousel

## DOM Structure
- `<section id="projects">`
  - Header with "Selected projects" and "View All Projects" link
  - Left column:
    - Image viewport with floating left/right navigation arrows
    - Screenshot counter & dynamic caption (`01 / 03 · Dashboard Overview`)
    - Dot indicators
  - Right column:
    - Project number & discipline badge (`FULLSTACK`, `FRONTEND`)
    - Name & full narrative summary
    - Contribution highlights list (01-04)
    - Tech badges pills
    - "VIEW PROJECT ↗" action link
    - "Next Project / 02 / 04" bottom progress trigger
