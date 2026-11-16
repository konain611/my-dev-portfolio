import type { SpecRow } from "@/types";
import { cn } from "@/lib/utils";

interface SpecTableProps {
  rows: SpecRow[];
  className?: string;
  dense?: boolean;
}

export function SpecTable({ rows, className, dense = false }: SpecTableProps) {
  return (
    <dl className={cn("w-full", className)}>
      {rows.map((row) => (
        <div
          key={row.key}
          className={cn(
            "grid grid-cols-[5.5rem_1fr] gap-3 border-b border-line first:border-t",
            dense ? "py-2.5" : "py-3.5",
          )}
        >
          <dt className="mono-label pt-0.5 text-muted">{row.key}</dt>
          <dd className="text-[0.8125rem] leading-relaxed text-ink/90">
            {row.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
