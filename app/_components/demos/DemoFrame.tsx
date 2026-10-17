import type { ReactNode } from "react";

/** Shared window chrome for every project demo. The label always says the data is fake. */
export default function DemoFrame({
  label,
  note = "Fake data",
  children,
  className = "",
  open = false,
}: {
  label: string;
  note?: string;
  children: ReactNode;
  className?: string;
  /** skip the shared input/button restyling, for demos that bring their own component styles */
  open?: boolean;
}) {
  return (
    <div className={`demo ${open ? "demo-open" : ""} ${className}`}>
      <div className="demo-bar mono">
        <span>{label}</span>
        <span>{note}</span>
      </div>
      <div className="demo-body">{children}</div>
    </div>
  );
}
