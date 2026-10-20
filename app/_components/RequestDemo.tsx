"use client";

import { useId, useRef, type FormEvent } from "react";
import { COPY, LINKS } from "../../content/content";

/**
 * "Request demo" for projects whose code and live site are private.
 * The site is static, so there is no server to post to: submitting opens the visitor's mail app
 * with their name, address and message already written into a message to me.
 */
export default function RequestDemo({ project }: { project: string }) {
  const t = COPY.work.request;
  const ref = useRef<HTMLDialogElement>(null);
  const uid = useId();

  const send = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") ?? "").trim();
    const email = String(f.get("email") ?? "").trim();
    const message = String(f.get("message") ?? "").trim();
    const subject = `Demo request: ${project}`;
    const body = `Hi Shamsullah,\n\nI'd like a demo of ${project}.\n\n${message}\n\n${name}\n${email}`;
    window.location.href = `mailto:${LINKS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    ref.current?.close();
  };

  return (
    <>
      <button type="button" className="btn btn-solid req-btn" onClick={() => ref.current?.showModal()}>
        {t.button}
      </button>
      <dialog
        ref={ref}
        className="req-dialog"
        aria-labelledby={`${uid}-t`}
        onClick={(e) => e.target === ref.current && ref.current.close()}
      >
        <form onSubmit={send} method="dialog">
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
          <input id={`${uid}-n`} name="name" type="text" autoComplete="name" required />
          <label htmlFor={`${uid}-e`}>{t.email}</label>
          <input id={`${uid}-e`} name="email" type="email" autoComplete="email" required />
          <label htmlFor={`${uid}-m`}>{t.message}</label>
          <textarea id={`${uid}-m`} name="message" rows={4} required placeholder={t.placeholder} />
          <button type="submit" className="btn btn-solid">
            {t.send}
          </button>
          <p className="req-note">{t.note}</p>
        </form>
      </dialog>
    </>
  );
}
