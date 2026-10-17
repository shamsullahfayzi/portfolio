"use client";

import { useState } from "react";
import DemoFrame from "./DemoFrame";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const SLOTS = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"];
// Invented schedule: slots already taken, per day.
const TAKEN: Record<string, string[]> = {
  Mon: ["09:00", "10:30", "11:00"],
  Tue: ["09:30", "10:00"],
  Wed: ["09:00", "09:30", "10:00", "11:30", "12:00"],
  Thu: ["10:30"],
  Fri: ["09:00", "11:00", "12:30"],
};

type Role = "Reception" | "Admin";
type View = "book" | "dash";

export default function Zoya() {
  const [role, setRole] = useState<Role>("Reception");
  const [view, setView] = useState<View>("book");
  const [day, setDay] = useState("Mon");
  const [mine, setMine] = useState<Record<string, string[]>>({});

  const taken = (d: string) => [...(TAKEN[d] ?? []), ...(mine[d] ?? [])];
  const book = (slot: string) => setMine((m) => ({ ...m, [day]: [...(m[day] ?? []), slot] }));
  const counts = DAYS.map((d) => taken(d).length);
  const max = Math.max(8, ...counts);

  return (
    <DemoFrame label="Zoya Clinic · appointments" note="Fake data" open>
      <div className="zy">
        <div className="zy-top">
          <div className="zy-seg" role="group" aria-label="Signed in as">
            {(["Reception", "Admin"] as Role[]).map((r) => (
              <button key={r} type="button" aria-pressed={role === r} onClick={() => setRole(r)}>
                {r}
              </button>
            ))}
          </div>
          <div className="zy-seg" role="tablist" aria-label="Page">
            <button type="button" role="tab" aria-selected={view === "book"} onClick={() => setView("book")}>
              Appointments
            </button>
            <button type="button" role="tab" aria-selected={view === "dash"} onClick={() => setView("dash")}>
              Dashboard
            </button>
          </div>
        </div>

        {view === "book" ? (
          <>
            <div className="zy-days" role="group" aria-label="Day">
              {DAYS.map((d) => (
                <button key={d} type="button" aria-pressed={d === day} onClick={() => setDay(d)}>
                  {d}
                </button>
              ))}
            </div>
            <ul className="zy-slots" aria-live="polite">
              {SLOTS.map((s) => {
                const busy = taken(day).includes(s);
                return (
                  <li key={s}>
                    <button type="button" disabled={busy} onClick={() => book(s)} aria-label={`${day} ${s}, ${busy ? "booked" : "free, tap to book"}`}>
                      {s}
                      <small>{busy ? "Booked" : "Free"}</small>
                    </button>
                  </li>
                );
              })}
            </ul>
          </>
        ) : role === "Admin" ? (
          <div className="zy-chart">
            <p className="zy-h">Visits this week</p>
            <ul aria-label="Appointments per day">
              {DAYS.map((d, i) => (
                <li key={d}>
                  <span className="zy-bar" style={{ blockSize: `${(counts[i] / max) * 100}%` }}>
                    <b>{counts[i]}</b>
                  </span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="zy-lock" role="status">
            <p>
              <strong>Admin only.</strong> This route is guarded. Switch to Admin to see the dashboard.
            </p>
            <button type="button" onClick={() => setRole("Admin")}>
              Sign in as Admin
            </button>
          </div>
        )}
      </div>
    </DemoFrame>
  );
}
