export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  label: string;
  description: string;
  isCover: boolean;
}

export interface ImpactStat {
  value: string;
  label: string;
}

export interface ProjectItem {
  databaseId: string;
  id: string;
  number: string;
  name: string;
  role: string;
  category: "frontend" | "backend" | "fullstack";
  featured: boolean;
  status: string;
  experienceId?: string;
  experienceLabel?: string;
  summary: string;
  contributions: string[];
  impactSummary?: string;
  impactStats?: ImpactStat[];
  impacts?: string[];
  highlights?: string[];
  techStack?: string[];
  images: ProjectImage[];
  link?: {
    liveUrl?: string;
    githubUrl?: string;
  } | null;
  updatedAt: string;
}

export const PROJECTS: ProjectItem[] = [
  {
    databaseId: "cc9ae2c8-e4ee-40db-b654-28f38cee8abf",
    id: "kra-lms",
    number: "01",
    name: "Learning Management System",
    role: "Fullstack Developer",
    category: "fullstack",
    featured: true,
    status: "active",
    experienceId: "komatsu-remanufacturing-asia",
    experienceLabel: "PT. Komatsu Remanufacturing Asia",
    summary:
      "An internal enterprise LMS built for PT. Komatsu Remanufacturing Asia that centralizes employee training workflows — from planning, approvals, scheduling, to certification tracking and reporting dashboards.",
    contributions: [
      "Led requirement discovery with the client and translated operational needs into clear system workflows and features",
      "Drove weekly progress reviews, gathered stakeholder feedback, and proactively recommended improvements to the proposed solution",
      "Developed the web application across the full implementation lifecycle and independently performed functional testing before UAT",
      "Managed a two-stage UAT process, starting with the Section Head and continuing through managerial review",
      "Resolved findings and implemented revisions as business requirements evolved throughout the project",
      "Partnered closely with the internal IT team to align data structures, business rules, and system implementation",
    ],
    impactSummary:
      "Transformed fragmented, spreadsheet-based training processes into a centralized platform serving employees across the organization.",
    impactStats: [
      { value: "300", label: "Employees" },
      { value: "15", label: "Departments" },
    ],
    impacts: [
      "Consolidated training data previously distributed across multiple spreadsheets into a centralized source of information",
      "Turned an internal innovation plan into an operational platform with reusable and standardized curricula for recurring training programs",
      "Automated survey reminder emails, reducing the need for manual follow-ups after training sessions",
      "Improved traceability across the training lifecycle, from planning and approval to completion and certification",
    ],
    highlights: [
      "Role-based access control with multi-level approval workflows",
      "Interactive scheduling system with calendar integration",
      "Automated certification tracking and expiry notifications",
      "Real-time reporting dashboards with exportable data",
    ],
    techStack: [
      "Laravel Livewire",
      "Blade",
      "Laravel",
      "PHP",
      "Tailwind CSS",
      "Alpine.js",
      "REST API",
    ],
    images: [
      {
        id: "66fd8fcd-e104-459e-aebe-9679be7637cc",
        src: "/images/projects/kra-lms/dashboard.webp",
        alt: "Learning Management System dashboard overview",
        label: "Dashboard Overview",
        description:
          "Active courses, upcoming training schedules, pending surveys, and employee learning progress.",
        isCover: true,
      },
      {
        id: "14f1f685-5e84-4c66-81cb-00d3d52c8f25",
        src: "/images/projects/kra-lms/schedule.webp",
        alt: "Learning Management System training calendar",
        label: "Training Schedule",
        description:
          "A calendar view for reviewing scheduled employee training sessions.",
        isCover: false,
      },
      {
        id: "53d5da52-e078-40d9-9ae7-09c34c98f937",
        src: "/images/projects/kra-lms/course.webp",
        alt: "Learning Management System course detail interface",
        label: "Course Detail",
        description:
          "A structured learning flow covering the pre-test, learning module, post-test, and result.",
        isCover: false,
      },
    ],
    link: null,
    updatedAt: "2026-08-13T13:55:25.249Z",
  },
  {
    databaseId: "0583a028-7437-4af4-b7d0-a8ec470569a0",
    id: "flight-booking",
    number: "02",
    name: "Flight Booking & E-Ticketing Platform",
    role: "Lead Frontend Developer",
    category: "frontend",
    featured: true,
    status: "active",
    summary:
      "A team-based online flight booking and e-ticketing platform developed during Binar Academy's Kampus Merdeka program. Led frontend delivery for responsive booking experiences while collaborating with the backend team on API integration, authentication, payments, notifications, and digital ticket generation.",
    contributions: [],
    impactStats: [],
    impacts: [],
    highlights: [
      "Led frontend task planning and delivery using ClickUp for team coordination",
      "Built flight search, seat selection, multi-passenger booking, payment history, and ticket printing flows",
      "Integrated frontend features with APIs for authentication, flight data, bookings, payments, and notifications",
      "Managed application state with Redux Toolkit for structured and maintainable user flows",
    ],
    techStack: [
      "React",
      "Redux Toolkit",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "PostgreSQL (Supabase)",
      "Prisma ORM",
      "JWT",
      "OTP",
      "Vite",
      "Vercel",
      "GitHub Actions",
      "ClickUp",
    ],
    images: [
      {
        id: "73850ee6-fc13-466b-9c23-a23421358861",
        src: "/images/projects/flight-booking/homepage.webp",
        alt: "Flight search and booking interface",
        label: "Flight Search",
        description:
          "A responsive flight search flow for selecting routes, schedules, and passenger requirements.",
        isCover: true,
      },
      {
        id: "1631ee16-f9ba-4a8f-82e6-02b7c32e3cd4",
        src: "/images/projects/flight-booking/select-flight.webp",
        alt: "Flight selection interface",
        label: "Select Flight",
        description:
          "A flight selection interface that lets users compare available routes, departure schedules, fares, and airline options before continuing with the booking process.",
        isCover: false,
      },
      {
        id: "f520db5e-6418-40a4-808d-aaa3160f295e",
        src: "/images/projects/flight-booking/payment.webp",
        alt: "Payment confirmation interface",
        label: "Payment",
        description:
          "A payment page that summarizes booking details, selected payment method, and the next steps required to complete the reservation.",
        isCover: false,
      },
    ],
    link: null,
    updatedAt: "2026-08-13T13:55:27.261Z",
  },
  {
    databaseId: "ba68c5bd-a2e3-49cf-95e2-7ab9f9cfa2b5",
    id: "kalimantan-biodiversity-portal",
    number: "03",
    name: "Kalimantan Biodiversity Portal",
    role: "Frontend Developer",
    category: "frontend",
    featured: true,
    status: "active",
    summary:
      "A web-based biodiversity portal that helps users explore species and forest data across Kalimantan through responsive information pages, filters, and interactive maps.",
    contributions: [],
    impactStats: [],
    impacts: [],
    highlights: [
      "Delivered the complete user-facing portal from documented SRS requirements",
      "Built interactive maps for species distribution and forest area visualization",
      "Implemented species and conservation filters with regional drill-downs",
      "Collaborated with the backend team to integrate biodiversity and spatial data",
    ],
    techStack: [
      "Jinja Templating",
      "Django",
      "Tailwind CSS",
      "Alpine.js",
      "Leaflet.js",
      "PostgreSQL",
    ],
    images: [
      {
        id: "4f63b1e1-053f-45b4-9331-de8524fbb29e",
        src: "/images/projects/biodiversity-portal/overview.webp",
        alt: "Kalimantan Biodiversity Portal overview",
        label: "Portal Overview",
        description:
          "A responsive portal for exploring biodiversity information, species records, and forest-related data across Kalimantan.",
        isCover: true,
      },
      {
        id: "b9990cc3-8121-4a40-8b75-d9012e0a385f",
        src: "/images/projects/biodiversity-portal/species-detail.webp",
        alt: "Species Detail",
        label: "Species Detail Information",
        description:
          "A detailed species information view presenting key data such as scientific name, conservation status, habitat, distribution, and related biodiversity records.",
        isCover: false,
      },
      {
        id: "5fd98e8d-a14b-4180-9c2e-115afeea199e",
        src: "/images/projects/biodiversity-portal/species-map.webp",
        alt: "Species distribution visualization map",
        label: "Species Distribution Visualization",
        description:
          "An interactive map with species filters, conservation status filtering, hover details, and regional drill-downs.",
        isCover: false,
      },
    ],
    link: null,
    updatedAt: "2026-08-13T13:55:29.223Z",
  },
  {
    databaseId: "df3d5853-b96f-400a-a32d-fa9899d7ff48",
    id: "new-portfolio",
    number: "04",
    name: "Personal Portfolio",
    role: "Fullstack Web Developer",
    category: "frontend",
    featured: true,
    status: "active",
    summary:
      "A performance-conscious personal portfolio built with Next.js, GSAP, Swiper, Lenis, and data-driven sections to present experience, projects, resume access, and contact information through smooth responsive interactions.",
    contributions: [],
    impactStats: [],
    impacts: [],
    highlights: [
      "Built scroll-based section transitions and reveals with GSAP ScrollTrigger",
      "Implemented responsive Swiper carousels for experience and project media",
      "Optimized mobile behavior by reducing heavy scroll effects and layout shifts",
      "Audited performance with Lighthouse across desktop and mobile production builds",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "GSAP",
      "Motion",
      "Swiper",
      "Lenis",
    ],
    images: [
      {
        id: "981029ca-76fa-4dfe-9b2c-0e65a881a342",
        src: "/images/projects/portfolio/hero.webp",
        alt: "Personal portfolio hero section with animated introduction",
        label: "Hero Experience",
        description:
          "Animated hero layout with social links, resume CTA, profile visual, and responsive typography.",
        isCover: true,
      },
      {
        id: "b34e2f6d-bac6-4b35-9de3-279413aa3aa2",
        src: "/images/projects/portfolio/experiences.webp",
        alt: "Personal portfolio experience carousel section",
        label: "Experience Carousel",
        description:
          "Responsive experience cards using GSAP on desktop and Swiper interaction on mobile/tablet.",
        isCover: false,
      },
      {
        id: "145e9249-de89-4c92-9a33-f68a77a10e16",
        src: "/images/projects/portfolio/showcase.webp",
        alt: "Personal portfolio projects carousel section",
        label: "Project Showcase",
        description:
          "Data-driven project cards with multi-image Swiper media, slide controls, and performance-aware loading.",
        isCover: false,
      },
    ],
    link: null,
    updatedAt: "2026-08-13T13:55:30.778Z",
  },
];
