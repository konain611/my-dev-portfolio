import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "solid" | "outline";

interface ButtonProps {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
  arrow?: boolean;
  cursor?: string;
}

export function Button({
  children,
  href,
  variant = "outline",
  className,
  external = false,
  arrow = true,
  cursor,
}: ButtonProps) {
  return (
    <a
      href={href}
      data-cursor={cursor}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className={cn(
        "group inline-flex items-center justify-between gap-6 border px-5 py-4 font-mono text-micro uppercase tracking-label transition-colors duration-300",
        variant === "solid"
          ? "border-signal bg-signal text-paper hover:border-ink hover:bg-ink hover:text-paper"
          : "border-line text-ink hover:border-signal hover:text-signal",
        className,
      )}
    >
      <span>{children}</span>
      {arrow ? (
        <span
          aria-hidden="true"
          className="translate-y-px text-sm transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0"
        >
          ↗
        </span>
      ) : null}
    </a>
  );
}
