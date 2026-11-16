import { cn } from "@/lib/utils";

interface CrosshairMarkProps {
  className?: string;
  size?: number;
}

export function CrosshairMark({ className, size = 11 }: CrosshairMarkProps) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 11 11"
      fill="none"
      className={cn("shrink-0 text-line", className)}
    >
      <path d="M5.5 0V11M0 5.5H11" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
