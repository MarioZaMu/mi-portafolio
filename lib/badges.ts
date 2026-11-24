import type { Project } from "@/data/projects";
import { tx, type Tx } from "@/lib/i18n";

/** Distintivo de la tarjeta: «En vivo» si hay demo web, «Descarga» si sale de un release. */
export function badgeFor(p: Project): Tx | null {
  if (!p.demoUrl) return null;
  return p.demoLabel ? tx("Descarga", "Download") : tx("En vivo", "Live");
}
