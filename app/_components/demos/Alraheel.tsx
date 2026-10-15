"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "../../_lib/motion";
import DemoFrame from "./DemoFrame";

// A sample document and the fields an extraction model would pull out. All values are invented.
const FIELDS: [string, string][] = [
  ["Full name", "Sample Customer"],
  ["Document no.", "XX0000000"],
  ["Nationality", "Sampleland"],
  ["Date of birth", "01 Jan 1990"],
  ["Destination", "Sample City"],
];

export default function Alraheel() {
  const reduce = useReducedMotion();
  const [filled, setFilled] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (reduce) {
      setFilled(FIELDS.length);
      setRunning(false);
      return;
    }
    if (filled >= FIELDS.length) {
      setRunning(false);
      return;
    }
    const id = setTimeout(() => setFilled((n) => n + 1), 520);
    return () => clearTimeout(id);
  }, [running, filled, reduce]);

  const start = () => {
    setFilled(0);
    setRunning(true);
  };
  const done = filled >= FIELDS.length;

  return (
    <DemoFrame label="Before / after" note="Invented customer">
      <div className="ar">
        <div className="ar-col">
          <p className="mono ar-h">Before: Excel</p>
          <div className="ar-sheet" role="img" aria-label="A messy spreadsheet with manually typed customer rows">
            {Array.from({ length: 24 }, (_, n) => (
              <span key={n} className={n % 7 === 3 ? "is-bad" : ""} />
            ))}
          </div>
          <p className="ar-cap">Typed by hand, row by row.</p>
        </div>

        <div className="ar-col">
          <p className="mono ar-h">After: system + AI</p>
          <div className="ar-doc">
            <p className="mono">Sample document</p>
            <span className="ar-lines" aria-hidden="true" />
            <span className="ar-lines" aria-hidden="true" />
          </div>
          <dl className="ar-form" aria-live="polite">
            {FIELDS.map(([k, v], n) => (
              <div key={k} className={n < filled ? "is-on" : ""}>
                <dt className="mono">{k}</dt>
                <dd>{n < filled ? v : "—"}</dd>
              </div>
            ))}
          </dl>
          <button type="button" className="demo-btn" onClick={start} disabled={running}>
            {done ? "Extract again" : running ? "Reading…" : "Extract with AI"}
          </button>
        </div>
      </div>

      <div className="ar-bars" role="img" aria-label="Manual processing time dropped by 75 percent">
        <div>
          <span className="mono">Manual time before</span>
          <i />
        </div>
        <div>
          <span className="mono">After: 75% less</span>
          <i className={done ? "is-short" : ""} />
        </div>
      </div>
    </DemoFrame>
  );
}
