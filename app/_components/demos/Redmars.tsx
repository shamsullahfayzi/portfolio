"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "../../_lib/motion";
import DemoFrame from "./DemoFrame";

type Step = { step: string; detail: string; role: string; rows: [string, string][] };

// One visit through the system. Names, numbers and records are invented.
const STEPS: Step[] = [
  {
    step: "Reception",
    detail: "Registers, opens the visit and takes payment on one screen.",
    role: "reception",
    rows: [
      ["Patient", "Sample Patient"],
      ["Record", "#0042"],
      ["Visit", "Outpatient, new"],
    ],
  },
  {
    step: "Doctor's queue",
    detail: "Updates live as patients arrive.",
    role: "doctor",
    rows: [
      ["Waiting", "3"],
      ["Next", "#0042 Sample Patient"],
      ["Then", "#0043, #0044"],
    ],
  },
  {
    step: "Consultation",
    detail: "Diagnosis, notes and prescription, all from the keyboard.",
    role: "doctor",
    rows: [],
  },
  {
    step: "Lab",
    detail: "Orders arrive instantly; abnormal results are flagged.",
    role: "lab",
    rows: [
      ["Order", "Sample panel"],
      ["Result A", "within range"],
      ["Result B", "ABNORMAL (flagged)"],
    ],
  },
  {
    step: "Billing",
    detail: "Partial payments, refunds and capped discounts.",
    role: "cashier",
    rows: [
      ["Total", "120.00"],
      ["Paid", "80.00"],
      ["Due", "40.00"],
    ],
  },
  {
    step: "Pharmacy",
    detail: "Sees only medicines and allergies, nothing else.",
    role: "pharmacist",
    rows: [
      ["Medicine", "Sample tablet, 2 daily"],
      ["Allergy on file", "penicillin"],
      ["Diagnosis", "hidden from this role"],
    ],
  },
  {
    step: "Reports",
    detail: "Daily numbers for hospital management.",
    role: "manager",
    rows: [
      ["Visits today", "27"],
      ["Open invoices", "4"],
      ["Records opened", "61 (all logged)"],
    ],
  },
];

export default function Redmars() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reason, setReason] = useState("");
  const [overridden, setOverridden] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % STEPS.length), 3600);
    return () => clearInterval(id);
  }, [reduce, paused]);

  // The real system logs every record read; the demo shows that habit.
  useEffect(() => {
    const s = STEPS[i];
    const line = s.role === "manager" ? "report.view   manager" : `record.read   ${s.role}   #0042`;
    setLog((l) => [line, ...l].slice(0, 4));
    if (i !== 2) {
      setReason("");
      setOverridden(false);
    }
  }, [i]);

  const s = STEPS[i];
  const pick = (n: number) => {
    setI(n);
    setPaused(true);
  };

  return (
    <DemoFrame label="REDMARS · one visit" note="Fake patient, fake numbers">
      <div className="rm">
        <ol className="rm-steps" aria-label="Steps of a visit">
          {STEPS.map((st, n) => (
            <li key={st.step}>
              <button type="button" aria-current={n === i ? "step" : undefined} onClick={() => pick(n)}>
                <span className="mono">{String(n + 1).padStart(2, "0")}</span>
                {st.step}
              </button>
            </li>
          ))}
        </ol>

        <div className="rm-screen" aria-live="polite" onFocus={() => setPaused(true)} onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}>
          <p className="rm-detail">{s.detail}</p>

          {i === 2 ? (
            <div className="rm-rx">
              <p className="mono">New prescription</p>
              <p className="rm-med">Sample antibiotic 500 mg</p>
              {overridden ? (
                <p className="rm-chip rm-chip-warn">Overridden, reason logged: “{reason}”</p>
              ) : (
                <>
                  <p className="rm-chip rm-chip-block">Blocked: patient is allergic (penicillin)</p>
                  <label className="rm-reason">
                    <span className="mono">Reason to override</span>
                    <input value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Doctor must type a reason" />
                  </label>
                  <button type="button" className="rm-override" disabled={reason.trim().length < 4} onClick={() => setOverridden(true)}>
                    Override with reason
                  </button>
                </>
              )}
            </div>
          ) : (
            <dl className="rm-rows">
              {s.rows.map(([k, v]) => (
                <div key={k}>
                  <dt className="mono">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          )}

          <div className="rm-log" aria-label="Audit log">
            <p className="mono">Audit log</p>
            <ul>
              {log.map((l, n) => (
                <li key={`${l}-${n}`} className="mono">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
