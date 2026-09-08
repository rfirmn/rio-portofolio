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
    siteUrl: string;
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
      { normal: "and modern engineering, ", bold: "turning ideas and experiments " },
      { normal: "into ", bold: "reliable, scalable solutions " },
      { normal: "that connect intelligent technologies with ", bold: "real-world applications " },
      { normal: "built to be ", bold: "thoughtful, scalable, and impactful." },
    ],
  },
  skills: [
    "Python",
    "PyTorch",
    "LangChain",
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
    title: "Rio Firman Raharja | Machine Learning & Full-Stack Engineer",
    description:
      "Explore Rio Firman Raharja's portfolio: Machine Learning & Applied AI Engineer, Backend Engineer, and Full-Stack Developer building intelligent, scalable systems.",
    siteUrl: "https://github.com/rfirmn",
    siteName: "Rio Portfolio",
  },
};
