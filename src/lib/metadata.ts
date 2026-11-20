import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import {
  OG_CONTENT_TYPE,
  OG_SIZE,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from "./constants";

interface MetadataImage {
  url: string;
  alt: string;
}

interface MetadataInput {
  title?: string;
  description?: string;
  path?: string;
  noIndex?: boolean;
  image?: MetadataImage;
  canonical?: boolean;
  robots?: boolean;
}

const defaultDescription = `${profile.role} in ${profile.location.city}, ${profile.location.country}. ${profile.summary}`;

export function buildMetadata({
  title,
  description = defaultDescription,
  path = "/",
  noIndex = false,
  image,
  canonical: includeCanonical = true,
  robots: includeRobots = true,
}: MetadataInput = {}): Metadata {
  const canonical = `${SITE_URL}${path === "/" ? "" : path}`;
  const resolvedTitle = title
    ? `${title} — ${SITE_NAME}`
    : `${profile.displayName} — ${profile.role}`;
  const images = image
    ? [{ ...image, ...OG_SIZE, type: OG_CONTENT_TYPE }]
    : undefined;

  return {
    metadataBase: new URL(SITE_URL),
    title: resolvedTitle,
    description,
    alternates: includeCanonical ? { canonical } : undefined,
    authors: [{ name: profile.name, url: SITE_URL }],
    creator: profile.name,
    publisher: profile.name,
    category: "technology",
    keywords: [
      profile.role,
      "full-stack engineer",
      "Next.js developer",
      "AI agents",
      "RAG",
      "MCP",
      profile.location.city,
    ],
    formatDetection: { email: false, address: false, telephone: false },
    robots: includeRobots
      ? noIndex
        ? { index: false, follow: false }
        : { index: true, follow: true, googleBot: { index: true, follow: true } }
      : undefined,
    openGraph: {
      type: "website",
      locale: SITE_LOCALE,
      url: canonical,
      siteName: SITE_NAME,
      title: resolvedTitle,
      description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      creator: "@syedkonain_7",
      images,
    },
  };
}

interface PersonJsonLd {
  "@context": "https://schema.org";
  "@type": "Person";
  name: string;
  alternateName: string;
  jobTitle: string;
  description: string;
  email: string;
  url: string;
  address: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressCountry: string;
  };
  knowsAbout: string[];
  sameAs: string[];
}

export function personJsonLd(): PersonJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: profile.displayName,
    jobTitle: profile.role,
    description: profile.summary,
    email: `mailto:${profile.email}`,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.location.city,
      addressCountry: profile.location.country,
    },
    knowsAbout: [
      "Next.js",
      "TypeScript",
      "React",
      "Node.js",
      "PostgreSQL",
      "Prisma",
      "AI agents",
      "Retrieval augmented generation",
      "Model Context Protocol",
    ],
    sameAs: socials
      .filter((social) => social.id !== "email")
      .map((social) => social.href),
  };
}
