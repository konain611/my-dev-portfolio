"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { cn } from "@/lib/utils";
import { POINTER_FINE_QUERY } from "@/lib/constants";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useReducedMotionSafe } from "@/lib/hooks/useReducedMotionSafe";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function Magnetic({
  children,
  className,
  strength = 0.18,
}: MagneticProps) {
  const finePointer = useMediaQuery(POINTER_FINE_QUERY);
  const reducedMotion = useReducedMotionSafe();
  const containerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 220, damping: 22, mass: 0.25 });
  const y = useSpring(rawY, { stiffness: 220, damping: 22, mass: 0.25 });
  const enabled = finePointer && !reducedMotion;

  return (
    <motion.div
      ref={containerRef}
      className={cn("inline-block", className)}
      style={{ x, y }}
      onPointerMove={(event) => {
        if (!enabled) return;
        const node = containerRef.current;
        if (!node) return;
        const rect = node.getBoundingClientRect();
        const offsetX = event.clientX - (rect.left + rect.width / 2);
        const offsetY = event.clientY - (rect.top + rect.height / 2);
        rawX.set(offsetX * strength);
        rawY.set(offsetY * strength);
      }}
      onPointerLeave={() => {
        rawX.set(0);
        rawY.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
