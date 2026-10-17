import { COPY } from "../content/content";
import { SmoothScroll } from "./_lib/motion";
import Hero from "./_components/Hero";
import Marquee from "./_components/Marquee";
import Work from "./_components/Work";
import Skills from "./_components/Skills";
import Process from "./_components/Process";
import Contact from "./_components/Contact";
import Cursor from "./_components/Cursor";

export default function Site() {
  const t = COPY;
  return (
    <>
      <SmoothScroll />
      <Cursor />
      <a className="skip" href="#work">
        {t.hero.seeWork}
      </a>

      <header className="bar">
        <a className="mark" href="#top" aria-label="SF, Shamsullah Fayzi, back to top">
          SF
        </a>
        <nav aria-label="Sections">
          <a href="#work">{t.nav.work}</a>
          <a href="#skills">{t.nav.skills}</a>
          <a href="#process">{t.nav.process}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
      </header>

      <main id="top">
        <Hero />
        <Marquee />

        <Work />

        <Skills />
        <Process />
        <Contact />
      </main>

      <footer className="foot wrap">{t.footer}</footer>
    </>
  );
}
