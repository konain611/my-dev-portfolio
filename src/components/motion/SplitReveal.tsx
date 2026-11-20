"use client";

import { motion } from "motion/react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";
import { EASE, VIEWPORT } from "@/lib/motion";
import { useReducedMotionSafe } from "@/lib/hooks/useReducedMotionSafe";

interface WordToken {
  word: string;
  accent: boolean;
}

function tokenize(text: string, accent?: string): WordToken[] {
  const accentStart = accent ? text.indexOf(accent) : -1;
  const accentEnd =
    accent && accentStart >= 0 ? accentStart + accent.length : -1;
  let cursor = 0;

  return text.split(" ").map((word) => {
    const start = cursor;
    cursor += word.length + 1;
    const isAccent =
      accentStart >= 0 &&
      start < accentEnd &&
      start + word.length > accentStart;
    return { word, accent: isAccent };
  });
}

interface SplitRevealProps {
  text: string;
  className?: string;
  accent?: string;
  as?: ElementType;
  delay?: number;
  once?: boolean;
}

export function SplitReveal({
  text,
  className,
  accent,
  as: Tag = "span",
  delay = 0,
  once = true,
}: SplitRevealProps) {
  const reducedMotion = useReducedMotionSafe();
  const words = tokenize(text, accent);

  return (
    <Tag
      className={cn("inline-block", className)}
      aria-label={text}
      style={{ display: "block" }}
    >
      <motion.span
        aria-hidden="true"
        initial={reducedMotion ? false : "hidden"}
        whileInView="visible"
        viewport={{ ...VIEWPORT, once }}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.055, delayChildren: delay },
          },
        }}
        className="block"
      >
        {words.map((token, index) => (
          <span
            key={`${token.word}-${index}`}
            className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-top -mb-[0.12em]"
          >
            <motion.span
              className={cn(
                "inline-block",
                token.accent && "text-signal italic",
              )}
              variants={{
                hidden: { y: "115%", rotate: 0.001 },
                visible: {
                  y: "0%",
                  rotate: 0,
                  transition: { duration: 0.85, ease: EASE },
                },
              }}
            >
              {token.word}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
