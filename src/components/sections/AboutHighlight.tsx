import type { ReactNode } from "react";

interface AboutHighlightProps {
  text: string;
  emphasis: string[];
}

interface Range {
  start: number;
  end: number;
}

export function AboutHighlight({ text, emphasis }: AboutHighlightProps) {
  const ranges: Range[] = emphasis
    .map((phrase) => {
      const start = text.indexOf(phrase);
      return start === -1 ? null : { start, end: start + phrase.length };
    })
    .filter((range): range is Range => range !== null)
    .sort((a, b) => a.start - b.start);

  const nodes: ReactNode[] = [];
  let cursor = 0;

  ranges.forEach((range, index) => {
    if (range.start < cursor) return;
    if (range.start > cursor) {
      nodes.push(text.slice(cursor, range.start));
    }
    nodes.push(
      <span key={`${range.start}-${index}`} className="text-signal italic">
        {text.slice(range.start, range.end)}
      </span>,
    );
    cursor = range.end;
  });

  if (cursor < text.length) {
    nodes.push(text.slice(cursor));
  }

  return <>{nodes}</>;
}
