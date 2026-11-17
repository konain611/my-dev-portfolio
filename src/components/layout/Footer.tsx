import type { ReactNode } from "react";
import Link from "next/link";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { ui } from "@/data/ui";
import { Label } from "@/components/ui/Label";
import { KMark } from "@/components/ui/KMark";
import { StatusBar } from "./StatusBar";

function SocialIcon({ id }: { id: string }) {
  const icons: Record<string, ReactNode> = {
    github: (
      <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.91c.58.11.79-.25.79-.56v-2.02c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.06.78 2.14v3.18c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    ),
    linkedin: (
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.23 0Z" />
    ),
    x: (
      <path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.45L5.53 22H2.4l7.25-8.29L1.8 2h6.4l4.43 6.78L18.9 2Zm-1.1 18h1.73L7.26 3.88H5.4L17.8 20Z" />
    ),
    email: (
      <path d="M2.5 4.5h19v15h-19zM3 5l9 8 9-8" fill="none" stroke="currentColor" strokeWidth="1.8" />
    ),
  };
  const icon = icons[id];

  if (!icon) return null;

  return (
    <svg
      aria-hidden="true"
      className="size-[1em] shrink-0 text-ink"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      {icon}
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-base">
      <div className="sheet py-12 md:py-16">
        <div className="grid grid-cols-12 gap-x-4 gap-y-10">
          <div className="col-span-12 md:col-span-5">
            <Label>{ui.footer.rights}</Label>
            <div className="mt-4 flex items-start justify-between gap-6">
              <Link
                href="/"
                className="block font-display text-4xl leading-none tracking-[-0.03em] text-ink transition-colors hover:text-signal sm:text-5xl"
              >
                {profile.firstName}
                <span className="block italic text-muted">
                  {profile.lastName}
                </span>
              </Link>
              <KMark
                variant="compact"
                className="size-14 shrink-0 border border-line sm:size-16"
              />
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">
              {profile.status}
            </p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <Label>{ui.contact.socialsLabel}</Label>
            <ul className="mt-4 space-y-2">
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
                    className="link-rule mono-label text-muted py-2"
                  >
                    <SocialIcon id={social.id} />
                    {social.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <Label>{ui.footer.profileLabel}</Label>
            <p className="mono-label py-2 text-ink">
              {profile.experience} IN PRODUCTION
            </p>
            <p className="mono-label py-2 text-muted">
              {profile.highestEducation}
            </p>
            <p className="mono-label py-2 leading-relaxed text-muted">
              {profile.location.city} / {profile.location.country}
            </p>
            <p className="mono-label py-2 text-muted">
              {profile.revision}
            </p>
            <p className="mono-label py-2 text-muted">
              {profile.edition}
            </p>
          </div>

          <div className="col-span-12 flex items-start md:col-span-2 md:justify-end">
            <a
              href="#top"
              className="link-rule mono-label text-ink "
              data-cursor={ui.cursor.open}
            >
              {ui.footer.backToTop}
              <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </div>
      <StatusBar variant="footer" />
    </footer>
  );
}
