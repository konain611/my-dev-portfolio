import { cn } from "@/lib/utils";
import { CrosshairMark } from "./CrosshairMark";

interface RuleProps {
  className?: string;
  label?: string;
  accent?: boolean;
}

export function Rule({ className, label, accent = false }: RuleProps) {
  return (
    <div
      className={cn("flex items-center gap-3", className)}
      aria-hidden="true"
    >
      <CrosshairMark />
      <span
        className={cn("h-px flex-1", accent ? "bg-signal" : "bg-line")}
      />
      {label ? (
        <span className="mono-label whitespace-nowrap text-muted">{label}</span>
      ) : null}
      <span
        className={cn("h-px flex-1", accent ? "bg-signal" : "bg-line")}
      />
      <CrosshairMark />
    </div>
  );
}
