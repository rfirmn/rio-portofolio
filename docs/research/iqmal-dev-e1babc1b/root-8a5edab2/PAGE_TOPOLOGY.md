# Page Topology: Homepage (/)

- **Source URL**: `https://iqmal.dev/`
- **Destination Route**: `/` (`src/app/page.tsx`)
- **Site Key**: `iqmal-dev-e1babc1b`
- **Page Key**: `root-8a5edab2`

## Section Hierarchy (Top to Bottom)

1. **Header & Navigation Drawer** (`StaggeredMenu.tsx`)
   - Type: Fixed overlay (`z-index: 50`)
   - Logo: "I" initial in Instrument Serif circle + pill badge "IQMAL / PORTFOLIO"
   - Toggle: "MENU +" button morphing to "CLOSE ✕"
   - Drawer: Staggered dual curtain transition (Sage `#aeb8b0` -> Dark Slate `#3d403f` -> Menu Panel `#1e1e1e`)
   - Links: Home, About, Experience, Projects, All Projects, Contact

2. **Hero Section** (`#home`, `HeroSection.tsx`)
   - Type: Normal flow (full viewport grid)
   - Left Column:
     - Social icons (GitHub, LinkedIn, Instagram, Email)
     - Location: `CENTRAL JAVA · INDONESIA`
     - Headline: `Hi, I’m Iqmal.` (Instrument Serif italic)
     - Typewriter role: `Full-Stack Web Developer` + cursor `█`
     - CTA button: `Resume`
   - Right Column:
     - 3D perspective card (`[perspective:1200px]`)
     - Monochromatic portrait (`iqmal.png`) with grayscale-to-color hover transition
     - Floating pill: `@fthliqml` / `Available for work!` with animated green radar pulse
   - Bottom: Mouse scroll down bounce indicator

3. **About Section** (`#about`, `AboutSection.tsx`)
   - Type: Normal flow, dark background (`#1e1e1e`)
   - Top Transition: Curved dome mask (`rounded-[50%] bg-[#1e1e1e]`)
   - Content: Highlighted sentence structure (subtle vs white bold text)
   - Skills Marquee: Infinite 25s loop of technologies with `✦` separators

4. **Experience Section** (`#experience`, `ExperienceSection.tsx`)
   - Type: Normal flow, dark background (`#1e1e1e`)
   - Header: "CAREER ARCHIVE" / "EXPERIENCES"
   - Content: Multi-role card carousel (Komatsu Remanufacturing Asia, ITK, Binar Academy)
   - Features: Role details, period & duration, 4 highlights per role, team/company photography

5. **Projects Section** (`#projects`, `ProjectsSection.tsx`)
   - Type: Normal flow, light background (`#e8e8e5`)
   - Header: "FEATURED ARCHIVE" / "Selected projects" + "View All Projects" link
   - Left: Multi-image slider with prev/next buttons and thumbnail indicators
   - Right: Project details, summary, key achievements, tech stack tags, "VIEW PROJECT ↗"

6. **GitHub Contributions Section** (`GithubSection.tsx`)
   - Type: Normal flow, light background with "CONTRIBUTIONS" watermark
   - Left: Statistics cards (365 Days count, Longest Streak, Active Days)
   - Right: Full SVG contribution calendar heatmap with Emerald intensity levels

7. **Footer / Contact Section** (`#contact`, `Footer.tsx`)
   - Type: Dark background (`#1e1e1e`)
   - Header: "GET IN TOUCH" + live WIB clock (`Asia/Jakarta`)
   - Typography: Huge uppercase "LET'S WORK TOGETHER"
   - Watermark: "CONTACT"
   - Links: Email mailto, Resume, GitHub, LinkedIn, Instagram
   - Mascot: Pixel art robot icon + copyright
