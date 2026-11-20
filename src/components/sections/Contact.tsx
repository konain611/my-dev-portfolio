import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { sectionNumber, totalSections } from "@/data/nav";
import { ui } from "@/data/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Label } from "@/components/ui/Label";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { Magnetic } from "@/components/motion/Magnetic";

const number = sectionNumber("contact");
const total = String(totalSections).padStart(2, "0");
const [emailLocal, emailDomain] = profile.email.split("@");

export function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-svh scroll-mt-16 flex-col justify-between py-20 md:py-28"
      aria-labelledby="contact-heading"
    >
      <div className="sheet">
        <SectionHeading
          id="contact-heading"
          number={number}
          total={total}
          {...ui.sections.contact}
        />

        <div className="mt-16 md:mt-24">
          <Label accent>{ui.contact.directLine}</Label>
          <Magnetic className="mt-3 block max-w-full md:mt-5" strength={0.08}>
            <a
              href={`mailto:${profile.email}`}
              data-cursor={ui.cursor.open}
              className="group block max-w-full break-all font-display text-[clamp(2.6rem,8.6vw,8.5rem)] leading-[0.82] tracking-[-0.045em] text-ink"
              aria-label={profile.email}
            >
              <span className="inline whitespace-nowrap">
                {emailLocal}
              </span>
              <span className="inline whitespace-nowrap text-muted italic transition-colors group-hover:text-signal">
                {`@${emailDomain}`}
              </span>
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="sheet mt-16 md:mt-24">
        <div className="grid grid-cols-12 gap-x-4 gap-y-8 border-t border-line pt-6">
          <div className="col-span-12 md:col-span-4">
            <CopyEmailButton className="w-full max-w-[18rem] my-2" />
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted">
              {ui.contact.availabilityNote}
            </p>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <Label>{ui.contact.socialsLabel}</Label>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      social.href.startsWith("http")
                        ? "noreferrer noopener"
                        : undefined
                    }
                    data-cursor={
                      social.href.startsWith("http")
                        ? ui.cursor.open
                        : ui.cursor.copy
                    }
                    className="link-rule mono-label w-full text-muted text-xs md:text-lg"
                  >
                    {social.label.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 flex items-end justify-between gap-4 border-t border-line pt-6">
            <span className="mono-label text-muted text-sm">
              {profile.location.city.toUpperCase()} /{" "}
              {profile.location.country.toUpperCase()}
            </span>
            {/* <span className="mono-label text-muted">{profile.revision}</span> */}
          </div>
        </div>
      </div>
    </section>
  );
}
