"use client";

import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { useLocalTime } from "@/lib/hooks/useLocalTime";
import { cn } from "@/lib/utils";

interface StatusBarProps {
  variant?: "hero" | "footer";
  className?: string;
}

export function StatusBar({ variant = "hero", className }: StatusBarProps) {
  const { time, date, mounted } = useLocalTime(profile.location.timezone);

  const cellClass =
    "flex min-h-[4.25rem] flex-col justify-center gap-1 border border-line px-4 py-3 ";

  return (
    <div
      className={cn(
        "grid grid-cols-2 border-t border-line bg-base md:grid-cols-4",
        className,
      )}
    >
      {variant === "hero" ? (
        <>
          <div className={cellClass}>
            <span className="mono-label text-muted">{ui.status.available}</span>
            <span className="flex items-center gap-2">
              <span
                className="status-dot status-dot--live"
                aria-hidden="true"
              />
              <span className="mono-label text-signal">
                {profile.availability.label}
              </span>
            </span>
          </div>
          <div className={cellClass}>
            <span className="mono-label text-muted">
              {ui.status.localTime}
            </span>
            <span className="mono-meta tabular-nums text-ink">
              {mounted ? time : "--:--:--"}
            </span>
            <span className="mono-label text-muted">{date}</span>
          </div>
          <div className={cellClass}>
            <span className="mono-label text-muted">
              {ui.status.coordinates}
            </span>
            <span className="mono-meta tabular-nums text-ink">
              {profile.location.coordinates.label}
            </span>
            <span className="mono-label text-muted">
              {profile.location.city.toUpperCase()},{" "}
              {profile.location.country.toUpperCase()}
            </span>
          </div>
          <div className={cellClass}>
            <span className="mono-label text-muted">{ui.status.timezone}</span>
            <span className="mono-meta text-ink">{profile.experience}</span>
            <span className="mono-label text-muted">{profile.role}</span>
          </div>
        </>
      ) : (
        <>
          <div className={cellClass}>
            <span className="mono-label text-muted">{ui.footer.revision}</span>
            <span className="mono-meta text-ink">{profile.revision}</span>
            <span className="mono-label text-muted">{profile.edition}</span>
          </div>
          <div className={cellClass}>
            <span className="mono-label text-muted">
              {ui.footer.localTime}
            </span>
            <span className="mono-meta tabular-nums text-ink">
              {mounted ? time : "--:--:--"}
            </span>
            <span className="mono-label text-muted">{date}</span>
          </div>
          <div className={cellClass}>
            <span className="mono-label text-muted">
              {ui.status.coordinates}
            </span>
            <span className="mono-meta tabular-nums text-ink">
              {profile.location.coordinates.label}
            </span>
            <span className="mono-label text-muted">
              {profile.location.city.toUpperCase()}
            </span>
          </div>
          <div className={cellClass}>
            <span className="mono-label text-muted">{ui.status.available}</span>
            <span className="flex items-center gap-2">
              <span
                className="status-dot status-dot--live"
                aria-hidden="true"
              />
              <span className="mono-label text-signal">
                {profile.availability.label}
              </span>
            </span>
          </div>
        </>
      )}
    </div>
  );
}
