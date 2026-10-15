"use client";

import { useState } from "react";
import DemoFrame from "./DemoFrame";

type Job = { id: number; title: string; org: string; applicants: number };

// Invented postings. Applying on the seeker side raises the applicant count on the employer side.
const SEED: Job[] = [
  { id: 1, title: "Sample frontend developer", org: "Sample Co", applicants: 2 },
  { id: 2, title: "Sample data analyst", org: "Example Ltd", applicants: 0 },
  { id: 3, title: "Sample support engineer", org: "Demo Works", applicants: 1 },
];

type Side = "seeker" | "employer";

export default function JobCenter() {
  const [side, setSide] = useState<Side>("seeker");
  const [jobs, setJobs] = useState<Job[]>(SEED);
  const [applied, setApplied] = useState<Set<number>>(new Set());
  const [title, setTitle] = useState("");

  const apply = (id: number) => {
    if (applied.has(id)) return;
    setApplied((s) => new Set(s).add(id));
    setJobs((js) => js.map((j) => (j.id === id ? { ...j, applicants: j.applicants + 1 } : j)));
  };

  const post = () => {
    const t = title.trim();
    if (!t) return;
    setJobs((js) => [{ id: Date.now(), title: t, org: "Your company (demo)", applicants: 0 }, ...js]);
    setTitle("");
  };

  return (
    <DemoFrame label="Job Center · two sides" note="Invented jobs">
      <div className="jc">
        <div className="jc-sides" role="tablist" aria-label="View as">
          {(["seeker", "employer"] as Side[]).map((s) => (
            <button key={s} type="button" role="tab" aria-selected={side === s} onClick={() => setSide(s)}>
              {s === "seeker" ? "Job seeker" : "Employer"}
            </button>
          ))}
        </div>

        {side === "employer" && (
          <form
            className="jc-post"
            onSubmit={(e) => {
              e.preventDefault();
              post();
            }}
          >
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Job title to post" aria-label="Job title to post" />
            <button type="submit" className="demo-btn">
              Post job
            </button>
          </form>
        )}

        <ul className="jc-list" aria-live="polite">
          {jobs.map((j) => (
            <li key={j.id}>
              <span>
                <strong>{j.title}</strong>
                <span className="mono">{j.org}</span>
              </span>
              {side === "seeker" ? (
                <button type="button" className="demo-btn" onClick={() => apply(j.id)} disabled={applied.has(j.id)}>
                  {applied.has(j.id) ? "Applied" : "Apply"}
                </button>
              ) : (
                <span className="jc-count mono">{j.applicants} applicants</span>
              )}
            </li>
          ))}
        </ul>
        <p className="jc-note mono">Apply as a seeker, then switch to employer to see the count change.</p>
      </div>
    </DemoFrame>
  );
}
