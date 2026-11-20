"use client";

import { useState } from "react";
import { ui } from "@/data/ui";
import { cn } from "@/lib/utils";
import { CrosshairMark } from "@/components/ui/CrosshairMark";

interface MarqueeProps {
  className?: string;
}

export function Marquee({ className }: MarqueeProps) {
  const [paused, setPaused] = useState(false);
  const keywords = ui.marquee.keywords;

  return (
    <div
      className={cn(
        "marquee relative flex items-stretch overflow-hidden border-y border-line bg-base",
        className,
      )}
    >
      <span className="sr-only">{keywords.join(", ")}</span>
      <div
        className="marquee-track"
        data-paused={paused ? "true" : "false"}
        aria-hidden="true"
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {keywords.map((keyword, index) => (
              <div
                key={`${copy}-${keyword}`}
                className="flex items-center gap-6 px-6 py-3"
              >
                <CrosshairMark className="text-signal/70" />
                <span className="mono-label whitespace-nowrap text-ink">
                  {keyword}
                </span>
                <span className="mono-label text-line">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="relative z-10 flex shrink-0 items-center border-l border-line bg-base pl-3">
        <button
          type="button"
          onClick={() => setPaused((state) => !state)}
          aria-pressed={paused}
          className="mono-label px-2 py-3 text-muted transition-colors hover:text-signal"
        >
          {paused ? ui.marquee.play : ui.marquee.pause}
        </button>
      </div>
    </div>
  );
}
