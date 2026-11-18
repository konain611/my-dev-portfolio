import type { Metadata, Viewport } from "next";
import { CursorProvider } from "@/components/layout/CursorProvider";
import { Footer } from "@/components/layout/Footer";
import { GridOverlay } from "@/components/layout/GridOverlay";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SideRail } from "@/components/layout/SideRail";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ui } from "@/data/ui";
import { fontVariables } from "@/lib/fonts";
import { buildMetadata, personJsonLd } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = buildMetadata({
  canonical: false,
  robots: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#0A0A0B",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const jsonLd = JSON.stringify(personJsonLd()).replace(/</g, "\\u003c");

  return (
    <html lang="en" className={`${fontVariables} h-full`}>
      <body className="min-h-full bg-base font-sans text-ink antialiased">
        <a
          href="#main"
          className="mono-label fixed left-3 top-3 z-300 -translate-y-24 border border-signal bg-signal px-4 py-3 text-paper transition-transform focus:translate-y-0"
        >
          {ui.meta.skipToContent}
        </a>

        <SmoothScroll />
        <ScrollProgress />
        <PageTransition />
        <GridOverlay />

        <CursorProvider>
          <Header />
          <SideRail />

          <div className="relative z-10 pt-16 lg:pl-rail">
            <main id="main" tabIndex={-1} className="outline-none">
              {children}
            </main>
            <Footer />
          </div>

          <div className="grain" aria-hidden="true" />
        </CursorProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      </body>
    </html>
  );
}
