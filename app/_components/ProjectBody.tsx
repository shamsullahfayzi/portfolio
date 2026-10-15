import type { ReactNode } from "react";
import { COPY, PROJECT_LINKS, type ProjectId } from "../../content/content";

export function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="proj-link" href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <span aria-hidden="true"> →</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}

/** Copy + demo slot for one project. Shared by the scrolling list and the 3D room. */
export default function ProjectBody({
  id,
  reveal,
  demo,
  wrap,
  headingId,
}: {
  id: ProjectId;
  /** list mode only: tag pieces for the scroll-reveal animation */
  reveal: boolean;
  demo: ReactNode;
  wrap: boolean;
  headingId: string;
}) {
  const t = COPY.work;
  const p = t.projects[id];
  const repo = PROJECT_LINKS[id];
  const r = reveal ? { "data-reveal": true } : {};

  return (
    <div className={wrap ? "wrap proj-grid" : "proj-grid"}>
      <div className="proj-copy">
        <p className="mono" {...r}>
          {p.kind}
        </p>
        <h3 id={headingId} className="proj-name" {...r}>
          {p.name}
        </h3>
        <p className="proj-pitch" {...r}>
          {p.pitch}
        </p>

        {p.stats.length > 0 && (
          <dl className="stats" {...r}>
            {p.stats.map((s) => (
              <div key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {p.points.length > 0 && (
          <ul className="points" {...r}>
            {p.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>
        )}

        <ul className="chips" aria-label={t.stack} {...r}>
          {p.stack.map((s) => (
            <li key={s} className="mono">
              {s}
            </li>
          ))}
        </ul>

        <p className="proj-links" {...r}>
          {repo ? <ExternalLink href={repo}>{t.code}</ExternalLink> : <span className="mono">{p.note ?? t.noCode}</span>}
        </p>
      </div>

      <div className="proj-demo" {...r}>
        {demo}
      </div>
    </div>
  );
}
