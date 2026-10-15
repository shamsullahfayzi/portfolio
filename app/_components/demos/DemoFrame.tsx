import type { ReactNode } from "react";

/** Shared window chrome for every project demo. The label always says the data is fake. */
export default function DemoFrame({
  label,
  note = "Fake data",
  children,
  className = "",
}: {
  label: string;
  note?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`demo ${className}`}>
      <div className="demo-bar mono">
        <span>{label}</span>
        <span>{note}</span>
      </div>
      <div className="demo-body">{children}</div>
    </div>
  );
}
