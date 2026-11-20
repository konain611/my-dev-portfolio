import type { ReactNode } from "react";
import { profile } from "@/data/profile";
import { sectionNumber, totalSections } from "@/data/nav";
import { ui } from "@/data/ui";
import { AboutHighlight } from "./AboutHighlight";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpecTable } from "@/components/ui/SpecTable";
import { Label } from "@/components/ui/Label";
import { SubjectPlate } from "@/components/ui/SubjectPlate";
import { ClipReveal } from "@/components/motion/ClipReveal";

const number = sectionNumber("index");
const total = String(totalSections).padStart(2, "0");

function focusList(): ReactNode {
  return (
    <ul className="mt-4 border-t border-line">
      {profile.focus.map((item, index) => (
        <li
          key={item}
          className="flex items-baseline justify-between gap-4 border-b border-line py-3"
        >
          <span className="mono-label text-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="flex-1 text-[0.8125rem] text-ink/90">{item}</span>
          <span aria-hidden="true" className="text-line">
            +
          </span>
        </li>
      ))}
    </ul>
  );
}

export function About() {
  return (
    <section
      id="index"
      className="relative scroll-mt-16 py-20 md:py-28"
      aria-labelledby="index-heading"
    >
      <div className="sheet">
        <SectionHeading
          id="index-heading"
          number={number}
          total={total}
          {...ui.sections.about}
        />

        <div className="mt-14 grid grid-cols-12 gap-x-4 gap-y-12 md:mt-20">
          <div className="col-span-12 lg:col-span-7">
            <Label>{ui.about.specsLabel}</Label>
            <p className="statement mt-6 max-w-2xl text-ink">
              <AboutHighlight
                text={profile.about.lead}
                emphasis={profile.about.emphasis}
              />
            </p>
            <p className="mt-8 max-w-xl text-[0.8125rem] leading-[1.85] text-muted lg:ml-[10%]">
              {profile.about.body}
            </p>
            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-12 bg-signal" />
              <span className="mono-label text-muted">
                {ui.about.signature}
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <Label>{ui.about.specsLabel}</Label>
            <SpecTable rows={profile.specs} className="mt-4" />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-x-4 gap-y-10 md:mt-24">
          <div className="col-span-12 md:col-span-5">
            <ClipReveal>
              <SubjectPlate />
            </ClipReveal>
          </div>

          <div className="col-span-12 md:col-span-7">
            <Label>{ui.about.focusLabel}</Label>
            {focusList()}
            <div className="mt-8 flex flex-wrap gap-x-4 gap-y-2">
              {profile.stack.slice(0, 8).map((item) => (
                <span key={item} className="mono-label text-muted">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
