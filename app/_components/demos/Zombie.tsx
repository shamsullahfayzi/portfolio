"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { useReducedMotion } from "../../_lib/motion";
import DemoFrame from "./DemoFrame";

const WORDS = ["code", "react", "type", "brain", "zombie", "graph", "query", "three", "deploy", "hook", "stack", "build", "debug", "merge"];
const pick = () => WORDS[Math.floor(Math.random() * WORDS.length)];

export default function Zombie() {
  const reduce = useReducedMotion();
  const input = useRef<HTMLInputElement>(null);
  const clock = useRef({ start: 0, chars: 0 });
  const [mode, setMode] = useState<"idle" | "play" | "over">("idle");
  const [word, setWord] = useState("code");
  const [typed, setTyped] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [round, setRound] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [bad, setBad] = useState(false);

  const next = () => {
    setWord(pick());
    setTyped("");
    setRound((r) => r + 1);
  };

  const begin = () => {
    clock.current = { start: performance.now(), chars: 0 };
    setScore(0);
    setLives(3);
    setWpm(0);
    setMode("play");
    next();
    input.current?.focus();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (mode !== "play") return;
    const v = e.target.value.toLowerCase();
    if (!word.startsWith(v)) {
      setBad(true);
      setTimeout(() => setBad(false), 140);
      return;
    }
    setTyped(v);
    if (v === word) {
      clock.current.chars += word.length + 1;
      const mins = (performance.now() - clock.current.start) / 60000;
      setScore((s) => s + 1);
      setWpm(Math.round(clock.current.chars / 5 / Math.max(mins, 0.01)));
      next();
    }
  };

  // Calm mode: the zombie never advances, so there is nothing to lose. Otherwise a missed word costs a life.
  const bitten = () => {
    if (mode !== "play" || reduce) return;
    setLives((l) => {
      const n = l - 1;
      if (n <= 0) setMode("over");
      return n;
    });
    next();
  };

  const walk = Math.max(3.4, 7.5 - score * 0.3);

  return (
    <DemoFrame label="Zombie Typing · mini demo" note="Stand-in art, not the full game">
      <div className="zt">
        <div className="zt-hud mono">
          <span>Score {score}</span>
          <span>WPM {wpm}</span>
          <span aria-label={`${lives} lives left`}>{"♥".repeat(Math.max(lives, 0)) || "—"}</span>
        </div>

        <div className="zt-stage">
          {mode === "play" ? (
            <div
              key={round}
              className={`zt-zombie${reduce ? " is-calm" : ""}`}
              style={{ ["--walk" as string]: `${walk}s` }}
              onAnimationEnd={bitten}
            >
              <span className={`zt-word${bad ? " is-bad" : ""}`} aria-hidden="true">
                <b>{typed}</b>
                {word.slice(typed.length)}
              </span>
              <svg viewBox="0 0 48 64" aria-hidden="true">
                <rect x="12" y="2" width="24" height="22" />
                <rect x="17" y="9" width="5" height="5" className="eye" />
                <rect x="27" y="9" width="5" height="5" className="eye" />
                <rect x="14" y="26" width="20" height="24" />
                <rect x="-2" y="28" width="18" height="6" />
                <rect x="32" y="28" width="18" height="6" />
                <rect x="14" y="50" width="7" height="14" />
                <rect x="27" y="50" width="7" height="14" />
              </svg>
            </div>
          ) : (
            <p className="zt-msg">{mode === "over" ? `Bitten. You stopped ${score}.` : "Type each word before the zombie reaches you."}</p>
          )}
          <span className="zt-ground" aria-hidden="true" />
        </div>

        <div className="zt-input">
          <input
            ref={input}
            value={typed}
            onChange={onChange}
            disabled={mode !== "play"}
            placeholder={mode === "play" ? "Type the word" : "Press start"}
            aria-label="Type the word on the zombie"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button type="button" className="demo-btn" onClick={begin}>
            {mode === "play" ? "Restart" : mode === "over" ? "Play again" : "Start"}
          </button>
        </div>
        {reduce && <p className="zt-note mono">Calm mode: the zombie waits for you.</p>}
      </div>
    </DemoFrame>
  );
}
