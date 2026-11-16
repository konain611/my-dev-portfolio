import Link from "next/link";
import { CrosshairMark } from "@/components/ui/CrosshairMark";
import { Label } from "@/components/ui/Label";
import { ui } from "@/data/ui";

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="relative flex min-h-[calc(100svh-12rem)] items-center py-20 md:py-28"
    >
      <div className="sheet w-full">
        <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
          <Label accent>{ui.notFound.eyebrow}</Label>
          <span className="mono-label text-muted">
            {ui.notFound.code} / 00
          </span>
        </div>

        <div className="grid grid-cols-12 gap-x-4 gap-y-10 pt-10 md:pt-16">
          <div className="col-span-12 lg:col-span-8">
            <span
              aria-hidden="true"
              className="outline-type block font-display text-[clamp(6rem,22vw,15rem)] leading-[0.75] tracking-[-0.05em]"
            >
              {ui.notFound.code}
            </span>
            <h1
              id="not-found-title"
              className="display-title mt-8 max-w-[13ch] text-ink"
            >
              {ui.notFound.title}
            </h1>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <CrosshairMark size={18} className="text-signal" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              {ui.notFound.description}
            </p>
            <Link
              href="/"
              data-cursor={ui.cursor.index}
              className="mono-label mt-8 inline-flex items-center justify-between gap-10 border border-line px-5 py-4 text-ink transition-colors hover:border-signal hover:text-signal"
            >
              {ui.notFound.action}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
