import type { ProjectArchitecture } from "@/types";
import { ui } from "@/data/ui";
import { Label } from "./Label";
import { CrosshairMark } from "./CrosshairMark";

interface ArchitectureDiagramProps {
  architecture: ProjectArchitecture;
  index: string;
}

export function ArchitectureDiagram({
  architecture,
  index,
}: ArchitectureDiagramProps) {
  return (
    <figure>
      <div className="border border-line bg-surface">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
          <Label accent>{`FIG. ${index} / ${architecture.title}`}</Label>
          <CrosshairMark size={12} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4">
          {architecture.stages.map((stage, stageIndex) => (
            <div
              key={stage.label}
              className="relative border-b border-line p-5 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="mono-label text-signal">
                  {String(stageIndex + 1).padStart(2, "0")}
                </span>
                <span className="mono-label text-line">
                  {String(stageIndex + 1).padStart(2, "0")} /{" "}
                  {String(architecture.stages.length).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-8 text-sm font-medium tracking-[-0.01em] text-ink">
                {stage.label}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {stage.detail}
              </p>
              <p className="mono-label mt-6 text-ink/80">{stage.tech}</p>
              <span
                aria-hidden="true"
                className="absolute -right-1 top-1/2 hidden size-2 -translate-y-1/2 border border-line bg-base md:block"
              />
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 border-t border-line px-4 py-3">
          <span className="status-dot" aria-hidden="true" />
          <p className="text-xs leading-relaxed text-muted">
            {architecture.note}
          </p>
        </div>
      </div>
      <figcaption className="mono-label mt-3 text-muted/70">
        {ui.caseStudy.architectureNote}
      </figcaption>
    </figure>
  );
}
