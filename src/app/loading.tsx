import { KMark } from "@/components/ui/KMark";

export default function Loading() {
  return (
    <section
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading portfolio"
      className="sheet flex min-h-[calc(100svh-8rem)] items-center py-20 md:py-28"
    >
      <div className="w-full border-y border-line py-8 md:py-12">
        <div className="flex items-center gap-3">
          <KMark
            variant="compact"
            className="size-8 border border-line"
          />
          <span className="mono-label text-muted">SYSTEM / 01</span>
        </div>

        <p
          aria-hidden="true"
          className="mt-10 font-display text-[clamp(4rem,16vw,11rem)] leading-[0.8] tracking-[-0.05em] text-ink"
        >
          LOADING
        </p>

        <div className="mt-10 flex max-w-md items-center gap-4">
          <span className="loading-meter h-px flex-1 bg-line" />
          <span className="mono-label text-signal">PLEASE WAIT</span>
        </div>
      </div>
    </section>
  );
}
