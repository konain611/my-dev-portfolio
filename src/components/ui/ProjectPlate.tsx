import type { Project } from "@/types";
import { ui } from "@/data/ui";
import { cn } from "@/lib/utils";

interface ProjectPlateProps {
  project: Project;
  variant?: "preview" | "hero" | "thumb";
  className?: string;
}

function GridMotif() {
  return (
    <g stroke="var(--line)" strokeWidth="1" fill="none">
      <rect x="84" y="96" width="126" height="196" />
      <rect x="232" y="72" width="172" height="220" />
      <rect x="426" y="112" width="110" height="164" />
      <path d="M84 292H536M84 96V292M536 96V292" strokeDasharray="2 5" />
      <path d="M60 326H420" stroke="var(--muted)" />
      <path d="M60 320V332M420 320V332" stroke="var(--muted)" />
      <path d="M232 72 314 32 426 112M314 32V292" stroke="var(--signal)" />
    </g>
  );
}

function StackMotif() {
  return (
    <g fill="none" strokeWidth="1">
      {[0, 1, 2, 3].map((row) => (
        <g key={row} stroke="var(--line)">
          <rect
            x={106 + row * 18}
            y={88 + row * 46}
            width={344 - row * 26}
            height="32"
          />
          <path d={`M${106 + row * 18} ${104 + row * 46}H${450 - row * 8}`} />
        </g>
      ))}
      <rect x="106" y="88" width="8" height="170" fill="var(--signal)" stroke="none" />
      <path
        d="M474 88V258M466 96 474 88 482 96M466 250 474 258 482 250"
        stroke="var(--muted)"
      />
    </g>
  );
}

function OrbitMotif() {
  return (
    <g fill="none">
      <path
        d="M320 54 566 200 320 346 74 200Z"
        stroke="var(--line)"
        strokeWidth="1"
      />
      <path
        d="M320 118 490 200 320 282 150 200Z"
        stroke="var(--line)"
        strokeWidth="1"
        strokeDasharray="2 5"
      />
      <path
        d="M320 54V346M74 200H566"
        stroke="var(--muted)"
        strokeDasharray="2 6"
      />
      <rect x="294" y="174" width="52" height="52" stroke="var(--signal)" />
      <path d="M320 54 320 118" stroke="var(--signal)" strokeWidth="2" />
    </g>
  );
}

function FlowMotif() {
  return (
    <g fill="none" strokeWidth="1">
      <path d="M92 200H548" stroke="var(--muted)" strokeDasharray="2 5" />
      {[0, 1, 2, 3].map((node) => (
        <g key={node}>
          <rect
            x={92 + node * 118}
            y={node === 1 || node === 3 ? 128 : 176}
            width="82"
            height="48"
            fill="var(--surface)"
            stroke="var(--line)"
          />
          <rect
            x={92 + node * 118}
            y={node === 1 || node === 3 ? 128 : 176}
            width="5"
            height="48"
            fill={node === 2 ? "var(--signal)" : "var(--line)"}
            stroke="none"
          />
          {node < 3 ? (
            <path
              d={`M${174 + node * 118} ${node === 1 ? 152 : 200}H${210 + node * 118}`}
              stroke="var(--muted)"
            />
          ) : null}
        </g>
      ))}
      <path d="M536 196 548 200 536 204" stroke="var(--muted)" />
    </g>
  );
}

export function ProjectPlate({
  project,
  variant = "preview",
  className,
}: ProjectPlateProps) {
  const gridId = `grid-${project.slug}`;
  const motif =
    project.motif === "stack" ? (
      <StackMotif />
    ) : project.motif === "orbit" ? (
      <OrbitMotif />
    ) : project.motif === "flow" ? (
      <FlowMotif />
    ) : (
      <GridMotif />
    );

  return (
    <figure
      className={cn(
        "relative w-full overflow-hidden border border-line bg-surface",
        variant === "hero" ? "aspect-[16/9]" : "aspect-[16/10]",
        className,
      )}
    >
      <svg
        viewBox="0 0 640 400"
        aria-hidden="true"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id={gridId}
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M20 0H0V20"
              fill="none"
              stroke="var(--line)"
              strokeWidth="0.5"
              opacity="0.55"
            />
          </pattern>
        </defs>

        <rect width="640" height="400" fill={`url(#${gridId})`} />

        {motif}

        <text
          x="618"
          y="330"
          textAnchor="end"
          fill="none"
          stroke="var(--line)"
          strokeWidth="0.8"
          fontFamily="var(--font-display)"
          fontSize="210"
          letterSpacing="-8"
        >
          {project.index}
        </text>

        <g
          fontFamily="var(--font-mono)"
          fontSize="8.5"
          fill="var(--muted)"
          letterSpacing="1.6"
        >
          <text x="24" y="30">
            {ui.hero.figure.replace("01", project.index)}
          </text>
          <text x="616" y="30" textAnchor="end">
            {project.year}
          </text>
          <text x="24" y="378">
            {project.name}
          </text>
          <text x="616" y="378" textAnchor="end">
            {ui.hero.schematic.scale}
          </text>
          <text x="24" y="62" fill="var(--signal)">
            {project.category.toUpperCase()}
          </text>
        </g>

        <path d="M24 350H616" stroke="var(--signal)" strokeWidth="1" />
        <path d="M24 344V356M616 344V356" stroke="var(--signal)" strokeWidth="1" />
      </svg>
    </figure>
  );
}
