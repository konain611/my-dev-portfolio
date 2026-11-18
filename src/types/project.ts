export interface ArchitectureStage {
  label: string;
  detail: string;
  tech: string;
}

export interface ProjectArchitecture {
  title: string;
  note: string;
  stages: ArchitectureStage[];
}

export interface ProjectOutcome {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  url: string;
  index: string;
  name: string;
  year: string;
  client: string;
  role: string;
  category: string;
  summary: string;
  outcome: string;
  stack: string[];
  status: string;
  problem: string;
  approach: string[];
  architecture: ProjectArchitecture;
  outcomes: ProjectOutcome[];
  motif: "grid" | "stack" | "orbit" | "flow";
}

export interface ProjectRoute {
  slug: string;
}
