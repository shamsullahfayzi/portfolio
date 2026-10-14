"use client";

import { useEffect, useState } from "react";
import { COPY, LINKS, type Lang } from "../content/content";

const STORAGE_KEY = "sf-lang";
const HTML_LANG: Record<Lang, string> = { en: "en", fa: "fa-AF" };
const DIR: Record<Lang, "ltr" | "rtl"> = { en: "ltr", fa: "rtl" };

function readSavedLang(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === "fa" ? "fa" : "en";
  } catch {
    return "en";
  }
}

export default function Site() {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => setLang(readSavedLang()), []);

  // Keep <html lang/dir> in sync so the browser, screen readers and CSS all mirror together.
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    document.documentElement.dir = DIR[lang];
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* private mode: the choice just isn't remembered */
    }
  }, [lang]);

  const toggle = () => {
    const next: Lang = lang === "en" ? "fa" : "en";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition && !reduce) {
      document.documentElement.dataset.flip = next; // tells the CSS which way to slide
      doc.startViewTransition(() => setLang(next));
    } else {
      setLang(next);
    }
  };

  const t = COPY[lang];
  const other: Lang = lang === "en" ? "fa" : "en";
  const echo = COPY[other];

  return (
    <>
      <a className="skip" href="#work">
        {t.hero.seeWork}
      </a>

      <header className="bar">
        <a className="mark" href="#top">
          <span lang="en">SF</span>
          <span className="sr-only"> Shamsullah Fayzi</span>
        </a>
        <nav aria-label={t.nav.work}>
          <a href="#work">{t.nav.work}</a>
          <a href="#experience">{t.nav.experience}</a>
          <a href="#contact">{t.nav.contact}</a>
        </nav>
        <button
          type="button"
          className="toggle"
          onClick={toggle}
        >
          <span lang={HTML_LANG[other]}>{echo.langName}</span>
          <span className="sr-only">: {t.switchLabel}</span>
        </button>
      </header>

      <main id="top">
        {/* ── Hero: both languages at once; the toggle decides which one leads ── */}
        <section className="hero">
          <div className="hero-lead">
            <h1>{t.hero.title}</h1>
            <p className="intro">{t.hero.intro}</p>
            <div className="actions">
              <a className="btn primary" href="#work">
                {t.hero.seeWork}
              </a>
              {LINKS.cv && (
                <a className="btn" href={LINKS.cv} download>
                  {t.hero.cv}
                </a>
              )}
              <a className="btn" href={LINKS.github}>
                {t.hero.github}
              </a>
            </div>
          </div>
          <p className="hero-echo" lang={HTML_LANG[other]} dir={DIR[other]} aria-hidden="true">
            {echo.hero.title}
          </p>
        </section>

        {/* ── REDMARS ── */}
        <section id="work" className="feature" aria-labelledby="redmars-title">
          <div className="feature-head">
            <h2 id="redmars-title">{t.redmars.name}</h2>
            <p className="lede">{t.redmars.lede}</p>
          </div>

          <h3 className="flow-title">{t.redmars.flowTitle}</h3>
          <ol className="flow">
            {t.redmars.flow.map((s) => (
              <li key={s.step}>
                <span className="flow-step">{s.step}</span>
                <span className="flow-detail">{s.detail}</span>
              </li>
            ))}
          </ol>

          <dl className="facts">
            {t.redmars.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>

          <div className="feature-body">
            <h3>{t.redmars.detailsTitle}</h3>
            <ul className="details">
              {t.redmars.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <p className="status">{t.redmars.status}</p>
            {LINKS.redmars && (
              <a className="btn" href={LINKS.redmars}>
                {t.redmars.code}
              </a>
            )}
          </div>
        </section>

        {/* ── Other projects ── */}
        <section className="more" aria-labelledby="more-title">
          <h2 id="more-title">{t.more.title}</h2>
          <ul className="projects">
            {t.more.projects.map((p) => (
              <li key={p.code} className="project">
                <h3>{p.name}</h3>
                <p className="what">{p.what}</p>
                <p className="stack" lang="en" dir="ltr">
                  {p.stack.replaceAll("،", ",")}
                </p>
                <p className="links">
                  {p.live && <a href={p.live}>{t.more.live}</a>}
                  <a href={p.code}>{t.more.code}</a>
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="experience" aria-labelledby="exp-title">
          <h2 id="exp-title">{t.experience.title}</h2>
          <ol className="timeline">
            {t.experience.jobs.map((j) => (
              <li key={j.org}>
                <h3>{j.org}</h3>
                <p className="role">
                  {j.role}
                  <span className="place">{j.place}</span>
                </p>
                {j.note && <p className="note">{j.note}</p>}
              </li>
            ))}
          </ol>
          <h3 className="tools-title">{t.experience.toolsTitle}</h3>
          <p className="tools" lang="en" dir="ltr">
            {t.experience.tools.replaceAll("،", ",")}
          </p>
        </section>

        {/* ── Contact ── */}
        <section id="contact" className="contact" aria-labelledby="contact-title">
          <h2 id="contact-title">{t.contact.title}</h2>
          <p>{t.contact.body}</p>
          <div className="actions">
            {LINKS.email && (
              <a className="btn primary" href={`mailto:${LINKS.email}`}>
                {t.contact.email}
              </a>
            )}
            {LINKS.linkedin && (
              <a className="btn" href={LINKS.linkedin}>
                {t.contact.linkedin}
              </a>
            )}
            <a className="btn" href={LINKS.github}>
              {t.contact.github}
            </a>
          </div>
        </section>
      </main>

      <footer className="foot">
        <p>{t.footer}</p>
      </footer>
    </>
  );
}
