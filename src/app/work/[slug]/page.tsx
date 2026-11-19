import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureDiagram } from "@/components/ui/ArchitectureDiagram";
import { Button } from "@/components/ui/Button";
import { CrosshairMark } from "@/components/ui/CrosshairMark";
import { Label } from "@/components/ui/Label";
import { Tag } from "@/components/ui/Tag";
import { profile } from "@/data/profile";
import { getNextProject, getProject, getProjectSlugs } from "@/data/projects";
import { ui } from "@/data/ui";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { buildMetadata } from "@/lib/metadata";
import { PreviewImage } from "@/components/ui/PreviewImage";

// The route awaits `params` before it can render, so navigation may block by design.
export const instant = false;

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: `${ui.notFound.eyebrow} — ${SITE_NAME}`,
      description: ui.notFound.description,
      robots: { index: false, follow: false },
    };
  }

  return buildMetadata({
    title: project.name,
    description: `${project.category} — ${project.summary}`,
    path: `/work/${project.slug}`,
    image: {
      url: `/work/${project.slug}/opengraph-image`,
      alt: `${project.name} — ${project.category}, ${project.year}`,
    },
  });
}

function SectionLabel({
  number,
  children,
  id,
}: {
  number: string;
  children: string;
  id: string;
}) {
  return (
    <h2
      id={id}
      className="mono-label col-span-12 h-fit text-muted md:sticky md:top-24 md:col-span-3"
    >
      <span className="mr-2 text-signal">{number}</span>
      {children}
    </h2>
  );
}

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);

  if (!project) notFound();

  const nextProject = getNextProject(project.slug);
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.summary,
    dateCreated: project.year,
    url: `${SITE_URL}/work/${project.slug}`,
    keywords: project.stack.join(", "),
    creator: {
      "@type": "Person",
      name: profile.name,
      url: SITE_URL,
    },
  }).replace(/</g, "\\u003c");

  return (
    <article className="relative">
      <div className="sheet">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3">
          <Link
            href="/#work"
            data-cursor={ui.cursor.index}
            className="link-rule mono-label text-muted"
          >
            <span aria-hidden="true">←</span>
            {ui.caseStudy.backToIndex}
          </Link>
          <span className="mono-label text-signal">
            {ui.caseStudy.caseFile} / {project.index}
          </span>
          <span className="mono-label text-muted">{project.status}</span>
        </div>
      </div>

      <header className="sheet">
        <div className="grid grid-cols-12 gap-x-4 gap-y-10 py-10 md:py-16">
          <div className="col-span-12 lg:col-span-9">
            <p className="mono-label flex flex-wrap items-center gap-2 text-muted">
              <span>{project.category}</span>
              <span aria-hidden="true" className="text-line">
                /
              </span>
              <span>{project.year}</span>
            </p>
            <h1 className="mt-5 max-w-[15ch] font-display text-[clamp(2.7rem,8.2vw,7.5rem)] uppercase leading-[0.82] tracking-[-0.04em] text-ink">
              {project.name}
            </h1>
            <p className="mt-7 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
              {project.summary}
            </p>
            <Button
              href={project.url}
              external
              cursor={ui.cursor.open}
              className="mt-7"
            >
              {ui.caseStudy.visitProject}
            </Button>
          </div>

          <div className="col-span-12 flex items-start justify-between gap-4 lg:col-span-3 lg:flex-col lg:items-end">
            <CrosshairMark size={16} className="text-signal" />
            <span
              aria-hidden="true"
              className="font-display text-[clamp(4rem,10vw,7rem)] leading-none text-line/70"
            >
              {project.index}
            </span>
          </div>
        </div>
      </header>

      <div className="sheet">
        <dl className="grid grid-cols-2 border-y border-line md:grid-cols-4">
          {[
            { label: ui.caseStudy.metaLabels.client, value: project.client },
            { label: ui.caseStudy.metaLabels.year, value: project.year },
            { label: ui.caseStudy.metaLabels.role, value: project.role },
            { label: ui.caseStudy.metaLabels.status, value: project.status },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-2 border-b border-line p-4 last:border-b-0 even:border-l md:border-b-0 md:border-l md:first:border-l-0"
            >
              <dt className="mono-label text-muted">{item.label}</dt>
              <dd className="text-xs leading-relaxed text-ink/90">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="sheet">
        <div className="grid grid-cols-12 gap-x-4 gap-y-10 py-12 md:py-16">
          <div className="col-span-12 lg:col-span-8">
            <div className="aspect-video overflow-hidden border border-line bg-surface hover:border-signal ">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full w-full"
                data-cursor={ui.cursor.visit}
              >
                <PreviewImage
                  src={`https://api.microlink.io/?url=${encodeURIComponent(
                    project.url,
                  )}&screenshot=true&meta=false&embed=screenshot.url&viewport.width=1280&viewport.height=720`}
                  alt={`${project.name} preview`}
                />
              </a>
            </div>
            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="mono-label shrink-0 text-muted">
                {ui.caseStudy.livePreview}
              </span>
              <span
                className="mono-label min-w-0 truncate text-muted"
                title={project.url}
              >
                {project.url}
              </span>
            </div>
            <p className="mono-label mt-2 text-muted">
              {ui.caseStudy.previewNote}
            </p>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <Label accent>{ui.caseStudy.sections.outcome}</Label>
            <p className="statement mt-5 text-ink">{project.outcome}</p>

            <Label className="mt-10">{ui.caseStudy.sections.stack}</Label>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((item) => (
                <li key={item}>
                  <Tag>{item}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="sheet">
        <section
          aria-labelledby="problem-heading"
          className="grid grid-cols-12 gap-x-4 gap-y-6 border-t border-line py-12 md:py-16"
        >
          <SectionLabel id="problem-heading" number="01">
            {ui.caseStudy.sections.problem}
          </SectionLabel>
          <p className="col-span-12 max-w-3xl text-[clamp(1.05rem,1.8vw,1.4rem)] leading-[1.55] text-ink/90 md:col-span-9 md:col-start-4">
            {project.problem}
          </p>
        </section>

        <section
          aria-labelledby="approach-heading"
          className="grid grid-cols-12 gap-x-4 gap-y-6 border-t border-line py-12 md:py-16"
        >
          <SectionLabel id="approach-heading" number="02">
            {ui.caseStudy.sections.approach}
          </SectionLabel>
          <ol className="col-span-12 border-t border-line md:col-span-9 md:col-start-4">
            {project.approach.map((step, index) => (
              <li
                key={step}
                className="grid grid-cols-[2.25rem_1fr] gap-4 border-b border-line py-5 last:border-b-0"
              >
                <span className="mono-label pt-1 text-signal">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="max-w-2xl text-[0.8125rem] leading-[1.8] text-ink/80">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="architecture-heading"
          className="grid grid-cols-12 gap-x-4 gap-y-6 border-t border-line py-12 md:py-16"
        >
          <SectionLabel id="architecture-heading" number="03">
            {ui.caseStudy.sections.architecture}
          </SectionLabel>
          <div className="col-span-12 md:col-span-9 md:col-start-4">
            <ArchitectureDiagram
              architecture={project.architecture}
              index={project.index}
            />
          </div>
        </section>

        <section
          aria-labelledby="evidence-heading"
          className="grid grid-cols-12 gap-x-4 gap-y-6 border-t border-line py-12 md:py-16"
        >
          <SectionLabel id="evidence-heading" number="04">
            {ui.caseStudy.sections.outcome}
          </SectionLabel>
          <dl className="col-span-12 border-t border-line md:col-span-9 md:col-start-4">
            {project.outcomes.map((outcome) => (
              <div
                key={outcome.label}
                className="grid grid-cols-12 gap-x-4 gap-y-2 border-b border-line py-4"
              >
                <dt className="mono-label col-span-12 text-muted md:col-span-3">
                  {outcome.label}
                </dt>
                <dd className="col-span-12 text-[0.8125rem] leading-relaxed text-ink/90 md:col-span-9">
                  {outcome.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <div className="sheet">
        <div className="border-t border-line py-8 md:py-10">
          <div className="flex items-center justify-between gap-4">
            <Label>{ui.caseStudy.nextProject}</Label>
            <span className="mono-label text-muted">
              {ui.caseStudy.endOfFile}
            </span>
          </div>

          <Link
            href={`/work/${nextProject.slug}`}
            data-cursor={ui.cursor.view}
            className="group mt-6 grid grid-cols-12 items-end gap-x-4 gap-y-6"
          >
            <span className="col-span-10 md:col-span-9">
              <span className="block font-display text-[clamp(2rem,5.2vw,4.5rem)] uppercase leading-[0.9] tracking-[-0.035em] text-ink transition-colors group-hover:text-signal">
                {nextProject.name}
              </span>
              <span className="mono-label mt-3 block text-muted">
                {nextProject.category} / {nextProject.year}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="col-span-2 flex justify-end text-2xl text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-signal md:col-span-3"
            >
              ↗
            </span>
          </Link>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
    </article>
  );
}
