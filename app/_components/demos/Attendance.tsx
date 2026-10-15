"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "../../_lib/motion";
import DemoFrame from "./DemoFrame";

// Five invented students at fixed spots in the frame. The confidences are made up for the demo.
const FACES = [
  { id: "S-01", x: 12, y: 36, conf: 98 },
  { id: "S-02", x: 31, y: 24, conf: 97 },
  { id: "S-03", x: 50, y: 40, conf: 99 },
  { id: "S-04", x: 69, y: 26, conf: 96 },
  { id: "S-05", x: 86, y: 38, conf: 98 },
];

export default function Attendance() {
  const reduce = useReducedMotion();
  const [found, setFound] = useState(reduce ? FACES.length : 0);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (reduce) {
      setFound(FACES.length);
      return;
    }
    setFound(0);
    const id = setInterval(() => {
      setFound((n) => {
        if (n >= FACES.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 850);
    return () => clearInterval(id);
  }, [run, reduce]);

  const done = found >= FACES.length;

  return (
    <DemoFrame label="Attendance · class DEMO-101" note="Simulated, invented students">
      <div className="att">
        <div className="att-cam" role="img" aria-label="Simulated camera view with five faces being recognised">
          {!done && !reduce && <span className="att-scan" aria-hidden="true" />}
          {FACES.map((f, n) => {
            const hit = n < found;
            return (
              <div key={f.id} className={`att-face${hit ? " is-hit" : ""}`} style={{ insetInlineStart: `${f.x}%`, insetBlockStart: `${f.y}%` }}>
                <svg viewBox="0 0 40 52" aria-hidden="true">
                  <circle cx="20" cy="17" r="11" />
                  <path d="M3 52c0-13 8-20 17-20s17 7 17 20z" />
                </svg>
                {hit && (
                  <span className="att-tag mono">
                    {f.id} · {f.conf}%
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="att-list">
          <ul aria-live="polite">
            {FACES.map((f, n) => (
              <li key={f.id} className={n < found ? "is-present" : ""}>
                <span>Student {f.id.slice(2)}</span>
                <span className="mono">{n < found ? "Present" : "…"}</span>
              </li>
            ))}
          </ul>
          <p className="att-count mono">
            {found}/{FACES.length} marked
          </p>
          <button type="button" className="demo-btn" onClick={() => setRun((r) => r + 1)}>
            Run scan again
          </button>
        </div>
      </div>
    </DemoFrame>
  );
}
