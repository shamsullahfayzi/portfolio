import type { Metadata, Viewport } from "next";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "@fontsource/ibm-plex-sans/700.css";
import "@fontsource/ibm-plex-sans-arabic/400.css";
import "@fontsource/ibm-plex-sans-arabic/500.css";
import "@fontsource/ibm-plex-sans-arabic/600.css";
import "@fontsource/ibm-plex-sans-arabic/700.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shamsullah Fayzi, full-stack engineer",
  description:
    "Full-stack engineer in Dubai building bilingual (Dari/English) hospital software with React, Next.js, NestJS and PostgreSQL.",
  openGraph: {
    title: "Shamsullah Fayzi, full-stack engineer",
    description: "Hospital software that works in two languages and keeps working offline.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f4f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1430" },
  ],
};

// Apply the saved language before first paint so Dari visitors never see an English flash.
const restoreLang = `try{var l=localStorage.getItem("sf-lang");if(l==="fa"){document.documentElement.lang="fa-AF";document.documentElement.dir="rtl"}}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: restoreLang }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
