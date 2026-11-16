import type { SectionHeadingCopy } from "@/types";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Label } from "./Label";

interface SectionHeadingProps extends SectionHeadingCopy {
  id: string;
  number: string;
  total: string;
  className?: string;
}

export function SectionHeading({
  id,
  number,
  total,
  eyebrow,
  title,
  accent,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <header className={className}>
      <div className="flex items-center justify-between gap-4 border-t border-line pt-4">
        <Label>{eyebrow}</Label>
        <span className="mono-label text-muted">
          {`SEC. ${number} / ${total}`}
        </span>
      </div>

      <div className="mt-10 grid grid-cols-12 items-end gap-x-4 gap-y-6 md:mt-14">
        <h2
          id={id}
          className="display-title col-span-12 text-ink lg:col-span-9"
        >
          <span className="sr-only">{title}</span>
          <span aria-hidden="true">
            <SplitReveal text={title} accent={accent} />
          </span>
        </h2>
        <span
          aria-hidden="true"
          className="hidden select-none text-right font-display text-[clamp(4.5rem,9vw,8.5rem)] leading-[0.65] text-line/70 lg:col-span-3 lg:block"
        >
          {number}
        </span>
        {description ? (
          <p className="col-span-12 max-w-xl text-[0.8125rem] leading-relaxed text-muted md:col-span-7 lg:col-span-4 lg:col-start-9">
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
