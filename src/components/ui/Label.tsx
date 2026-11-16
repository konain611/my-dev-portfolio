import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LabelProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  dot?: boolean;
  accent?: boolean;
}

export function Label({
  children,
  className,
  as: Tag = "span",
  dot = false,
  accent = false,
}: LabelProps) {
  return (
    <Tag
      className={cn(
        "mono-label inline-flex items-center gap-2 text-muted",
        accent && "text-signal",
        className,
      )}
    >
      {dot ? <span className="status-dot" aria-hidden="true" /> : null}
      {children}
    </Tag>
  );
}
