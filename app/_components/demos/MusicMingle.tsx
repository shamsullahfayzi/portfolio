"use client";

import { useState } from "react";
import DemoFrame from "./DemoFrame";

type Ev = { id: number; day: string; title: string; venue: string; cap: number; booked: number };

// Invented events.
const START: Ev[] = [
  { id: 1, day: "FRI 14", title: "Open-mic night", venue: "The Loft", cap: 40, booked: 36 },
  { id: 2, day: "SAT 15", title: "Jazz in the garden", venue: "Courtyard", cap: 60, booked: 41 },
  { id: 3, day: "SUN 16", title: "Synth and strings", venue: "Hall B", cap: 25, booked: 25 },
];

export default function MusicMingle() {
  const [admin, setAdmin] = useState(false);
  const [ev, setEv] = useState(START);
  const total = ev.reduce((s, e) => s + e.booked, 0);

  return (
    <DemoFrame label="MusicMingle · event booking" note="Fake data" open>
      <div className="mm">
        <div className="mm-top">
          <p className="mm-logo">
            music<span>mingle</span>
          </p>
          <div className="mm-seg" role="group" aria-label="View as">
            <button type="button" aria-pressed={!admin} onClick={() => setAdmin(false)}>
              Fan
            </button>
            <button type="button" aria-pressed={admin} onClick={() => setAdmin(true)}>
              Admin
            </button>
          </div>
        </div>

        {admin ? (
          <div className="mm-admin">
            <p className="mm-h">Back office · {total} bookings</p>
            <ul>
              {ev.map((e) => (
                <li key={e.id}>
                  <span>
                    {e.title}{" "}
                    <small>
                      {e.booked}/{e.cap}
                    </small>
                  </span>
                  <span className="mm-meter" role="img" aria-label={`${e.booked} of ${e.cap} seats booked`}>
                    <i style={{ inlineSize: `${(e.booked / e.cap) * 100}%` }} />
                  </span>
                </li>
              ))}
            </ul>
            <button type="button" className="mm-ghost" onClick={() => setEv(START)}>
              Reset demo
            </button>
          </div>
        ) : (
          <ul className="mm-list" aria-live="polite">
            {ev.map((e) => {
              const left = e.cap - e.booked;
              return (
                <li key={e.id}>
                  <span className="mm-date">{e.day}</span>
                  <span className="mm-info">
                    <strong>{e.title}</strong>
                    <small>
                      {e.venue} · {left === 0 ? "Sold out" : `${left} seats left`}
                    </small>
                  </span>
                  <button
                    type="button"
                    disabled={left === 0}
                    onClick={() => setEv((x) => x.map((y) => (y.id === e.id ? { ...y, booked: y.booked + 1 } : y)))}
                    aria-label={left === 0 ? `${e.title} is sold out` : `Book a seat for ${e.title}`}
                  >
                    {left === 0 ? "Sold out" : "Book"}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </DemoFrame>
  );
}
