"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { projects } from "@/data/projects";
import { sectionNumber, totalSections } from "@/data/nav";
import { ui } from "@/data/ui";
import { POINTER_FINE_QUERY } from "@/lib/constants";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { EASE } from "@/lib/motion";
import type { Project } from "@/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LedgerRow } from "@/components/ui/LedgerRow";
import { ProjectPlate } from "@/components/ui/ProjectPlate";

const number = sectionNumber("work");
const total = String(totalSections).padStart(2, "0");

export function Work() {
  const finePointer = useMediaQuery(POINTER_FINE_QUERY);
  const [active, setActive] = useState<Project | null>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 320, damping: 32, mass: 0.35 });
  const y = useSpring(rawY, { stiffness: 320, damping: 32, mass: 0.35 });

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!finePointer) return;
    const paddingX = 190;
    const paddingY = 140;
    rawX.set(
      Math.min(
        Math.max(event.clientX, paddingX),
        window.innerWidth - paddingX,
      ),
    );
    rawY.set(
      Math.min(
        Math.max(event.clientY, paddingY),
        window.innerHeight - paddingY,
      ),
    );
  };

  return (
    <section
      id="work"
      className="relative scroll-mt-16 py-20 md:py-28"
      aria-labelledby="work-heading"
      onPointerMove={onPointerMove}
      onPointerLeave={() => setActive(null)}
    >
      <div className="sheet">
        <SectionHeading
          id="work-heading"
          number={number}
          total={total}
          {...ui.sections.work}
        />

        <div className="mt-12 grid grid-cols-12 gap-x-4 border-b border-line pb-3 md:mt-16">
          <span className="mono-label col-span-1 hidden text-muted md:block">
            {ui.work.columns.index}
          </span>
          <span className="mono-label col-span-4 hidden text-muted md:block">
            {ui.work.columns.project}
          </span>
          <span className="mono-label col-span-3 hidden text-muted md:col-start-6 md:block">
            {ui.work.columns.outcome}
          </span>
          <span className="mono-label col-span-3 hidden text-muted md:col-start-9 md:block">
            {ui.work.columns.stack}
          </span>
          <span className="mono-label col-span-1 hidden text-right text-muted md:col-start-12 md:block">
            {ui.work.columns.year}
          </span>
        </div>

        <div className="border-t border-line">
          {projects.map((project) => (
            <LedgerRow
              key={project.slug}
              project={project}
              active={active?.slug === project.slug}
              onActivate={setActive}
              onDeactivate={(deactivatedProject) => {
                setActive((current) =>
                  current?.slug === deactivatedProject.slug ? null : current,
                );
              }}
            />
          ))}
        </div>
      </div>

      {finePointer ? (
        <AnimatePresence>
          {active ? (
            <motion.div
              key={active.slug}
              aria-hidden="true"
              className="pointer-events-none fixed left-0 top-0 z-80 hidden lg:block"
              style={{ x, y }}
            >
              <motion.div
                className="w-85 -translate-x-1/2 -translate-y-1/2 border border-line bg-base p-2"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                exit={{ clipPath: "inset(0 0 100% 0)" }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <ProjectPlate project={active} />
                <div className="flex items-center justify-between px-1 pb-1 pt-3">
                  <span className="mono-label text-signal">
                    {ui.work.previewLabel}
                  </span>
                  <span className="mono-label text-muted">
                    {active.index} / {String(projects.length).padStart(2, "0")}
                  </span>
                </div>
                <p className="mono-label flex min-w-0 items-center gap-2 border-t border-line px-1 pt-2 text-muted">
                  <span className="shrink-0 text-signal">
                    {ui.work.directLinkLabel}
                  </span>
                  <span className="truncate" title={active.url}>
                    {active.url}
                  </span>
                </p>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : null}
    </section>
  );
}
