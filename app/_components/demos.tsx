import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { ProjectId } from "../../content/content";

// Every demo is its own chunk, fetched only when something asks to render it.
export const DEMOS: Partial<Record<ProjectId, ComponentType>> = {
  redmars: dynamic(() => import("./demos/Redmars"), { ssr: false }),
  solar: dynamic(() => import("./demos/Solar"), { ssr: false }),
  attendance: dynamic(() => import("./demos/Attendance"), { ssr: false }),
  alraheel: dynamic(() => import("./demos/Alraheel"), { ssr: false }),
  trendora: dynamic(() => import("./demos/Trendora"), { ssr: false }),
  zombie: dynamic(() => import("./demos/Zombie"), { ssr: false }),
  jobcenter: dynamic(() => import("./demos/JobCenter"), { ssr: false }),
};
