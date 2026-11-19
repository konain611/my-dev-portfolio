import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { Writing } from "@/components/sections/Writing";
import { profile } from "@/data/profile";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  image: {
    url: "/opengraph-image",
    alt: `${profile.displayName} — ${profile.role}`,
  },
});

export default function Home() {
  return (
    <>
      <Hero />
      {/* <Marquee /> */}
      <About />
      <Work />
      <Capabilities />
      <Experience />
      <Writing />
      <Contact />
    </>
  );
}
