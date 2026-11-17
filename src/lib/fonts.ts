import { Instrument_Serif, Inter_Tight, JetBrains_Mono } from "next/font/google";

export const displayFont = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

export const sansFont = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export const fontVariables = `${displayFont.variable} ${monoFont.variable} ${sansFont.variable}`;
