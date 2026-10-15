"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import "./sections.css";
import { COPY, SKILL_USE } from "../../content/content";
import { gsap } from "../_lib/gsap";
import { useReducedMotion } from "../_lib/motion";

/** Skills as a map, not a logo wall: pick one and see which projects used it and which skills travelled with it. */
export default function Skills() {
  const t = COPY.skills;
  const root = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [sel, setSel] = useState("PostgreSQL");
  // Each row remembers its last skill so it can collapse smoothly instead of emptying first.
  const [mem, setMem] = useState<Record<string, string>>({ data: "PostgreSQL" });

  const projectsOf = (skill: string) => (SKILL_USE[skill] ?? []).flatMap((u) => (u.project ? [u.project] : []));

  const together = useMemo(() => {
    const mine = new Set(projectsOf(sel));
    const out = new Set<string>();
    if (!mine.size) return out;
    for (const [skill, uses] of Object.entries(SKILL_USE)) {
      if (skill !== sel && uses.some((u) => u.project && mine.has(u.project))) out.add(skill);
    }
    return out;
  }, [sel]);

  const groupOf = (skill: string) => t.groups.find((g) => g.items.includes(skill))?.id;

  const pick = (skill: string, groupId: string) => {
    setSel((cur) => (cur === skill ? "" : skill));
    setMem((m) => ({ ...m, [groupId]: skill }));
  };

  // Rows rise in as they scroll into view. IntersectionObserver so a jump anywhere on the page still reveals them.
  useEffect(() => {
    const el = root.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).map((e) => e.target);
        if (!hit.length) return;
        hit.forEach((n) => io.unobserve(n));
        gsap.fromTo(hit, { y: 30, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8, stagger: 0.07, ease: "power3.out", overwrite: true });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    el.querySelectorAll("[data-reveal]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [reduce]);

  return (
    <section ref={root} id="skills" className="wrap section sk" aria-labelledby="skills-title">
      <h2 id="skills-title" className="section-title" data-reveal>
        {t.title}
      </h2>
      <p className="section-intro" data-reveal>
        {t.intro}
      </p>

      <div className="sk-list">
        {t.groups.map((g) => {
          const open = groupOf(sel) === g.id;
          const shown = mem[g.id];
          const uses = shown ? (SKILL_USE[shown] ?? []) : [];
          const partners = shown && shown === sel ? [...together] : [];
          return (
            <div key={g.id} className="sk-row" data-open={open || undefined} data-reveal>
              <div className="sk-head">
                <h3>{g.name}</h3>
                <p>{g.blurb}</p>
                <span className="mono" aria-hidden="true">
                  {String(g.items.length).padStart(2, "0")}
                </span>
              </div>

              <ul className="sk-pills" aria-label={g.name}>
                {g.items.map((item) => (
                  <li key={item}>
                    <button type="button" aria-pressed={item === sel} data-together={together.has(item) || undefined} onClick={() => pick(item, g.id)}>
                      {item}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="sk-detail" aria-live="polite">
                <div>
                  {shown && (
                    <div className="sk-card">
                      <p className="mono">
                        {shown} · {t.usedIn}
                      </p>
                      {uses.length === 0 ? (
                        <p className="sk-none">{t.none}</p>
                      ) : (
                        <ul className="sk-uses">
                          {uses.map((u) => (
                            <li key={u.project ?? u.note}>
                              {u.project ? (
                                <a href={`#n-${u.project}`}>
                                  {COPY.work.projects[u.project].name}
                                  <span aria-hidden="true"> →</span>
                                </a>
                              ) : (
                                <span>{u.note}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                      {partners.length > 0 && (
                        <p className="sk-with">
                          <span className="mono">{t.together}</span> {partners.join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
