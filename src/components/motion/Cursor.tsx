"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { POINTER_FINE_QUERY } from "@/lib/constants";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { useMousePosition } from "@/lib/hooks/useMousePosition";
import { useReducedMotionSafe } from "@/lib/hooks/useReducedMotionSafe";

export function Cursor() {
  const finePointer = useMediaQuery(POINTER_FINE_QUERY);
  const reducedMotion = useReducedMotionSafe();
  const { x, y } = useMousePosition();
  const [visible, setVisible] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  const stiffness = reducedMotion ? 1600 : 900;
  const springX = useSpring(x, { stiffness, damping: 70, mass: 0.28 });
  const springY = useSpring(y, { stiffness, damping: 70, mass: 0.28 });
  const readout = useTransform<number, string>(
    [springX, springY],
    ([latestX, latestY]) =>
      `X ${String(Math.round(latestX)).padStart(4, "0")} / Y ${String(
        Math.round(latestY),
      ).padStart(4, "0")}`,
  );

  useEffect(() => {
    if (!finePointer) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const onMove = () => setVisible(true);
    const onOver = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        setLabel(null);
        return;
      }
      const interactive = target.closest<HTMLElement>("[data-cursor]");
      const nextLabel = interactive?.dataset.cursor?.toUpperCase() ?? null;
      setLabel(nextLabel);
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [finePointer]);

  if (!finePointer) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200] hidden lg:block"
      style={{
        x: springX,
        y: springY,
        opacity: visible ? 1 : 0,
      }}
    >
      <div className="relative">
        <span className="absolute left-0 top-0 h-[15px] w-px -translate-x-1/2 -translate-y-1/2 bg-signal" />
        <span className="absolute left-0 top-0 h-px w-[15px] -translate-x-1/2 -translate-y-1/2 bg-signal" />
        <span className="absolute left-0 top-0 size-[3px] -translate-x-1/2 -translate-y-1/2 bg-signal" />
        <motion.span
          className="mono-label absolute left-3 top-3 whitespace-nowrap text-muted"
          animate={{ opacity: label ? 0 : 1 }}
          transition={{ duration: 0.15 }}
        >
          {readout}
        </motion.span>
        <motion.span
          className="mono-label absolute left-3 top-3 flex h-6 items-center whitespace-nowrap bg-signal px-2 text-paper"
          initial={false}
          animate={{
            opacity: label ? 1 : 0,
            clipPath: label ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          {label ?? ""}
        </motion.span>
      </div>
    </motion.div>
  );
}
