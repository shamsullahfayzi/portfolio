"use client";

import { useEffect, useState } from "react";
import { COPY, LINKS } from "../../content/content";
import { useReducedMotion } from "../_lib/motion";

const dubaiTime = () =>
  new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Dubai" }).format(new Date());

export default function Contact() {
  const t = COPY.contact;
  const reduce = useReducedMotion();
  const [wordIdx, setWordIdx] = useState(0);
  const [clock, setClock] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setWordIdx((n) => (n + 1) % t.words.length), 2200);
    return () => clearInterval(id);
  }, [reduce, t.words.length]);

  // Set after mount so server and client markup match.
  useEffect(() => {
    setClock(dubaiTime());
    const id = setInterval(() => setClock(dubaiTime()), 15000);
    return () => clearInterval(id);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the mailto link is still right there */
    }
  };

  return (
    <section id="contact" className="contact" aria-labelledby="contact-title">
      <div className="wrap section">
        <h2 id="contact-title" className="ct-title">
          <span className="sr-only">
            {t.title} {t.words[0]}
          </span>
          <span aria-hidden="true">
            {t.title}{" "}
            <span className="ct-word">
              <span key={wordIdx} className="ct-word-in">
                {t.words[wordIdx]}
              </span>
            </span>
          </span>
        </h2>
        <p className="section-intro">{t.body}</p>

        <a className="ct-mail" href={`mailto:${LINKS.email}`}>
          {LINKS.email}
        </a>

        <p className="hero-cta">
          <button type="button" className="btn btn-accent" onClick={copy}>
            {copied ? t.copied : t.copy}
          </button>
          <a className="btn btn-light" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            {t.linkedin}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a className="btn btn-light" href={LINKS.github} target="_blank" rel="noopener noreferrer">
            {t.github}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
        <span className="sr-only" aria-live="polite">
          {copied ? t.copied : ""}
        </span>

        {clock && (
          <p className="ct-clock mono">
            <span aria-hidden="true" className="ct-dot" />
            {t.time} {clock}
          </p>
        )}
      </div>
    </section>
  );
}
