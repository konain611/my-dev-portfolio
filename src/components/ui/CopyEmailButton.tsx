"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { cn } from "@/lib/utils";

type CopyState = "idle" | "copied" | "failed";

export function CopyEmailButton({ className }: { className?: string }) {
  const [state, setState] = useState<CopyState>("idle");
  const timeoutRef = useRef(0);

  useEffect(() => {
    return () => window.clearTimeout(timeoutRef.current);
  }, []);

  const label =
    state === "copied"
      ? ui.contact.copied
      : state === "failed"
        ? ui.contact.copyFailed
        : ui.contact.copy;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setState("copied");
    } catch {
      const field = document.createElement("textarea");
      field.value = profile.email;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(field);
      setState(copied ? "copied" : "failed");
    }

    window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setState("idle"), 2200);
  };

  return (
    <button
      type="button"
      onClick={copy}
      data-cursor={ui.cursor.copy}
      aria-live="polite"
      className={cn(
        "group inline-flex h-11 items-center justify-between gap-8 border px-4 font-mono text-micro uppercase tracking-label transition-colors duration-300",
        state === "copied"
          ? "border-signal bg-signal text-paper"
          : "border-line text-ink hover:border-signal hover:text-signal",
        className,
      )}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className={cn(
          "size-2 border border-current",
          state === "copied" && "bg-current",
        )}
      />
    </button>
  );
}
