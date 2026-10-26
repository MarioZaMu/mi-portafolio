import type { Project } from "@/data/projects";

/** Distintivo de la tarjeta: «En vivo» si hay demo web, «Descarga» si sale de un release. */
export function badgeFor(p: Project) {
  if (!p.demoUrl) return null;
  return p.demoLabel ? "Descarga" : "En vivo";
}
