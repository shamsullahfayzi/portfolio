"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import "./work.css";
import "./minor.css";
import { COPY, FEATURED, MINOR, PROJECT_LINKS } from "../../content/content";
import { gsap, ScrollTrigger } from "../_lib/gsap";
import { LazyMount, useReducedMotion, useRoomCapable } from "../_lib/motion";
import { DEMOS } from "./demos";
import ProjectBody, { ExternalLink } from "./ProjectBody";
// The 3D room is opt-in, so its code is only fetched when someone enters it.
const Room = dynamic(() => import("./Room"), { ssr: false });

export default function Work() {
  const t = COPY.work;
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const capable = useRoomCapable();
  const [mode3d, setMode3d] = useState(false); // the plain list is the default; the 3D room is opt-in
  const room = capable && !reduce && mode3d;
  const can3d = capable && !reduce;
  const first = useRef(true);

  // Keep the section in view when switching modes (the layout changes height under the visitor).
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    root.current?.scrollIntoView({ block: "start" });
  }, [room]);

  // List mode: scroll reveal for copy + demos, and a slow parallax on the giant index numbers. Transform/opacity only.
  useEffect(() => {
    const el = root.current;
    if (!el || reduce || room) return;

    // IntersectionObserver, not ScrollTrigger: it also fires for elements already on screen,
    // so jumping straight to a project never leaves content hidden.
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).map((e) => e.target);
        if (!hit.length) return;
        hit.forEach((n) => io.unobserve(n));
        gsap.fromTo(hit, { y: 36, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: "power3.out", overwrite: true });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    el.querySelectorAll("[data-reveal]").forEach((n) => io.observe(n));

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".proj").forEach((proj) => {
        const idx = proj.querySelector(".proj-index");
        if (!idx) return;
        gsap.fromTo(idx, { yPercent: 25 }, { yPercent: -35, ease: "none", scrollTrigger: { trigger: proj, start: "top bottom", end: "bottom top", scrub: true } });
      });
    }, el);

    // Demos change heights as they mount; keep scroll-linked positions honest.
    let timer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    ro.observe(el);

    return () => {
      io.disconnect();
      ro.disconnect();
      window.clearTimeout(timer);
      ctx.revert();
    };
  }, [reduce, room]);

  return (
    <section ref={root} id="work" aria-labelledby="work-title">
      {room ? (
        <Room onList={() => setMode3d(false)} />
      ) : (
        <>
          <div className="wrap work-head">
            <h2 id="work-title" className="section-title" data-reveal>
              {t.title}
            </h2>
            <p className="section-intro" data-reveal>
              {t.intro}
            </p>
            {can3d && (
              <p className="work-mode">
                <button type="button" className="btn" onClick={() => setMode3d(true)}>
                  {t.enter3d}
                </button>
              </p>
            )}
          </div>

          {FEATURED.map((id, n) => {
            const Demo = DEMOS[id];
            return (
              <article key={id} className="proj" data-theme={id} aria-labelledby={`n-${id}`}>
                <p className="proj-index" aria-hidden="true">
                  {String(n + 1).padStart(2, "0")}
                </p>
                <ProjectBody
                  id={id}
                  reveal
                  wrap
                  headingId={`n-${id}`}
                  demo={
                    Demo ? (
                      <LazyMount fallback={<div className="demo demo-skeleton" aria-hidden="true" />}>
                        <Demo />
                      </LazyMount>
                    ) : null
                  }
                />
              </article>
            );
          })}
        </>
      )}

      <div className="wrap minor">
        <h3 className="mono" data-reveal={!room || undefined}>
          {t.more}
        </h3>
        <ul>
          {MINOR.map((id) => {
            const p = t.projects[id];
            const repo = PROJECT_LINKS[id];
            const Demo = DEMOS[id];
            return (
              <li key={id} data-reveal={!room || undefined}>
                <p className="mono">{p.kind}</p>
                <p className="minor-name">{p.name}</p>
                <p>{p.pitch}</p>
                <p className="chips-inline mono">{p.stack.join(" · ")}</p>
                {repo ? <ExternalLink href={repo}>{t.code}</ExternalLink> : p.note && <p className="mono">{p.note}</p>}
                {Demo && (
                  <div className="minor-demo">
                    <LazyMount fallback={<div className="demo demo-skeleton" aria-hidden="true" />}>
                      <Demo />
                    </LazyMount>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
