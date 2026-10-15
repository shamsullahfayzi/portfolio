"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { COPY, LINKS } from "../../content/content";
import { gsap, ScrollTrigger } from "../_lib/gsap";
import { useFinePointer, useReducedMotion } from "../_lib/motion";

/** Splits text into masked words of single-glyph spans. Hidden from screen readers; the h1 carries a sr-only copy. */
function Letters({ text }: { text: string }) {
  const words = text.split(" ");
  let n = 0;
  return (
    <>
      {words.map((word, i) => (
        <span key={i}>
          <span className="hw" aria-hidden="true">
            {[...word].map((ch, j) => (
              <span className="hl" key={j} style={{ ["--i" as string]: n++ }}>
                {ch}
              </span>
            ))}
          </span>
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}

// three.js loads only after first paint, so it never delays the headline.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const MAGNET_RADIUS = 230;
const MAGNET_PUSH = 46;

export default function Hero() {
  const t = COPY.hero;
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const [scene, setScene] = useState(false);
  const [ready, setReady] = useState(false); // 3D has drawn its first frame, so the still photo can step aside

  // Desktop with a mouse: load the particle portrait once the browser is idle. Phones keep the still photo, so the
  // three.js download and the particle build never compete with first paint on a slow CPU.
  useEffect(() => {
    if (!fine) return;
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(() => setScene(true), { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setScene(true), 600);
    return () => window.clearTimeout(id);
  }, [fine]);

  // The entrance itself is pure CSS (see globals.css) so the name paints without waiting for JS.
  // JS only removes the clip mask once the letters have landed, then drives the scroll exit. Transform only.
  useEffect(() => {
    const el = root.current;
    if (!el || reduce) return;

    const unmask = window.setTimeout(() => el.classList.add("is-live"), 1900);
    const ctx = gsap.context(() => {
      gsap.to(".hero-name", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
      });
    }, el);

    return () => {
      window.clearTimeout(unmask);
      ctx.revert();
    };
  }, [reduce]);

  // Magnetic letters: they shy away from the cursor. Mouse only.
  useEffect(() => {
    const el = root.current;
    if (!el || reduce || !fine) return;

    const letters = Array.from(el.querySelectorAll<HTMLElement>(".hl"));
    const move = letters.map((l) => ({
      x: gsap.quickTo(l, "x", { duration: 0.7, ease: "elastic.out(1, 0.4)" }),
      y: gsap.quickTo(l, "y", { duration: 0.7, ease: "elastic.out(1, 0.4)" }),
    }));

    let frame = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = 0;
      letters.forEach((l, i) => {
        const r = l.getBoundingClientRect();
        // Remove the current offset so the centre we measure is the letter's resting position.
        const cx = r.left + r.width / 2 - Number(gsap.getProperty(l, "x"));
        const cy = r.top + r.height / 2 - Number(gsap.getProperty(l, "y"));
        const dx = cx - px;
        const dy = cy - py;
        const d = Math.hypot(dx, dy) || 1;
        const k = d < MAGNET_RADIUS ? (1 - d / MAGNET_RADIUS) ** 2 * MAGNET_PUSH : 0;
        move[i].x((dx / d) * k);
        move[i].y((dy / d) * k);
      });
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => move.forEach((m) => (m.x(0), m.y(0)));

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
      gsap.set(letters, { clearProps: "x,y" });
    };
  }, [reduce, fine]);

  // Layout above the fold shifts nothing after fonts load, but refresh triggers once everything is ready.
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => window.removeEventListener("load", refresh);
  }, []);

  return (
    <section ref={root} className="hero wrap" aria-labelledby="hero-name">
      <p className="kicker mono" data-in>
        {t.kicker}
      </p>
      <h1 id="hero-name" className="hero-name">
        <span className="sr-only">{t.name}</span>
        <Letters text={t.name} />
      </h1>

      <div className="hero-foot">
        <div>
          <p className="hero-line" data-in>
            {t.line}
          </p>
          <p className="hero-cta" data-in>
            <a className="btn btn-solid" href="#work">
              {t.seeWork}
            </a>
            {LINKS.cv && (
              <a className="btn" href={LINKS.cv}>
                {t.cv}
              </a>
            )}
          </p>
        </div>

        <div className={`hero-visual${ready ? " is-3d" : ""}`} data-in>
          <figure className="polaroid">
            {LINKS.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={LINKS.photo} alt="Shamsullah Fayzi smiling, arms crossed, standing in front of a blue lake" width={220} height={275} fetchPriority="high" />
            ) : (
              <div className="polaroid-ph" role="img" aria-label={COPY.placeholder.photo}>
                <span className="mono">PLACEHOLDER</span>
                <span>{COPY.placeholder.photo}</span>
              </div>
            )}
          </figure>
          {/* Decorative: the still photo above is the accessible version of this scene. */}
          <span className="hero-portrait-frame" aria-hidden="true" />
          <div className="hero-3d" aria-hidden="true">
            {scene && !reduce && <HeroScene photo={LINKS.photo} fine={fine} reduce={reduce} onReady={() => setReady(true)} />}
          </div>
        </div>
      </div>

      <a className="scroll-cue mono" href="#work" data-in>
        {t.scroll}
        <span aria-hidden="true" />
      </a>
    </section>
  );
}
