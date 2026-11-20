"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { education, experience, training } from "@/data/experience";
import { sectionNumber, totalSections } from "@/data/nav";
import { ui } from "@/data/ui";
import { EASE, VIEWPORT } from "@/lib/motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Label } from "@/components/ui/Label";

const number = sectionNumber("experience");
const total = String(totalSections).padStart(2, "0");

function parsePeriodDate(value: string) {
  const match = /^(\d{4})(?:\.(\d{2}))?$/.exec(value);
  if (!match) {
    throw new Error(`Invalid experience date: ${value}`);
  }

  const year = Number(match[1]);
  const month = match[2] === undefined ? undefined : Number(match[2]);
  if (month !== undefined && (month < 1 || month > 12)) {
    throw new Error(`Invalid experience month: ${value}`);
  }

  return { year, month };
}

function formatDuration(
  start: string,
  end: string,
  currentMonthIndex: number | null,
): string | null {
  const startDate = parsePeriodDate(start);
  const endDate = end === "PRESENT" ? null : parsePeriodDate(end);

  if (
    endDate !== null &&
    startDate.month === undefined &&
    endDate.month === undefined
  ) {
    const years = endDate.year - startDate.year;
    if (years < 0) {
      throw new Error(
        `Experience end date precedes start date: ${start} — ${end}`,
      );
    }
    const durationYears = Math.max(1, years);
    return `${durationYears} yr${durationYears === 1 ? "" : "s"}`;
  }

  const startMonthIndex =
    startDate.year * 12 + (startDate.month ?? 1) - 1;
  let endMonthIndex: number;

  if (endDate === null) {
    if (currentMonthIndex === null) return null;
    endMonthIndex = currentMonthIndex;
  } else {
    const endMonth =
      endDate.month ?? (startDate.month === undefined ? 1 : 12);
    endMonthIndex = endDate.year * 12 + endMonth - 1;
  }

  const totalMonths = endMonthIndex - startMonthIndex + 1;

  if (totalMonths < 1) {
    throw new Error(
      `Experience end date precedes start date: ${start} — ${end}`,
    );
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];

  if (years > 0) parts.push(`${years} yr${years === 1 ? "" : "s"}`);
  if (months > 0) parts.push(`${months} mo${months === 1 ? "" : "s"}`);

  return parts.join(" ");
}

export function Experience() {
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number | null>(
    null,
  );
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 78%", "end 68%"],
  });
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });

  useEffect(() => {
    const now = new Date();
    setCurrentMonthIndex(now.getUTCFullYear() * 12 + now.getUTCMonth());
  }, []);

  return (
    <section
      id="experience"
      className="relative scroll-mt-16 py-20 md:py-28"
      aria-labelledby="experience-heading"
    >
      <div className="sheet">
        <SectionHeading
          id="experience-heading"
          number={number}
          total={total}
          {...ui.sections.experience}
        />

        <div ref={timelineRef} className="relative mt-14 md:mt-20">
          <svg
            aria-hidden="true"
            className="absolute bottom-0 left-0 top-0 h-full w-px overflow-visible"
            viewBox="0 0 1 1000"
            preserveAspectRatio="none"
          >
            <path
              d="M0.5 0V1000"
              stroke="var(--line)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              d="M0.5 0V1000"
              stroke="var(--signal)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              style={{ pathLength }}
            />
          </svg>

          {experience.map((entry, index) => (
            <motion.article
              key={entry.id}
              className="relative border-b border-line pb-10 pl-7 last:border-b-0 last:pb-0 md:pb-14 md:pl-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={VIEWPORT}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.04 }}
            >
              <span
                aria-hidden="true"
                className="absolute left-[-3.5px] top-1 size-1.75 border border-signal bg-base"
              />
              <div className="grid grid-cols-12 gap-x-4 gap-y-5">
                <div className="col-span-12 md:col-span-3 py-2">
                  <p className="mono-label text-ink">{entry.period}</p>
                  <p className="mono-label mt-2 text-muted">{entry.mode}</p>
                  <p className="mono-label mt-2 text-muted">
                    {formatDuration(entry.start, entry.end, currentMonthIndex)}
                  </p>
                  {entry.current ? (
                    <p className="mono-label mt-3 flex items-center gap-2 text-signal">
                      <span className="status-dot" aria-hidden="true" />
                      {ui.experience.currentLabel}
                    </p>
                  ) : null}
                </div>

                <div className="col-span-12 md:col-span-9">
                  <h3 className="font-display text-3xl py-1 leading-[1.02] tracking-[-0.02em] text-ink md:text-4xl">
                    {entry.role}
                  </h3>
                  <p className="mono-label mt-2 text-signal">
                    {entry.organisation} / {entry.location}
                  </p>
                  <p className="mt-4 max-w-xl text-[0.8125rem] leading-relaxed text-muted">
                    {entry.summary}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex max-w-xl gap-3 text-xs leading-relaxed text-ink/80"
                      >
                        <span aria-hidden="true" className="text-signal">
                          +
                        </span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-8 md:mt-24">
          <div className="col-span-12 md:col-span-3">
            <Label>{ui.experience.educationLabel}</Label>
          </div>
          <div className="col-span-12 md:col-span-9">
            <article className=" border-l-2 border-l-line hover:border-l-signal p-6 md:p-8">
              <p className="mono-label text-signal">{education.period}</p>
              <h3 className="mt-4 max-w-2xl font-display text-3xl leading-tight tracking-[-0.02em] text-ink md:text-4xl">
                {education.qualification}
              </h3>
              <p className="mono-label mt-4 text-muted">
                {education.institution} / {education.location}
              </p>
            </article>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-8 md:mt-24">
          <div className="col-span-12 md:col-span-3">
            <Label>{ui.experience.trainingLabel}</Label>
          </div>
          <div className="col-span-12 md:col-span-9">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {training.map((item) => (
                <div key={item.id} className="border-l-2 px-2 border-line p-2 hover:border-signal">
                  <p className="mono-label text-muted">{item.period}</p>
                  <p className="py-2 text-md leading-snug text-ink">
                    {item.programme}
                  </p>
                  <p className="mono-label mt-3 flex items-center justify-between gap-2 text-muted">
                    <span>{item.provider}</span>
                    <span
                      className={
                        item.state === "IN PROGRESS" ? "text-signal" : "text-muted"
                      }
                    >
                      {item.state}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
