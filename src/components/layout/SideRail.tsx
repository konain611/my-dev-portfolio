"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { usePathname } from "next/navigation";
import { sectionCounter, sectionIds, sectionLabel } from "@/data/nav";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { useActiveSection } from "@/lib/hooks/useActiveSection";

export function SideRail() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(sectionIds);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    mass: 0.4,
  });

  return (
    <aside
      aria-label={ui.header.descriptor}
      className="fixed bottom-0 left-0 top-16 z-40 hidden w-rail flex-col items-center justify-between border-r border-line bg-base py-6 lg:flex"
    >
      <span className="vertical-text mono-label whitespace-nowrap text-muted">
        {profile.displayName.toUpperCase()} / {ui.header.descriptor}
      </span>

      <div className="relative my-6 w-px flex-1 bg-line">
        <motion.div
          className="absolute inset-x-0 top-0 h-full origin-top bg-signal"
          style={{ scaleY: progress }}
        />
        <span className="absolute -left-0.5 top-0 size-1.25 bg-signal" />
        <span className="absolute -left-0.5 bottom-0 size-1.25 bg-line" />
      </div>

      <div className="flex flex-col items-center gap-1">
        {/* <span className="mono-label text-ink">
          {onHome ? sectionCounter(active) : "CF"}
        </span> */}
        <span className="mono-label vertical-text mt-2 text-muted">
          {onHome
            ? sectionLabel(active).toUpperCase()
            : ui.caseStudy.caseFile}
        </span>
      </div>
    </aside>
  );
}
