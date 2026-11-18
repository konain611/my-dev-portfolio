"use client";

import { useReducedMotion } from "motion/react";
import { REDUCED_MOTION_QUERY } from "@/lib/constants";
import { useMediaQuery } from "./useMediaQuery";

export function useReducedMotionSafe(): boolean {
  const motionPreference = useReducedMotion();
  const mediaPreference = useMediaQuery(REDUCED_MOTION_QUERY);
  return Boolean(motionPreference) || mediaPreference;
}
