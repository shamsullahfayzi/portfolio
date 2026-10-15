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
import { COPY } from "../content/content";

export const metadata: Metadata = {
  title: COPY.meta.title,
  description: COPY.meta.description,
  openGraph: { title: COPY.meta.title, description: COPY.meta.description, type: "website" },
};

export const viewport: Viewport = { themeColor: "#f3eee4" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
