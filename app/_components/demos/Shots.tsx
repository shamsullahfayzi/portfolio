"use client";

import { useEffect, useRef, useState } from "react";
import type { ProjectId } from "../../../content/content";
import DemoFrame from "./DemoFrame";

type Shot = { src: string; w: number; h: number; title: string; alt: string };

// Real screenshots of the running apps (public/shots). Patient identifiers in the REDMARS prescription screen are blurred.
const SHOTS: Partial<Record<ProjectId, { label: string; shots: Shot[] }>> = {
  redmars: {
    label: "REDMARS · the real app",
    shots: [
      {
        src: "/shots/redmars-prescription.webp",
        w: 1600,
        h: 843,
        title: "Prescribing",
        alt: "REDMARS prescription screen: allergy banner, drug search and a sheet of drugs with dose, frequency, duration, quantity and route fields.",
      },
      {
        src: "/shots/redmars-modules.webp",
        w: 1600,
        h: 844,
        title: "Modules",
        alt: "REDMARS modules page: switches to turn laboratory, pharmacy, inpatient, emergency, radiology, billing and reports on or off for a hospital.",
      },
    ],
  },
  alraheel: {
    label: "Al-Raheel · the real system",
    shots: [
      {
        src: "/shots/alraheel-identity.webp",
        w: 1600,
        h: 851,
        title: "Document intake",
        alt: "Al-Raheel customer wizard, step 1 of 4: two uploaded identity documents with Analyze and Extract and Next Step buttons.",
      },
      {
        src: "/shots/alraheel-dashboard.webp",
        w: 1600,
        h: 847,
        title: "Dashboard",
        alt: "Al-Raheel dashboard: customer and visa application counts, application status breakdown, quick actions and recent customers.",
      },
    ],
  },
  farhat: {
    label: "farhat.af · the live site",
    shots: [
      {
        src: "/shots/farhat-care.webp",
        w: 980,
        h: 630,
        title: "Care",
        alt: "Farhat Hospital website, services section: an accordion of psychiatry, addiction treatment, counselling and the women's ward, with a photo of a staff member leading a learning session.",
      },
      {
        src: "/shots/farhat-day.webp",
        w: 980,
        h: 650,
        title: "A day at Farhat",
        alt: "Farhat Hospital website, daily schedule: morning, afternoon and evening tabs and a timeline from the Asr prayer to sleep, with the current activity marked Now.",
      },
      {
        src: "/shots/farhat-admission.webp",
        w: 980,
        h: 460,
        title: "Admission",
        alt: "Farhat Hospital website, admission steps: call us, first assessment, admission, treatment and recovery.",
      },
    ],
  },
  zombie: {
    label: "Zombie Typing · in play",
    shots: [
      {
        src: "/shots/zombie-typing.webp",
        w: 1600,
        h: 828,
        title: "In play",
        alt: "Zombie Typing mid-game: a robot shoots at two zombies carrying words to type, with live difficulty, WPM, accuracy, kills and mistakes on the right.",
      },
    ],
  },
};

/** A project's real screenshots: one large picture, thumbnails to switch, click to enlarge. */
export default function Shots({ id }: { id: ProjectId }) {
  const set = SHOTS[id];
  const [i, setI] = useState(0);
  const dlg = useRef<HTMLDialogElement>(null);

  // Close the enlarged view on a click anywhere in it (the backdrop included).
  useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    const close = () => d.close();
    d.addEventListener("click", close);
    return () => d.removeEventListener("click", close);
  }, []);

  if (!set) return null;
  const shot = set.shots[i];

  return (
    <DemoFrame label={set.label} note="Real screenshots" className="shots">
      <button type="button" className="shots-main" onClick={() => dlg.current?.showModal()} aria-label={`Enlarge: ${shot.title}`}>
        <img src={shot.src} width={shot.w} height={shot.h} alt={shot.alt} loading="lazy" decoding="async" />
        <span className="shots-zoom mono" aria-hidden="true">
          Enlarge
        </span>
      </button>

      {set.shots.length > 1 && (
        <ul className="shots-tabs" aria-label="Screens">
          {set.shots.map((s, n) => (
            <li key={s.src}>
              <button type="button" aria-pressed={n === i} onClick={() => setI(n)}>
                {s.title}
              </button>
            </li>
          ))}
        </ul>
      )}

      <dialog ref={dlg} className="shots-dialog" aria-label={shot.title}>
        <img src={shot.src} width={shot.w} height={shot.h} alt={shot.alt} />
        <p className="mono">Click anywhere or press Esc to close</p>
      </dialog>
    </DemoFrame>
  );
}
