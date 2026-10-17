import type { Metadata, Viewport } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/700.css";
import "@fontsource/inter/800.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "lenis/dist/lenis.css";
import "./globals.css";
import { COPY, LINKS } from "../content/content";

const SITE = "https://shamsullahfayzi.dev";
const OG = { url: "/og.png", width: 1200, height: 630, alt: "Shamsullah Fayzi, full-stack software engineer" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: COPY.meta.title,
  description: COPY.meta.description,
  applicationName: "Shamsullah Fayzi",
  authors: [{ name: "Shamsullah Fayzi", url: SITE }],
  creator: "Shamsullah Fayzi",
  keywords: ["Shamsullah Fayzi", "full-stack developer", "software engineer", "React", "Next.js", "NestJS", "PostgreSQL", "Three.js", "portfolio"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Shamsullah Fayzi",
    locale: "en_US",
    title: COPY.meta.title,
    description: COPY.meta.description,
    images: [OG],
  },
  twitter: {
    card: "summary_large_image",
    title: COPY.meta.title,
    description: COPY.meta.description,
    images: [OG.url],
  },
};

export const viewport: Viewport = { themeColor: "#f3eee4" };

// Structured data so search engines know who this site is about.
const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Shamsullah Fayzi",
  url: SITE,
  jobTitle: "Full-stack software engineer",
  email: `mailto:${LINKS.email}`,
  image: `${SITE}/me.jpg`,
  sameAs: [LINKS.github, LINKS.linkedin],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Kardan University" },
  knowsAbout: ["TypeScript", "React", "Next.js", "NestJS", "PostgreSQL", "Python", "C#", "Three.js"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      </body>
    </html>
  );
}
