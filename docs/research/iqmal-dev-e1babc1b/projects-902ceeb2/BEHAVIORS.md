# Interaction & Behavior Bible: Projects Archive (/projects)

- **Source URL**: `https://iqmal.dev/projects`
- **Destination Route**: `/projects` (`src/app/projects/page.tsx`)

## 1. Filter by Discipline
- Click on any category filter pill:
  - "ALL PROJECTS 04" -> renders all 4 projects
  - "FRONTEND 03" -> filters to 3 frontend projects (Flight Booking, Kalimantan Biodiversity, Portfolio)
  - "BACKEND 00" -> filters to 0 projects (empty state)
  - "FULLSTACK 01" -> filters to 1 fullstack project (Learning Management System)
- Updates the active button styling (dark filled vs outline).
- Updates "Showing 0N Projects" indicator.

## 2. Project Card Hover Effects
- Card image scales slightly on hover (`scale-[1.03]`).
- Card border transitions to darker tone.
