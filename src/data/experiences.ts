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

export const EXPERIENCES: ExperienceItem[] = [];
