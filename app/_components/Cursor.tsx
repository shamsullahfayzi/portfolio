"use client";

import { useEffect, useRef } from "react";
import { useFinePointer, useReducedMotion } from "../_lib/motion";

/**
 * Custom pointer: an orange neon arrow shaped like the system one, with a soft glow that trails a beat behind.
 * Mouse only. The system cursor is hidden only while this is active, and comes back over text fields.
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const arrow = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const a = arrow.current;
    const g = glow.current;
    if (!fine || !a || !g) return;

    document.documentElement.classList.add("custom-cursor");
    let x = -100;
    let y = -100;
    let gx = -100;
    let gy = -100;
    let raf = 0;
    let visible = false;

    const state = (el: EventTarget | null) => {
      const t = el instanceof Element ? el : null;
      if (t?.closest("input:not([type=range]), textarea, select")) return "text";
      if (t?.closest("a, button, summary, label, [role=button], [role=tab], input[type=range]")) return "hot";
      return "";
    };

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      a.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      a.dataset.state = state(e.target);
      g.dataset.state = a.dataset.state;
      if (!visible) {
        visible = true;
        gx = x;
        gy = y;
        a.style.opacity = "1";
        g.style.opacity = "1";
      }
    };
    const leave = () => {
      visible = false;
      a.style.opacity = "0";
      g.style.opacity = "0";
    };
    const down = () => a.classList.add("is-down");
    const up = () => a.classList.remove("is-down");

    const tick = () => {
      const k = reduce ? 1 : 0.14;
      gx += (x - gx) * k;
      gy += (y - gy) * k;
      g.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [fine, reduce]);

  if (!fine) return null;

  return (
    <div aria-hidden="true">
      <div ref={glow} className="cursor-glow" />
      <div ref={arrow} className="cursor-arrow">
        <svg width="26" height="30" viewBox="0 0 26 30">
          {/* the classic pointer outline, filled orange with a lighter neon rim */}
          <path d="M3 2 L3 22 L8.2 17.4 L12.2 26.2 L16 24.4 L12 15.8 L19 15.8 Z" />
        </svg>
      </div>
    </div>
  );
}
