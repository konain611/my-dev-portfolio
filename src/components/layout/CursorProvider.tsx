"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const Cursor = dynamic(
  () => import("@/components/motion/Cursor").then((module) => module.Cursor),
  { ssr: false },
);

export function CursorProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Cursor />
    </>
  );
}
