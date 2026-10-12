export interface SocialLinks {
  github: string;
  linkedin: string;
  instagram: string;
  email: string;
}

export interface ProfileConfig {
  name: string;
  shortName: string;
  monogram: string;
  brandTitle: string;
  roles: string[];
  location: string;
  timezone: {
    city: string;
    ianaZone: string;
    label: string;
  };
  narrative: {
    lines: Array<{ normal: string; bold: string }>;
  };
  skills: string[];
  availability: {
    status: string;
    handle: string;
    isAvailable: boolean;
  };
  avatar: {
    src: string;
    alt: string;
  };
  resumeUrl: string;
  socials: SocialLinks;
  githubStats: {
    username: string;
    contributionsCount: number;
    longestStreakDays: number;
    activeDays: number;
  };
  seo: {
    title: string;
    description: string;
    siteName: string;
  };
}

export const PROFILE: ProfileConfig = {
  name: "Rio Firman Raharja",
  shortName: "Rio",
  monogram: "R",
  brandTitle: "Rio / Portfolio",
  roles: [
    "Machine Learning & Applied AI Engineer",
    "iOS Developer · Swift",
    "Backend Engineer",
    "Full-Stack Engineer",
  ],
  location: "Indonesia · WIB",
  timezone: {
    city: "Indonesia",
    ianaZone: "Asia/Jakarta",
    label: "WIB",
  },
  narrative: {
    lines: [
      { normal: "I build intelligent software systems at the ", bold: "intersection of AI, machine learning, " },
      { normal: "and product engineering. My primary focus is ", bold: "AI that solves real problems, " },
      { normal: "backed by ", bold: "reliable software systems. " },
      { normal: "I also build ", bold: "native iOS apps in Swift, " },
      { normal: "bringing the same care to ", bold: "mobile experiences and everyday workflows." },
    ],
  },
  skills: [
    "Python",
    "PyTorch",
    "LangChain",
    "Swift",
    "SwiftUI",
    "UIKit",
    "Flutter",
    "Go",
    "TypeScript",
    "Next.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "Qdrant",
    "Docker",
    "Tailwind CSS",
  ],
  availability: {
    status: "available for work!",
    handle: "@rio",
    isAvailable: true,
  },
  avatar: {
    src: "/images/avatar/profile.png",
    alt: "Portrait of Rio Firman Raharja",
  },
  resumeUrl: "https://drive.google.com/file/d/1eOImNhn3X_4PeXY8WZlqrZ_OIiISacZJ/view?usp=sharing",
  socials: {
    github: "https://github.com/rfirmn",
    linkedin: "https://www.linkedin.com/in/rio-firman/",
    instagram: "https://www.instagram.com/riofrmnr/",
    email: "firmanrio59@gmail.com",
  },
  githubStats: {
    username: "rfirmn",
    contributionsCount: 321,
    longestStreakDays: 3,
    activeDays: 66,
  },
  seo: {
    title: "Rio Firman Raharja | Applied AI & iOS Engineer",
    description:
      "Rio Firman Raharja focuses on applied AI and builds native Swift iOS apps. Explore Strata PDA, Streamly, Market Intelligence, SwiftUI and UIKit projects, and Flutter apps for Android and iOS.",
    siteName: "Rio Portfolio",
  },
};
