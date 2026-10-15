"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useFinePointer, useReducedMotion } from "../../_lib/motion";
import DemoFrame from "./DemoFrame";

// three.js + R3F load only when this demo scrolls into view (Work.tsx lazy-mounts it) and only on the client.
const SolarTwin = dynamic(() => import("./SolarTwin"), {
  ssr: false,
  loading: () => <div className="solar-loading mono">Loading 3D…</div>,
});

const MESSAGES = ["TAXI", "FREE", "BUSY", "AIRPORT"];

export default function Solar() {
  const reduce = useReducedMotion();
  const fine = useFinePointer();
  const [msg, setMsg] = useState("TAXI");
  const [level, setLevel] = useState(80);
  const [on, setOn] = useState(true);

  return (
    <DemoFrame label="Solar sign · twin + remote" note="Simulated, no hardware">
      <div className="solar">
        <div className="solar-stage">
          <SolarTwin text={msg} brightness={level / 100} on={on} interactive={fine} reduce={reduce} />
          <p className="solar-hint mono">{fine ? "Drag to rotate" : "Live 3D twin"}</p>
        </div>

        <div className="phone" role="group" aria-label="Phone remote">
          <p className="phone-top mono">Remote · simulated link</p>
          <button type="button" className="phone-power" aria-pressed={on} onClick={() => setOn((v) => !v)}>
            {on ? "Sign on" : "Sign off"}
          </button>
          <div className="phone-msgs">
            {MESSAGES.map((m) => (
              <button key={m} type="button" aria-pressed={m === msg} onClick={() => setMsg(m)}>
                {m}
              </button>
            ))}
          </div>
          <label className="phone-level">
            <span className="mono">Brightness {level}%</span>
            <input type="range" min={10} max={100} value={level} onChange={(e) => setLevel(Number(e.target.value))} />
          </label>
          <p className="phone-note">The real build talks to an ESP32 over Web Bluetooth. Here the remote drives the twin directly.</p>
        </div>
      </div>
    </DemoFrame>
  );
}
