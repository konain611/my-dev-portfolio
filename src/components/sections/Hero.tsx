import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { Label } from "@/components/ui/Label";
import { SpecTable } from "@/components/ui/SpecTable";
import { StatusBar } from "@/components/layout/StatusBar";
import { HeroSchematic } from "./HeroSchematic";
import { Marquee } from "../motion/Marquee";

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-4rem)] scroll-mt-16 flex-col overflow-hidden"
      aria-labelledby="hero-name"
    >
      <div className="sheet flex flex-1 flex-col">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line py-3">
          <Label>
            {ui.hero.figure} / {ui.hero.schematic.title}
          </Label>
          <span className="mono-label hidden text-muted md:block">
            {ui.hero.subject}
          </span>
          <span className="mono-label text-muted">
            {profile.revision} / {profile.edition}
          </span>
        </div>

        <div className="relative flex flex-1 flex-col justify-center py-8 md:py-12">
          <HeroSchematic className="absolute left-[60%] top-1/4 hidden w-[46%] max-w-135 -translate-y-1/2 opacity-60 md:block lg:-right-4" />

          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="text-muted">
                ←
              </span>
              <span className="h-px flex-1 bg-line" />
              <span className="mono-label text-muted">{ui.hero.dimension}</span>
              <span className="h-px flex-1 bg-line" />
              <span aria-hidden="true" className="text-muted">
                →
              </span>
            </div>

            <h1 id="hero-name" className="hero-name mt-6 text-ink md:mt-10">
              <span className="sr-only">{profile.name}</span>
              <span aria-hidden="true" className=" ml-[-0.02em] block">
                {profile.firstName}
              </span>
              <span
                aria-hidden="true"
                className="outline-type block pr-[0.02em] text-right italic"
              >
                {profile.lastName}
              </span>
            </h1>

            <div className="mt-8 grid grid-cols-12 gap-x-4 gap-y-7 border-t border-line pt-6 md:mt-12">
              <div className="col-span-12 lg:col-span-7">
                <Label>{ui.hero.roleLabel}</Label>
                <p className="mt-2 max-w-lg font-mono text-[0.8125rem] uppercase leading-relaxed tracking-[0.16em] text-ink">
                  {profile.role}
                </p>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted">
                  {profile.roleLine}
                </p>
              </div>

              <div className="col-span-12 lg:col-span-4 lg:col-start-9">
                <SpecTable rows={profile.specs.slice(1, 5)} dense />
              </div>
            </div>

            <div className="mt-4 flex items-end justify-between gap-4">
              <div className="flex items-center gap-2">
                <span
                  className="status-dot status-dot--live"
                  aria-hidden="true"
                />
                <span className="mono-label text-signal">
                  {profile.availability.label}
                </span>
              </div>
              <div className="hidden flex-col items-center gap-3 lg:flex">
                <span className="mono-label text-muted">{ui.hero.scroll}</span>
                <span className="scroll-line" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Marquee />
      <br />
      <StatusBar />
    </section>
  );
}
