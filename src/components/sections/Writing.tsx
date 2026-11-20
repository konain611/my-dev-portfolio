import Link from "next/link";
import { writing } from "@/data/writing";
import { sectionNumber, totalSections } from "@/data/nav";
import { ui } from "@/data/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Label } from "@/components/ui/Label";

export function Writing() {
  if (writing.length === 0) return null;

  const number = sectionNumber("writing");
  const total = String(totalSections).padStart(2, "0");

  return (
    <section
      id="writing"
      className="relative scroll-mt-16 py-20 md:py-28"
      aria-labelledby="writing-heading"
    >
      <div className="sheet">
        <SectionHeading
          id="writing-heading"
          number={number}
          total={total}
          {...ui.sections.writing}
        />

        <ul className="mt-12 border-t border-line md:mt-16">
          {writing.map((entry) => {
            const external = entry.href.startsWith("http");
            const content = (
              <>
                <span className="mono-label col-span-3 text-muted md:col-span-2">
                  {entry.date}
                </span>
                <span className="col-span-9 md:col-span-7">
                  <span className="block font-display text-2xl leading-tight tracking-[-0.02em] text-ink transition-colors group-hover:text-signal md:text-3xl">
                    {entry.title}
                  </span>
                  <span className="mt-2 block max-w-xl text-xs leading-relaxed text-muted">
                    {entry.summary}
                  </span>
                </span>
                <span className="mono-label col-span-12 flex items-center justify-between text-muted md:col-span-3">
                  <span>{entry.readingTime}</span>
                  <span className="transition-transform group-hover:translate-x-1 group-hover:text-signal">
                    {ui.writing.readLabel} ↗
                  </span>
                </span>
              </>
            );

            return (
              <li key={entry.slug} className="border-b border-line">
                {external ? (
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    data-cursor={ui.cursor.open}
                    className="group grid grid-cols-12 gap-x-4 gap-y-3 py-6"
                  >
                    {content}
                  </a>
                ) : (
                  <Link
                    href={entry.href}
                    data-cursor={ui.cursor.view}
                    className="group grid grid-cols-12 gap-x-4 gap-y-3 py-6"
                  >
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <Label className="mt-6">{ui.sections.writing.eyebrow}</Label>
      </div>
    </section>
  );
}
