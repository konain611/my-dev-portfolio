"use client";

import { motion } from "motion/react";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { useReducedMotionSafe } from "@/lib/hooks/useReducedMotionSafe";
import { cn } from "@/lib/utils";

interface HeroSchematicProps {
  className?: string;
}

const lines = [
  "M70 70H450V450H70Z",
  "M70 260H450",
  "M260 70V450",
  "M70 450 450 70",
  "M150 150H370V370H150Z",
  "M70 70 150 150",
  "M450 70 370 150",
  "M70 450 150 370",
  "M450 450 370 370",
];

export function HeroSchematic({ className }: HeroSchematicProps) {
  const reducedMotion = useReducedMotionSafe();

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 520 520"
      className={cn("pointer-events-none select-none", className)}
      fill="none"
    >
      <g stroke="var(--line)" strokeWidth="1" opacity="0.55">
        {[100, 160, 200, 320, 360, 420].map((value) => (
          <path key={`v-${value}`} d={`M${value} 0V520`} strokeDasharray="1 7" />
        ))}
        {[100, 160, 200, 320, 360, 420].map((value) => (
          <path key={`h-${value}`} d={`M0 ${value}H520`} strokeDasharray="1 7" />
        ))}
      </g>

      {lines.map((d, index) => (
        <motion.path
          key={d}
          d={d}
          stroke={index === 3 ? "var(--signal)" : "var(--line)"}
          strokeWidth="1"
          initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: index === 3 ? 0.65 : 1 }}
          transition={{
            duration: 1.5,
            delay: 0.15 + index * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        />
      ))}

      <motion.g
        initial={reducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <rect x="246" y="246" width="28" height="28" stroke="var(--signal)" />
        <path d="M260 230V246M260 274V290M230 260H246M274 260H290" stroke="var(--signal)" />
        <rect x="72" y="438" width="48" height="4" fill="var(--signal)" />
      </motion.g>

      <g
        fontFamily="var(--font-mono)"
        fontSize="8"
        letterSpacing="1.4"
        fill="var(--muted)"
      >
        <text x="70" y="56">
          {ui.hero.schematic.title}
        </text>
        <text x="450" y="56" textAnchor="end">
          {ui.hero.schematic.scale}
        </text>
        <text x="70" y="478">
          {ui.hero.schematic.coordinate}
        </text>
        <text x="450" y="478" textAnchor="end">
          {ui.hero.schematic.section}
        </text>
      </g>

      <g
        fontFamily="var(--font-mono)"
        fontSize="7"
        letterSpacing="1.2"
        fill="var(--signal)"
      >
        <text x="266" y="292">
          KHI
        </text>
        <text x="366" y="366" textAnchor="end">
          {`${profile.location.coordinates.lat} N`}
        </text>
      </g>
    </svg>
  );
}
