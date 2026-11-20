"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE, VIEWPORT } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/hooks/useReducedMotionSafe";

interface DrawLineProps {
  className?: string;
  orientation?: "horizontal" | "vertical";
  accent?: boolean;
  delay?: number;
  duration?: number;
}

export function DrawLine({
  className,
  orientation = "horizontal",
  accent = false,
  delay = 0,
  duration = 0.9,
}: DrawLineProps) {
  const reducedMotion = useReducedMotionSafe();
  const horizontal = orientation === "horizontal";

  return (
    <motion.span
      aria-hidden="true"
      className={cn(
        "block origin-left",
        horizontal ? "h-px w-full" : "h-full w-px origin-top",
        accent ? "bg-signal" : "bg-line",
        className,
      )}
      initial={reducedMotion ? false : { scaleX: horizontal ? 0 : 1, scaleY: horizontal ? 1 : 0 }}
      whileInView={{
        scaleX: 1,
        scaleY: 1,
      }}
      viewport={VIEWPORT}
      transition={{ duration, ease: EASE, delay }}
    />
  );
}
