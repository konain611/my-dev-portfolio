"use client";

import Link from "next/link";
import type { Project } from "@/types";
import { ui } from "@/data/ui";
import { cn } from "@/lib/utils";
import { Tag } from "./Tag";

interface LedgerRowProps {
  project: Project;
  active: boolean;
  onActivate: (project: Project) => void;
}

export function LedgerRow({ project, active, onActivate }: LedgerRowProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor={ui.cursor.view}
      onMouseEnter={() => onActivate(project)}
      onFocus={() => onActivate(project)}
      className={cn(
        "ledger-row group relative -mx-3 block border-b border-line px-3 py-6 md:py-8",
        "hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper",
        active && "bg-ink text-paper",
      )}
      aria-label={`${project.name} — ${project.category}, ${project.year}`}
    >
      <div className="grid grid-cols-12 items-start gap-x-4 gap-y-3">
        <div className="col-span-9 md:col-span-4 md:col-start-2 md:row-start-1">
          <span className="mono-label mb-2 flex items-center gap-2 md:hidden">
            <span className="text-signal">{project.index}</span>
            <span aria-hidden="true" className="h-px w-6 bg-line" />
            <span className="text-muted group-hover:text-paper/60">
              {project.year}
            </span>
          </span>
          <h3 className="font-display text-[clamp(1.9rem,4.1vw,3.5rem)] leading-[0.88] tracking-[-0.03em] transition-colors">
            {project.name}
          </h3>
          <p className="mono-label mt-2 text-muted transition-colors group-hover:text-paper/60">
            {project.category}
          </p>
        </div>

        <span className="mono-label col-span-1 hidden text-signal md:col-start-1 md:row-start-1 md:block">
          {project.index}
        </span>

        <span className="mono-label col-span-3 text-right text-muted transition-colors group-hover:text-paper/70 md:hidden">
          {project.year}
        </span>

        <p className="col-span-12 max-w-md text-xs leading-relaxed text-muted transition-colors group-hover:text-paper/75 md:col-span-3 md:col-start-6 md:row-start-1">
          {project.outcome}
        </p>

        <div className="col-span-12 flex flex-wrap gap-1.5 md:col-span-3 md:col-start-9 md:row-start-1">
          {project.stack.slice(0, 4).map((item) => (
            <Tag key={item}>{item}</Tag>
          ))}
        </div>

        <div className="col-span-12 hidden items-start justify-between md:col-span-1 md:col-start-12 md:row-start-1 md:flex md:flex-col md:items-end">
          <span className="mono-label text-muted transition-colors group-hover:text-paper/70">
            {project.year}
          </span>
          <span
            aria-hidden="true"
            className="mt-4 text-lg text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-signal"
          >
            ↗
          </span>
        </div>
      </div>
    </Link>
  );
}
