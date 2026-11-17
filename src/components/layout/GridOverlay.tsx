import { CrosshairMark } from "@/components/ui/CrosshairMark";

const columns = Array.from({ length: 12 }, (_, index) => index);

export function GridOverlay() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed bottom-0 left-0 right-0 top-16 z-0 hidden lg:left-rail lg:block"
    >
      <div className="sheet h-full">
        <div className="grid h-full grid-cols-12">
          {columns.map((column) => (
            <div
              key={column}
              className="relative border-l border-line/35 last:border-r"
            >
              <CrosshairMark
                size={9}
                className="absolute -left-[4.5px] -top-[4.5px] text-line/70"
              />
              <CrosshairMark
                size={9}
                className="absolute -bottom-[4.5px] -left-[4.5px] text-line/50"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
