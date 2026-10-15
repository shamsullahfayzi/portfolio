import { COPY } from "../../content/content";

/** Infinite ticker of what I build. Pure CSS; two identical halves loop seamlessly. Static and wrapping under reduced motion. */
export default function Marquee() {
  const items = COPY.hero.ticker;
  const half = (hidden: boolean) => (
    <ul className="marquee-half" aria-hidden={hidden || undefined}>
      {items.map((word) => (
        <li key={word}>{word}</li>
      ))}
    </ul>
  );

  return (
    <div className="marquee" role="group" aria-label={items.join(", ")}>
      <div className="marquee-track">
        {half(false)}
        {half(true)}
      </div>
    </div>
  );
}
