import type { Metadata } from "next";
import NotFoundScene from "./_components/NotFoundScene";
import "./_components/notfound.css";

export const metadata: Metadata = {
  title: "404 · Page not found",
  description: "This page does not exist. Head back to Shamsullah Fayzi's portfolio.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundScene />;
}
