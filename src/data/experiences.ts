export interface ExperienceItem {
  databaseId: string;
  id: string;
  role: string;
  company: string;
  type: string;
  period: string;
  duration: string;
  summary: string;
  highlights: string[];
  image: string;
  imageAlt: string;
  monogram: string;
  status: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  updatedAt: string;
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    databaseId: "eb70a697-3209-49d5-9e1c-448a8695a47b",
    id: "komatsu-remanufacturing-asia",
    role: "Fullstack Web Developer",
    company: "PT. Komatsu Remanufacturing Asia",
    type: "Work",
    period: "Aug 2025 — Jun 2026",
    duration: "10 months",
    summary:
      "Built an internal Learning Management System that centralizes employee training—from planning and approvals to scheduling, surveys, certification, and reporting.",
    highlights: [
      "Requirements to delivery",
      "Workflow & data design",
      "Weekly stakeholder reviews",
      "Testing & iteration",
    ],
    image: "/images/experiences/komatsu.webp",
    imageAlt:
      "Development team outside the company office",
    monogram: "KRA",
    status: "active",
    startDate: "2025-08-01T00:00:00.000Z",
    endDate: "2026-06-01T00:00:00.000Z",
    isCurrent: false,
    updatedAt: "2026-08-13T13:55:22.939Z",
  },
  {
    databaseId: "f080900c-c1cc-4a74-afb8-c2bea99e7de7",
    id: "institut-teknologi-kalimantan",
    role: "Backend Developer",
    company: "Institut Teknologi Kalimantan",
    type: "Intern",
    period: "Feb 2025 — Jun 2025",
    duration: "5 months",
    summary:
      "Supported the development of internal system modules by building RESTful APIs, designing relational database logic, and documenting endpoints for team use.",
    highlights: [
      "RESTful API development",
      "Relational database design",
      "Postman API documentation",
      "Bug fixing & refactoring",
    ],
    image: "/images/experiences/itk.webp",
    imageAlt:
      "Backend Developer internship at Institut Teknologi Kalimantan",
    monogram: "ITK",
    status: "active",
    startDate: "2025-02-01T00:00:00.000Z",
    endDate: "2025-06-01T00:00:00.000Z",
    isCurrent: false,
    updatedAt: "2026-08-13T13:55:23.470Z",
  },
  {
    databaseId: "a52c96a8-2da8-4eb8-824c-9f69ce8382c7",
    id: "binar-academy",
    role: "Frontend Developer",
    company: "Binar Academy",
    type: "Work",
    period: "Aug 2024 — Dec 2024",
    duration: "5 months",
    summary:
      "Participated in an intensive program focused on modern frontend workflows, building responsive user interfaces, and collaborating on team projects with real deadlines.",
    highlights: [
      "Responsive web design",
      "API consumption & state handling",
      "Component-driven architecture",
      "Cross-functional collaboration",
    ],
    image: "/images/experiences/binar.webp",
    imageAlt: "Binar Academy Kampus Merdeka program",
    monogram: "BA",
    status: "active",
    startDate: "2024-09-01T00:00:00.000Z",
    endDate: "2024-12-01T00:00:00.000Z",
    isCurrent: false,
    updatedAt: "2026-08-13T13:55:24.001Z",
  },
];
