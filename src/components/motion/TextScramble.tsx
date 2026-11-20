"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { SCRAMBLE_GLYPHS } from "@/lib/constants";
import { useReducedMotionSafe } from "@/lib/hooks/useReducedMotionSafe";

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: ElementType;
  active?: boolean;
  duration?: number;
  children?: ReactNode;
}

export function TextScramble({
  text,
  className,
  as: Tag = "span",
  active = true,
  duration = 620,
}: TextScrambleProps) {
  const reducedMotion = useReducedMotionSafe();
  const [display, setDisplay] = useState(text);
  const frameRef = useRef(0);

  useEffect(() => {
    if (!active || reducedMotion) return;

    const start = performance.now();
    const characters = Array.from(text);

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const resolved = Math.floor(progress * characters.length * 1.6);

      setDisplay(
        characters
          .map((character, index) => {
            if (character === " ") return " ";
            if (index < resolved) return character;
            const glyph =
              SCRAMBLE_GLYPHS[
                (index * 7 + Math.floor(now / 34)) % SCRAMBLE_GLYPHS.length
              ];
            return glyph;
          })
          .join(""),
      );

      if (progress < 1) {
        frameRef.current = window.requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };

    frameRef.current = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameRef.current);
  }, [active, duration, reducedMotion, text]);

  const output = !active || reducedMotion ? text : display;

  return (
    <Tag className={cn(className)} aria-label={text}>
      <span aria-hidden="true">{output}</span>
    </Tag>
  );
}

export function DecodeText(props: TextScrambleProps) {
  return <TextScramble {...props} />;
}
