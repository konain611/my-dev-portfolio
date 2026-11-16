import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TagProps {
  children: ReactNode;
  className?: string;
  accent?: boolean;
}

export function Tag({ children, className, accent = false }: TagProps) {
  return (
    <span
      className={cn(
        "mono-label inline-flex items-center border px-2 py-1 text-[0.5625rem] leading-none",
        accent
          ? "border-signal/60 text-signal"
          : "border-line text-muted group-hover:border-paper/30 group-hover:text-paper",
        className,
      )}
    >
      {children}
    </span>
  );
}
