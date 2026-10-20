"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { COPY, LINKS } from "../../content/content";

type Status = "idle" | "sending" | "sent" | "fallback";

/**
 * "Request demo" for projects whose code and live site are private.
 * Posts to the Worker (worker/index.js), which emails the request to me. If that fails, for example
 * on a static preview with no Worker, it falls back to opening the visitor's mail app with the message written.
 */
export default function RequestDemo({ project }: { project: string }) {
  const t = COPY.work.request;
  const ref = useRef<HTMLDialogElement>(null);
  const uid = useId();
  const [status, setStatus] = useState<Status>("idle");

  const send = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const payload = { project, name: v("name"), email: v("email"), message: v("message"), website: v("website") };
    setStatus("sending");
    try {
      const res = await fetch("/api/request-demo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      const body = `Hi Shamsullah,

I'd like a demo of ${project}.

${payload.message}

${payload.name}
${payload.email}`;
      window.location.href = `mailto:${LINKS.email}?subject=${encodeURIComponent(`Demo request: ${project}`)}&body=${encodeURIComponent(body)}`;
      setStatus("fallback");
    }
  };

  const open = () => {
    setStatus("idle");
    ref.current?.showModal();
  };

  return (
    <>
      <button type="button" className="btn btn-solid req-btn" onClick={open}>
        {t.button}
      </button>
      <dialog
        ref={ref}
        className="req-dialog"
        aria-labelledby={`${uid}-t`}
        onClick={(e) => e.target === ref.current && ref.current.close()}
      >
        {status === "sent" ? (
          <div className="req-done" role="status">
            <div className="req-head">
              <h4>{t.sent}</h4>
              <button type="button" className="req-x" onClick={() => ref.current?.close()} aria-label={t.close}>
                ×
              </button>
            </div>
            <p className="req-sub">{t.sentText}</p>
          </div>
        ) : (
          <form onSubmit={send}>
            <div className="req-head">
              <h4 id={`${uid}-t`}>
                {t.title} <span>{project}</span>
              </h4>
              <button type="button" className="req-x" onClick={() => ref.current?.close()} aria-label={t.close}>
                ×
              </button>
            </div>
            <p className="req-sub">{t.sub}</p>
            <label htmlFor={`${uid}-n`}>{t.name}</label>
            <input id={`${uid}-n`} name="name" type="text" autoComplete="name" required maxLength={100} />
            <label htmlFor={`${uid}-e`}>{t.email}</label>
            <input id={`${uid}-e`} name="email" type="email" autoComplete="email" required maxLength={254} />
            <label htmlFor={`${uid}-m`}>{t.message}</label>
            <textarea id={`${uid}-m`} name="message" rows={4} required maxLength={2000} placeholder={t.placeholder} />
            <input className="req-trap" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <button type="submit" className="btn btn-solid" disabled={status === "sending"}>
              {status === "sending" ? t.sending : t.send}
            </button>
            <p className="req-note" role="status">
              {status === "fallback" ? t.fallback : t.note}
            </p>
          </form>
        )}
      </dialog>
    </>
  );
}
