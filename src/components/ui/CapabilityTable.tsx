"use client";

import { motion } from "motion/react";
import type { CapabilityGroup } from "@/types";
import { ui } from "@/data/ui";
import { EASE, VIEWPORT } from "@/lib/motion";

interface CapabilityTableProps {
  groups: CapabilityGroup[];
}

export function CapabilityTable({ groups }: CapabilityTableProps) {
  return (
    <div className="mt-12 border-t border-line md:mt-16">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">{ui.sections.capabilities.title}</caption>
        <thead>
          <tr className="border-b border-line">
            <th
              scope="col"
              className="mono-label w-[5.5rem] py-3 pr-3 font-normal text-muted md:w-[8rem]"
            >
              {ui.capabilities.columns.code}
            </th>
            <th
              scope="col"
              className="mono-label py-3 pr-3 font-normal text-muted"
            >
              {ui.capabilities.columns.item}
            </th>
            <th
              scope="col"
              className="mono-label hidden w-[45%] py-3 pl-6 font-normal text-muted md:table-cell"
            >
              {ui.capabilities.columns.application}
            </th>
          </tr>
        </thead>
        {groups.map((group, groupIndex) => (
          <tbody key={group.code}>
            <tr className="border-b border-line bg-surface/60">
              <th scope="colgroup" colSpan={3} className="p-0 text-left">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 px-3 py-4 md:px-4">
                  <span className="mono-label text-signal">{group.code}</span>
                  <span className="font-display text-2xl leading-none text-ink md:text-3xl">
                    {group.discipline}
                  </span>
                  <span className="mono-label text-muted">
                    {String(group.items.length).padStart(2, "0")}{" "}
                    {ui.capabilities.countLabel}
                  </span>
                  <span className="w-full text-xs leading-relaxed text-muted md:ml-auto md:w-auto md:max-w-sm md:text-right">
                    {group.note}
                  </span>
                </div>
              </th>
            </tr>

            {group.items.map((item, itemIndex) => (
              <motion.tr
                key={item.code}
                className="border-b border-line transition-colors hover:bg-surface"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={VIEWPORT}
                transition={{
                  duration: 0.45,
                  ease: EASE,
                  delay: itemIndex * 0.04 + (groupIndex % 2) * 0.01,
                }}
              >
                <td className="align-top py-4 pr-3">
                  <span className="mono-label text-muted">{item.code}</span>
                </td>
                <td className="align-top py-4 pr-3">
                  <span className="block text-sm text-ink">{item.name}</span>
                  <span className="mt-1 block text-xs leading-relaxed text-muted md:hidden">
                    {item.application}
                  </span>
                </td>
                <td className="hidden align-top py-4 pl-6 pr-3 text-xs leading-relaxed text-muted md:table-cell">
                  {item.application}
                </td>
              </motion.tr>
            ))}
          </tbody>
        ))}
      </table>

      <p className="mono-label mt-5 flex items-start gap-3 text-muted/80">
        <span className="status-dot mt-1" aria-hidden="true" />
        {ui.capabilities.note}
      </p>
    </div>
  );
}
