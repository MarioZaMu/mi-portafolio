// Experiencia académica y laboral. Se ordena automáticamente de la más reciente a la más antigua.

import { tx, type Tx } from "@/lib/i18n";

export type ExperienceType = "academica" | "laboral";

export type Item = {
  type: ExperienceType;
  title: Tx;
  place: Tx;
  /** Texto visible, p. ej. "2025 — Actualidad". */
  date: Tx;
  /** Fecha de inicio AAAA-MM, solo para ordenar. */
  start: string;
  description: Tx;
};

export const experience: Item[] = [
  {
    type: "academica",
    title: tx("Ingeniería de Software · Cuarto semestre", "Software Engineering · Fourth semester"),
    place: tx("Universidad Cooperativa de Colombia, Pasto", "Universidad Cooperativa de Colombia, Pasto"),
    date: tx("2025 — Actualidad", "2025 — Present"),
    start: "2025-02",
    description: tx(
      "Proyectos de desarrollo móvil, patrones de diseño, estructuras de datos y diseño de interfaces de software.",
      "Mobile development projects, design patterns, data structures and software interface design.",
    ),
  },
  {
    type: "laboral",
    title: tx("Desarrollador freelance", "Freelance developer"),
    place: tx("Que Ricuras · negocio familiar de comidas rápidas", "Que Ricuras · family fast-food business"),
    date: tx("Junio 2026 — Actualidad", "June 2026 — Present"),
    start: "2026-06",
    description: tx(
      "Diseño y desarrollo de una PWA de punto de venta con Firebase, usada en el negocio. Ya preparo una nueva versión.",
      "Design and development of a point-of-sale PWA with Firebase, used in the business. I'm already preparing a new version.",
    ),
  },
  // TODO: agregar empleos o prácticas reales con { type: "laboral", ... }.
];

export const sortedExperience = [...experience].sort((a, b) => b.start.localeCompare(a.start));
