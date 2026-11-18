export interface ExperienceEntry {
  id: string;
  period: string;
  start: string;
  end: string;
  role: string;
  organisation: string;
  location: string;
  mode: string;
  summary: string;
  highlights: string[];
  current?: boolean;
}

export interface EducationEntry {
  id: string;
  period: string;
  qualification: string;
  institution: string;
  location: string;
}

export interface TrainingEntry {
  id: string;
  period: string;
  programme: string;
  provider: string;
  state: "IN PROGRESS" | "COMPLETE";
}
