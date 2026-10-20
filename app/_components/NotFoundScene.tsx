"use client";

import { useEffect, useRef, useState } from "react";

const ROUTES = [
  { href: "/", label: "Home", note: "Start over" },
  { href: "/#work", label: "Selected work", note: "Ten projects, most with a live demo" },
  { href: "/#process", label: "How I work", note: "From first conversation to deployment" },
  { href: "/#contact", label: "Contact", note: "hello@shamsullahfayzi.dev" },
];

export default function NotFoundScene() {
  const stage = useRef<HTMLDivElement>(null);
  const [path, setPath] = useState("/…");

  useEffect(() => {
    setPath(window.location.pathname + window.location.search);
    const el = stage.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // The portrait inside the zero looks toward the cursor and the digits tilt a touch. Eased on rAF, no layout work.
    let tx = 0, ty = 0, x = 0, y = 0, raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      ty = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
    };
    const tick = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--mx", x.toFixed(3));
      el.style.setProperty("--my", y.toFixed(3));
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="nf" id="main">
      <header className="nf-top wrap">
        <a href="/" className="nf-brand" aria-label="Shamsullah Fayzi, home">SF</a>
        <span className="mono nf-code">Error 404</span>
      </header>

      <div className="nf-stage wrap" ref={stage}>
        <h1 className="nf-digits" aria-label="404">
          <span aria-hidden className="nf-d nf-d1">4</span>
          <span aria-hidden className="nf-zero">
            <img src="/portrait.png" alt="" width={512} height={512} decoding="async" />
          </span>
          <span aria-hidden className="nf-d nf-d2">4</span>
        </h1>
        <p className="nf-line">
          <strong>Wrong turn.</strong> That page doesn’t exist, or it moved while I wasn’t looking.
        </p>
        <p className="nf-req mono" role="status">
          <span className="nf-get">GET</span> <span className="nf-path">{path}</span> <span>→</span> <span className="nf-status">404</span>
        </p>
      </div>

      <nav className="nf-routes wrap" aria-label="Where to go next">
        <p className="mono nf-eyebrow">Try one of these</p>
        <ul>
          {ROUTES.map((r, i) => (
            <li key={r.href}>
              <a href={r.href}>
                <span className="mono nf-n">0{i + 1}</span>
                <span className="nf-l">{r.label}</span>
                <span className="nf-note">{r.note}</span>
                <span aria-hidden className="nf-go">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="nf-ribbon" aria-hidden>
        <div>
          {Array.from({ length: 12 }, (_, i) => (
            <span key={i}>Not found ✕ Page missing ✕ </span>
          ))}
        </div>
      </div>
    </main>
  );
}
