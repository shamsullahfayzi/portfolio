import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import type { ProjectId } from "../../content/content";

// Every demo is its own chunk, fetched only when something asks to render it.
export const DEMOS: Partial<Record<ProjectId, ComponentType>> = {
  redmars: dynamic(() => import("./demos/Shots").then((m) => ({ default: () => <m.default id="redmars" /> })), { ssr: false }),
  solar: dynamic(() => import("./demos/Solar"), { ssr: false }),
  attendance: dynamic(() => import("./demos/Attendance"), { ssr: false }),
  farhat: dynamic(() => import("./demos/Shots").then((m) => ({ default: () => <m.default id="farhat" /> })), { ssr: false }),
  alraheel: dynamic(() => import("./demos/Shots").then((m) => ({ default: () => <m.default id="alraheel" /> })), { ssr: false }),
  trendora: dynamic(() => import("./demos/Trendora"), { ssr: false }),
  zombie: dynamic(() => import("./demos/Shots").then((m) => ({ default: () => <m.default id="zombie" /> })), { ssr: false }),
  jobcenter: dynamic(() => import("./demos/JobCenter"), { ssr: false }),
  prescription: dynamic(() => import("./demos/Prescription"), { ssr: false }),
  zoya: dynamic(() => import("./demos/Zoya"), { ssr: false }),
  musicmingle: dynamic(() => import("./demos/MusicMingle"), { ssr: false }),
};
