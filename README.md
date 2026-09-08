# Rio Firman Raharja — Portfolio Website

Personal portfolio website built with modern creative development standards. Designed for high interactivity, smooth physics-based scrolling, and a clean minimalist aesthetic showcasing expertise across **Machine Learning & Applied AI**, **Backend Architecture**, and **Full-Stack Engineering**.

---

## ✨ Features & Architecture

- **Interactive Hero Section:** Dynamic multi-role typewriter animation, real-time availability indicator, interactive 3D mouse-tilt portrait frame, and quick social links.
- **Curved Dome Morph Transition:** GSAP ScrollTrigger physics-based curved SVG horizon transition expanding smoothly into the About manifesto.
- **Masked Line-by-Line Scrub Reveal:** Fluid typography reveal synchronized with scroll momentum for narrative storytelling.
- **Pinned Horizontal Experience Track:** Fullscreen horizontal scrolling mechanism presenting professional timeline and quantifiable impact metrics.
- **Interactive Project Showcase:** Side-by-side featured project slider with image carousels, role tags, and a dedicated filterable **Projects Archive** page (`/projects`).
- **Live & Auto-Updating GitHub Tracker:**
  - Real-time GitHub commit activity for [`@rfirmn`](https://github.com/rfirmn) (320+ contributions, 60+ active days).
  - Next.js ISR route (`/api/github`) with a **1-week caching schedule** (`s-maxage=604800`) and client-side `localStorage` caching to minimize API calls and prevent rate limiting.
  - Interactive SVG heatmap grid with commit count and date tooltips.
- **Staggered Drawer Navigation:** Floating pill navigation with responsive sliding text (`Menu` ⇄ `Close`), morphing hamburger-to-X icon, and high-contrast dark slate drawer with layered accents.
- **Lenis Smooth Scroll:** Momentum-based buttery smooth scrolling integrated with GSAP animation timelines.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [GSAP (GreenSock)](https://greensock.com/) & [ScrollTrigger](https://greensock.com/scrolltrigger/)
- **Smooth Scrolling:** [Lenis](https://lenis.darkroom.engineering/)
- **Typography:** Instrument Serif, Manrope, Geist Mono
- **Deployment:** Optimized for [Vercel](https://vercel.com/) or any modern Node.js environment

---

## 📂 Directory Structure

```text
my-portofolio/
├── docs/                                # Documentation and guides
│   └── GUIDE_UPDATE_PROJECTS_AND_EXPERIENCE.md  # Step-by-step content update guide
├── public/                              # Static public assets
│   ├── images/
│   │   ├── avatar/profile.png           # Profile photo
│   │   ├── experiences/                 # Experience photos & logos
│   │   └── projects/                    # Project screenshots & mockups
│   └── icon.svg                         # Site favicon
├── src/
│   ├── app/
│   │   ├── api/github/route.ts          # Weekly-cached GitHub contributions API
│   │   ├── projects/page.tsx            # Filterable Projects Archive page
│   │   ├── globals.css                  # Design tokens, theme variables & animations
│   │   ├── layout.tsx                   # Root layout, metadata & font definitions
│   │   └── page.tsx                     # Main single-page portfolio view
│   ├── components/
│   │   ├── navigation/                  # StaggeredMenu, ProjectsHeader
│   │   ├── providers/                   # Lenis SmoothScrollProvider
│   │   ├── sections/                    # Hero, About, Experience, Projects, Github
│   │   └── shared/                      # Footer, Icons
│   └── data/
│       ├── profile.ts                   # Persona, skills, bio, socials & contact
│       ├── experiences.ts               # Experience timeline items
│       ├── projects.ts                  # Featured projects & archive repository
│       └── index.ts                     # Centralized data re-exports
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js:** v18.18.0 or higher
- **Package Manager:** npm, pnpm, or yarn

### 1. Clone the repository
```bash
git clone https://github.com/rfirmn/my-portofolio.git
cd my-portofolio
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the portfolio.

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 📝 Updating Portfolio Content

All personal data, skills, experiences, and projects are centralized in `src/data/` for easy maintenance:

| What to Update | File Location | Description |
| :--- | :--- | :--- |
| **Identity & Socials** | [`src/data/profile.ts`](src/data/profile.ts) | Name, headline roles, bio manifesto, skills, email, and social links. |
| **Profile Photo** | `public/images/avatar/profile.png` | Swap the portrait image file with your own photo. |
| **Experiences** | [`src/data/experiences.ts`](src/data/experiences.ts) | Work history, roles, companies, dates, and key highlights. |
| **Projects** | [`src/data/projects.ts`](src/data/projects.ts) | Project descriptions, tech stacks, screenshots, and live/repo links. |

> 📖 **Detailed Guide:** See [**docs/GUIDE_UPDATE_PROJECTS_AND_EXPERIENCE.md**](docs/GUIDE_UPDATE_PROJECTS_AND_EXPERIENCE.md) for copy-paste templates and image asset guidelines.

---

## 📬 Contact & Links

- **Author:** Rio Firman Raharja
- **Website:** [rfirmn.dev](https://github.com/rfirmn)
- **GitHub:** [@rfirmn](https://github.com/rfirmn)
- **LinkedIn:** [linkedin.com/in/rio-firman](https://www.linkedin.com/in/rio-firman/)
- **Email:** [firmanrio59@gmail.com](mailto:firmanrio59@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
