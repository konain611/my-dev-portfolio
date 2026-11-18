"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { NAV_OFFSET } from "@/lib/constants";
import { useReducedMotionSafe } from "./useReducedMotionSafe";

export function useLenis(): void {
  const reducedMotion = useReducedMotionSafe();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };
    frame = window.requestAnimationFrame(raf);

    const onAnchorClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const section = document.getElementById(hash.slice(1));
      if (!section) return;
      event.preventDefault();
      lenis.scrollTo(section, { offset: -NAV_OFFSET, duration: 1.15 });
      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reducedMotion]);
}
