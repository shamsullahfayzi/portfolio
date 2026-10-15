"use client";

import { useEffect, useRef } from "react";
import { COPY } from "../../content/content";
import { gsap, ScrollTrigger } from "../_lib/gsap";
import { useReducedMotion } from "../_lib/motion";

/** Timeline whose rail draws itself as you scroll; each stop lights up when it arrives. */
export default function Experience() {
  const t = COPY.experience;
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
    <section ref={root} id="experience" className="wrap section" aria-labelledby="exp-title">
      <h2 id="exp-title" className="section-title">
        {t.title}
      </h2>

      <ol className="tl">
        <span className="tl-line" aria-hidden="true" />
        {t.jobs.map((j) => (
          <li key={j.org} className="tl-item">
            <p className="tl-date mono">{j.dates}</p>
            <span className="tl-node" aria-hidden="true" />
            <div className="tl-card">
              <h3>{j.org}</h3>
              <p className="tl-role">
                {j.role}
                {j.place ? ` · ${j.place}` : ""}
              </p>
              {j.points.length > 0 && (
                <ul>
                  {j.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
