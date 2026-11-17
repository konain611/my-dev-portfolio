"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ui } from "@/data/ui";
import { EASE } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/hooks/useReducedMotionSafe";

export function PageTransition() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotionSafe();
  const previousPath = useRef(pathname);
  const [wiping, setWiping] = useState(false);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    if (reducedMotion) return;

    const frame = window.requestAnimationFrame(() => setWiping(true));
    const timeout = window.setTimeout(() => setWiping(false), 760);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [pathname, reducedMotion]);

  return (
    <AnimatePresence>
      {wiping ? (
        <motion.div
          key={pathname}
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-120 bg-base"
          initial={{ x: "-101%" }}
          animate={{ x: "0%" }}
          exit={{ x: "101%" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <span className="absolute right-0 top-0 h-full w-2 bg-signal" />
          <span className="mono-label absolute bottom-6 left-6 text-muted">
            {ui.meta.transitionLabel}
          </span>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
