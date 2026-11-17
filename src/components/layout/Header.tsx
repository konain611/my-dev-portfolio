"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems, sectionCounter } from "@/data/nav";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { ui } from "@/data/ui";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { sectionIds } from "@/data/nav";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";
import { TextScramble } from "@/components/motion/TextScramble";
import { KMark } from "@/components/ui/KMark";

function headerHref(pathname: string, id: string): string {
  return pathname === "/" ? `#${id}` : `/#${id}`;
}

interface NavLinkProps {
  item: (typeof navItems)[number];
  pathname: string;
  active: boolean;
  onNavigate?: () => void;
}

function NavLink({ item, pathname, active, onNavigate }: NavLinkProps) {
  const [hovered, setHovered] = useState(false);
  const href = headerHref(pathname, item.id);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onClick={onNavigate}
      data-cursor={ui.cursor.open}
      aria-current={active ? "true" : undefined}
      className={cn(
        "group flex items-baseline gap-1.5 transition-colors",
        active ? "text-ink" : "text-muted hover:text-ink",
      )}
    >
      <span
        className={cn(
          "font-mono text-[0.5rem] leading-none tracking-[0.14em]",
          active ? "text-signal" : "text-muted/70",
        )}
      >
        {item.number}
      </span>
      <TextScramble
        as="span"
        text={item.label.toUpperCase()}
        active={hovered}
        className="mono-label"
      />
    </a>
  );
}

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      root.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-base">
        <div className="lg:pl-rail">
          <div className="sheet flex h-16 items-center justify-between gap-4">
            <Link
              href="/"
              className="group flex items-center gap-3"
              data-cursor={ui.cursor.index}
              aria-label={`${profile.displayName} — home`}
            >
              <KMark
                variant="compact"
                className="size-9 shrink-0 border border-line transition-colors group-hover:border-signal"
              />
              <span className="flex flex-col">
                <span className="mono-label text-ink transition-colors group-hover:text-signal">
                  {ui.header.wordmark}
                </span>
                <span className="mono-label text-[0.5rem] tracking-[0.24em] text-muted">
                  {ui.header.descriptor}
                </span>
              </span>
            </Link>

            <nav
              aria-label={ui.meta.navLabel}
              className="hidden items-center gap-5 md:flex lg:gap-7"
            >
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  item={item}
                  pathname={pathname}
                  active={active === item.id}
                />
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 lg:flex">
                <span
                  className="status-dot status-dot--live"
                  aria-hidden="true"
                />
                <span className="mono-label text-muted">
                  {profile.availability.label}
                </span>
              </div>
              <div className="hidden h-4 w-px bg-line lg:block" />
              <span className="mono-label hidden text-ink sm:block">
                {onHome ? sectionCounter(active) : ui.caseStudy.caseFile}
              </span>
              <button
                ref={triggerRef}
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="mono-label border border-line px-3 py-2 text-ink transition-colors hover:border-signal hover:text-signal md:hidden"
              >
                {ui.meta.menu}
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={ui.meta.menuTitle}
            className="fixed inset-0 z-60 flex flex-col bg-base md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <div className="sheet flex h-16 shrink-0 items-center justify-between border-b border-line">
              <div className="flex items-center gap-3">
                <KMark
                  variant="compact"
                  className="size-7 shrink-0 border border-line"
                />
                <span className="mono-label text-muted">
                  {ui.meta.menuTitle}
                </span>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setMenuOpen(false)}
                className="mono-label border border-line px-3 py-2 text-ink transition-colors hover:border-signal hover:text-signal"
              >
                {ui.meta.close}
              </button>
            </div>

            <nav
              aria-label={ui.meta.navLabel}
              className="sheet flex flex-1 flex-col justify-center"
            >
              {navItems.map((item, index) => (
                <motion.a
                  key={item.id}
                  href={headerHref(pathname, item.id)}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline gap-4 border-b border-line py-4 first:border-t"
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.08 + index * 0.045,
                    duration: 0.5,
                    ease: EASE,
                  }}
                >
                  <span className="mono-label text-signal">{item.number}</span>
                  <span className="font-display text-[clamp(2.4rem,12vw,4.5rem)] leading-[0.95] tracking-[-0.03em] text-ink">
                    {item.label}
                  </span>
                  <span
                    aria-hidden="true"
                    className="ml-auto text-lg text-muted transition-colors group-hover:text-signal"
                  >
                    ↗
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="sheet shrink-0 border-t border-line py-5">
              <div className="flex items-center gap-2">
                <span className="status-dot status-dot--live" aria-hidden="true" />
                <span className="mono-label text-signal">
                  {profile.availability.label}
                </span>
              </div>
              <a
                href={`mailto:${profile.email}`}
                className="mt-3 block font-display text-2xl italic text-ink"
              >
                {profile.email}
              </a>
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      social.href.startsWith("http")
                        ? "noreferrer noopener"
                        : undefined
                    }
                    className="mono-label text-muted underline decoration-line underline-offset-4 hover:text-signal"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
              <p className="mono-label mt-6 text-muted/70">{ui.meta.menuNote}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
