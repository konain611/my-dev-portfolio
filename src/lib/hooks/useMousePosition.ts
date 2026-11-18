"use client";

import { useEffect } from "react";
import { useMotionValue, type MotionValue } from "motion/react";

interface MousePosition {
  x: MotionValue<number>;
  y: MotionValue<number>;
}

export function useMousePosition(): MousePosition {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, [x, y]);

  return { x, y };
}
