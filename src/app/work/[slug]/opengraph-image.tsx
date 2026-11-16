import { notFound } from "next/navigation";
import { getProject } from "@/data/projects";
import { createOgImage, OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og";

export const alt = "Konain Nasir — engineering case study";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return createOgImage(project);
}
