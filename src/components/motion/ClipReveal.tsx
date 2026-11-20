"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE, VIEWPORT } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/hooks/useReducedMotionSafe";

type Direction = "left" | "right" | "top" | "bottom";

const clipStart: Record<Direction, string> = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  top: "inset(0 0 100% 0)",
  bottom: "inset(100% 0 0 0)",
};

interface ClipRevealProps {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function ClipReveal({
  children,
  className,
  direction = "left",
  delay = 0,
  duration = 0.9,
  once = true,
}: ClipRevealProps) {
  const reducedMotion = useReducedMotionSafe();

  return (
    <motion.div
      className={cn(className)}
      initial={
        reducedMotion ? false : { clipPath: clipStart[direction], opacity: 1 }
      }
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ ...VIEWPORT, once }}
      transition={{ duration, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
