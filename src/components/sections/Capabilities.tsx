import { capabilities } from "@/data/capabilities";
import { sectionNumber, totalSections } from "@/data/nav";
import { ui } from "@/data/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CapabilityTable } from "@/components/ui/CapabilityTable";

const number = sectionNumber("capabilities");
const total = String(totalSections).padStart(2, "0");

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="relative scroll-mt-16 py-20 md:py-28"
      aria-labelledby="capabilities-heading"
    >
      <div className="sheet">
        <SectionHeading
          id="capabilities-heading"
          number={number}
          total={total}
          {...ui.sections.capabilities}
        />
        <CapabilityTable groups={capabilities} />
      </div>
    </section>
  );
}
