"use client";

import { useEffect, useRef, useState } from "react";

type PreviewImageProps = {
  src: string;
  alt: string;
};

export function PreviewImage({ src, alt }: PreviewImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  // The image can finish loading before hydration, so onLoad never fires.
  // Check the already-complete case manually.
  useEffect(() => {
    const img = imgRef.current;
    if (img?.complete) {
      setStatus(img.naturalWidth > 0 ? "loaded" : "error");
    }
  }, []);

  return (
    <div className="relative h-full w-full">
      {status === "loading" && (
        <div
          role="status"
          aria-live="polite"
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface"
        >
          <span
            aria-hidden="true"
            className="h-5 w-5 animate-spin rounded-full border border-line border-t-signal"
          />
          <span className="mono-label text-muted">Loading preview…</span>
        </div>
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface">
          <span className="mono-label text-muted">Preview unavailable</span>
        </div>
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="eager"
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        className={`h-full w-full object-cover object-top transition-opacity duration-500 ${
          status === "loaded" ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}