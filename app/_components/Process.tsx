"use client";

import { useEffect, useRef } from "react";
import { COPY } from "../../content/content";
import { gsap, ScrollTrigger } from "../_lib/gsap";
import { useReducedMotion } from "../_lib/motion";

/** How I work: a rail that draws itself as you scroll; each step lights up when it arrives. */
export default function Process() {
  const t = COPY.process;
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el || reduce) return;

    // Only hide things once JS is ready to reveal them; without JS or with reduced motion all stops stay visible.
    el.classList.add("tl-anim");
    const items = Array.from(el.querySelectorAll<HTMLElement>(".tl-item"));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    items.forEach((i) => io.observe(i));

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".tl-line",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".tl", start: "top 65%", end: "bottom 70%", scrub: 0.5 } },
      );
    }, el);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      io.disconnect();
      ctx.revert();
      el.classList.remove("tl-anim");
    };
  }, [reduce]);

  return (
    <section ref={root} id="process" className="wrap section" aria-labelledby="process-title">
      <h2 id="process-title" className="section-title">
        {t.title}
      </h2>
      <p className="section-intro">{t.intro}</p>

      <ol className="tl">
        <span className="tl-line" aria-hidden="true" />
        {t.steps.map((s) => (
          <li key={s.label} className="tl-item">
            <p className="tl-date tl-step mono">{s.label}</p>
            <span className="tl-node" aria-hidden="true" />
            <div className="tl-card">
              <h3>{s.title}</h3>
              <p className="tl-text">{s.text}</p>
              <p className="tl-proof">
                <span className="mono">{t.proofLabel}</span>
                {s.proof.map((id) => (
                  <a key={id} href={`#n-${id}`}>
                    {COPY.work.projects[id].name}
                    <span aria-hidden="true"> →</span>
                  </a>
                ))}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="tl-studying mono">{t.studying}</p>
    </section>
  );
}
