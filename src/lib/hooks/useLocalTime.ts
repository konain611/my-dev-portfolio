"use client";

import { useEffect, useState } from "react";

interface LocalTime {
  time: string;
  date: string;
  mounted: boolean;
}

const timeFormatterCache = new Map<string, Intl.DateTimeFormat>();
const dateFormatterCache = new Map<string, Intl.DateTimeFormat>();

function getFormatter(
  cache: Map<string, Intl.DateTimeFormat>,
  key: string,
  options: Intl.DateTimeFormatOptions,
): Intl.DateTimeFormat {
  const existing = cache.get(key);
  if (existing) return existing;
  const formatter = new Intl.DateTimeFormat("en-GB", options);
  cache.set(key, formatter);
  return formatter;
}

export function useLocalTime(timeZone: string): LocalTime {
  const [state, setState] = useState<LocalTime>({
    time: "--:--:--",
    date: "--- -- --- ----",
    mounted: false,
  });

  useEffect(() => {
    const timeFormatter = getFormatter(timeFormatterCache, `time:${timeZone}`, {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hourCycle: "h23",
    });
    const dateFormatter = getFormatter(dateFormatterCache, `date:${timeZone}`, {
      timeZone,
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    const tick = () => {
      const now = new Date();
      setState({
        time: timeFormatter.format(now),
        date: dateFormatter.format(now).toUpperCase(),
        mounted: true,
      });
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [timeZone]);

  return state;
}
