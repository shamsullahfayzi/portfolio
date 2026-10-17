"use client";

import { useState } from "react";
import DemoFrame from "./DemoFrame";

// Invented, generic examples. The real app lives on a doctor's desktop; this is a browser sketch of the same flow.
const MEDS: Record<string, string[]> = {
  Paracetamol: ["500 mg", "1 g"],
  Amoxicillin: ["250 mg", "500 mg"],
  Ibuprofen: ["200 mg", "400 mg"],
  Omeprazole: ["20 mg", "40 mg"],
  Cetirizine: ["10 mg"],
};
const FREQ = ["Once daily", "Twice daily", "Three times daily"];
const QTY = [5, 10, 14, 20, 30];

type Line = { id: number; med: string; dose: string; freq: string; qty: number };

export default function Prescription() {
  const [med, setMed] = useState("Paracetamol");
  const [dose, setDose] = useState(MEDS.Paracetamol[0]);
  const [freq, setFreq] = useState(FREQ[1]);
  const [qty, setQty] = useState(10);
  const [lines, setLines] = useState<Line[]>([{ id: 1, med: "Amoxicillin", dose: "500 mg", freq: "Three times daily", qty: 14 }]);
  const [next, setNext] = useState(2);

  const pick = (m: string) => {
    setMed(m);
    setDose(MEDS[m][0]);
  };
  const add = () => {
    setLines((l) => [...l, { id: next, med, dose, freq, qty }]);
    setNext((n) => n + 1);
  };

  return (
    <DemoFrame label="Prescription app · desktop" note="Fake data" open>
      <div className="pm">
        <div className="pm-title" aria-hidden="true">
          <span />
          <span />
          <span />
          <b>New prescription</b>
        </div>
        <div className="pm-body">
          <div className="pm-form">
            <label>
              Medicine
              <select value={med} onChange={(e) => pick(e.target.value)}>
                {Object.keys(MEDS).map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
            <label>
              Dosage
              <select value={dose} onChange={(e) => setDose(e.target.value)}>
                {MEDS[med].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </label>
            <label>
              Frequency
              <select value={freq} onChange={(e) => setFreq(e.target.value)}>
                {FREQ.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </label>
            <label>
              Quantity
              <select value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                {QTY.map((q) => (
                  <option key={q}>{q}</option>
                ))}
              </select>
            </label>
            <button type="button" className="pm-add" onClick={add}>
              Add to prescription
            </button>
          </div>

          <div className="pm-sheet" aria-live="polite">
            <p className="pm-h">On this prescription ({lines.length})</p>
            {lines.length === 0 ? (
              <p className="pm-empty">Nothing added yet.</p>
            ) : (
              <ul>
                {lines.map((l) => (
                  <li key={l.id}>
                    <span>
                      <strong>{l.med}</strong> {l.dose}
                      <small>
                        {l.freq} · qty {l.qty}
                      </small>
                    </span>
                    <button type="button" aria-label={`Remove ${l.med}`} onClick={() => setLines((x) => x.filter((y) => y.id !== l.id))}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                        <path d="M6 6l12 12M18 6 6 18" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </DemoFrame>
  );
}
