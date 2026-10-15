"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./gsap";

function useMedia(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const m = window.matchMedia(query);
      m.addEventListener("change", notify);
      return () => m.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True when the visitor asked the OS for less motion. Every effect must check this. */
export const useReducedMotion = () => useMedia("(prefers-reduced-motion: reduce)");

/** True on a real mouse + wide screen: the only place cursor effects and heavy WebGL make sense. */
export const useFinePointer = () => useMedia("(hover: hover) and (pointer: fine) and (min-width: 900px)");

/** Big screen + real mouse: the only place the pinned 3D walk-through makes sense. */
export const useRoomCapable = () => useMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px) and (min-height: 640px)");

/** Lenis smooth scroll wired into GSAP's ticker so ScrollTrigger stays in sync. Off under reduced motion. */
export function SmoothScroll() {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const lenis = new Lenis({ anchors: true, lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduce]);

  return null;
}

/** Mounts children only once the box nears the viewport, so heavy 3D/animation code never blocks first paint. */
export function LazyMount({
  children,
  fallback = null,
  rootMargin = "300px",
  className,
}: {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {on ? children : fallback}
    </div>
  );
}
