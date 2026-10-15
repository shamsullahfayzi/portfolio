"use client";

import { useEffect, useRef, useState } from "react";
import "./room.css";
import { COPY, FEATURED } from "../../content/content";
import { gsap, ScrollTrigger } from "../_lib/gsap";
import { DEMOS } from "./demos";
import ProjectBody from "./ProjectBody";

const S = 1400; // distance between frames along the corridor (px)
const W = 1800; // corridor width
const H = 1100; // corridor height
const DWELL = 0.9; // scroll units spent standing at a project (1 unit = half a screen of scrolling)
const N = FEATURED.length;
const D = (N + 2) * S; // corridor length
const SCROLL_PER_UNIT = 0.5; // screens of scroll per unit

/**
 * The selected work as a room you walk through. A pinned stage holds a CSS-3D corridor; scrolling moves the camera
 * forward: a door in, one frame per project (real DOM, so every demo stays interactive), then a door out.
 * Frame 0 = entrance door, frames 1..N = projects, frame N+1 = exit door.
 */
export default function Room({ onList }: { onList: () => void }) {
  const t = COPY.work;
  const stage = useRef<HTMLDivElement>(null);
  const world = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const marks = useRef<number[]>([]); // scroll offset of each frame
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const el = stage.current;
    const w = world.current;
    if (!el || !w) return;

    const frames = Array.from(w.querySelectorAll<HTMLElement>("[data-frame]"));
    const cards = Array.from(w.querySelectorAll<HTMLElement>(".room-card"));
    const cam = { z: 0 };
    let last = -1;

    const apply = () => {
      // A little walking sway so it feels like movement, not a slideshow.
      w.style.transform = `translate3d(0, ${Math.sin(cam.z / 260) * 5}px, ${cam.z}px) rotateZ(${Math.sin(cam.z / 520) * 0.18}deg)`;

      let best = 0;
      let bestDist = Infinity;
      frames.forEach((f, idx) => {
        const dep = cam.z - idx * S; // >0 passed the focal plane (flying past), <0 still ahead
        let o = 1;
        if (dep > 120) o = 1 - Math.min(1, (dep - 120) / 460);
        else if (dep < -S * 0.55) o = 1 - Math.min(1, (-dep - S * 0.55) / (S * 0.6));
        f.style.opacity = o.toFixed(3);
        f.style.visibility = o <= 0.01 ? "hidden" : "visible";
        const d = Math.abs(dep);
        if (d < bestDist) {
          bestDist = d;
          best = idx;
        }
      });
      // Only the frame you are standing at can be focused or clicked.
      frames.forEach((f, idx) => {
        f.inert = !(idx === best && bestDist < S * 0.3);
      });
      if (best !== last) {
        last = best;
        setCur(best);
      }
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, cam.z / ((N + 1) * S))})`;
    };

    // Shrink a frame if its content is taller or wider than the screen, so nothing is cut off.
    const fit = () => {
      cards.forEach((c) => {
        c.style.setProperty("--fit", "1");
        const h = c.offsetHeight;
        const wd = c.offsetWidth;
        const k = Math.min(1, (window.innerHeight - 210) / h, (window.innerWidth * 0.94) / wd);
        c.style.setProperty("--fit", k.toFixed(3));
      });
    };
    fit();
    const ro = new ResizeObserver(fit);
    cards.forEach((c) => ro.observe(c));
    window.addEventListener("resize", fit);

    // Mouse parallax: the vanishing point drifts toward the cursor.
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      el.style.perspectiveOrigin = `${50 + x * 4}% ${50 + y * 3}%`;
    };
    el.addEventListener("pointermove", onMove);

    const ctx = gsap.context(() => {
      const total = 0.5 + N * (1 + DWELL) + 1.2;
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${Math.round(window.innerHeight * SCROLL_PER_UNIT * total)}`,
          pin: true,
          scrub: 0.7,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
        onUpdate: apply,
      });

      tl.addLabel("f0").to({}, { duration: 0.5 }); // door lingers so the intro can be read
      for (let i = 0; i < N; i++) {
        tl.to(cam, { z: (i + 1) * S, duration: 1, ease: "power2.inOut" }).addLabel(`f${i + 1}`).to({}, { duration: DWELL });
      }
      tl.to(cam, { z: (N + 1) * S, duration: 1, ease: "power2.inOut" }).addLabel(`f${N + 1}`).to({}, { duration: 0.2 });

      const st = tl.scrollTrigger!;
      const mark = () => {
        marks.current = Array.from({ length: N + 2 }, (_, i) => st.start + ((tl.labels[`f${i}`] ?? 0) / tl.duration()) * (st.end - st.start));
      };
      mark();
      ScrollTrigger.addEventListener("refresh", mark);
      apply();
    }, el);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", fit);
      el.removeEventListener("pointermove", onMove);
      ro.disconnect();
      ctx.revert();
    };
  }, []);

  const goTo = (idx: number) => {
    const y = marks.current[idx];
    if (y !== undefined) window.scrollTo({ top: y + 2, behavior: "smooth" });
  };

  const projectName = cur >= 1 && cur <= N ? t.projects[FEATURED[cur - 1]].name : cur === 0 ? t.title : "Out";

  // One root element: ScrollTrigger wraps the pinned stage in a spacer, so React must only ever remove this wrapper,
  // never the stage itself, or unmounting (e.g. "List view") throws.
  return (
    <div className="room-root">
      <a className="room-skip" href="#skills">
        Skip the 3D room
      </a>

      <div ref={stage} className="room-stage">
        <div ref={world} className="room-world">
          {/* corridor shell */}
          <div className="rw rw-wall rw-left" aria-hidden="true" />
          <div className="rw rw-wall rw-right" aria-hidden="true" />
          <div className="rw rw-floor" aria-hidden="true" />
          <div className="rw rw-ceiling" aria-hidden="true" />

          {/* 0: entrance door */}
          <div className="room-frame" data-frame style={{ transform: "translate3d(-50%, -50%, 0)" }}>
            <div className="room-door">
              <div className="room-door-in">
                <h2 id="work-title" className="section-title">
                  {t.title}
                </h2>
                <p className="section-intro">{t.intro}</p>
                <p className="room-cue mono">
                  Step inside <span aria-hidden="true">↓ scroll</span>
                </p>
              </div>
            </div>
          </div>

          {/* 1..N: one frame per project */}
          {FEATURED.map((id, i) => {
            const Demo = DEMOS[id];
            const near = Math.abs(cur - (i + 1)) <= 1; // mount demos only for the frames next to you
            return (
              <div key={id} className="room-frame" data-frame style={{ transform: `translate3d(-50%, -50%, ${-(i + 1) * S}px)` }}>
                <article className="room-card" data-theme={id} aria-labelledby={`n-${id}`}>
                  <p className="proj-index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <ProjectBody
                    id={id}
                    reveal={false}
                    wrap={false}
                    headingId={`n-${id}`}
                    demo={Demo && near ? <Demo /> : <div className="demo demo-skeleton" aria-hidden="true" />}
                  />
                </article>
              </div>
            );
          })}

          {/* N+1: exit door */}
          <div className="room-frame" data-frame style={{ transform: `translate3d(-50%, -50%, ${-(N + 1) * S}px)` }}>
            <div className="room-door room-exit">
              <div className="room-door-in">
                <p className="mono">That's the room</p>
                <p className="room-exit-title">Out you go.</p>
                <p className="room-cue mono">
                  Next: {t.more} <span aria-hidden="true">↓</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* HUD */}
        <div className="room-hud">
          <p className="room-count mono" aria-live="polite">
            {cur >= 1 && cur <= N ? `${String(cur).padStart(2, "0")} / ${String(N).padStart(2, "0")} · ` : ""}
            {projectName}
          </p>
          <nav className="room-dots" aria-label="Jump to a project">
            {FEATURED.map((id, i) => (
              <button key={id} type="button" aria-label={t.projects[id].name} aria-current={cur === i + 1 ? "true" : undefined} onClick={() => goTo(i + 1)}>
                <span />
              </button>
            ))}
          </nav>
          <button type="button" className="room-list mono" onClick={onList}>
            List view
          </button>
          <span ref={bar} className="room-bar" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
