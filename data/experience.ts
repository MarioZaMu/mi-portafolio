// Experiencia académica y laboral. Se ordena automáticamente de la más reciente a la más antigua.

export type ExperienceType = "academica" | "laboral";

export type Item = {
  type: ExperienceType;
  title: string;
  place: string;
  /** Texto visible, p. ej. "2025 — Actualidad". */
  date: string;
  /** Fecha de inicio AAAA-MM, solo para ordenar. */
  start: string;
  description: string;
};

export const experience: Item[] = [
  {
    type: "academica",
    title: "Ingeniería de Software · Cuarto semestre",
    place: "Universidad Cooperativa de Colombia, Pasto",
    date: "2025 — Actualidad",
    start: "2025-02",
    description:
      "Proyectos de desarrollo móvil, patrones de diseño, estructuras de datos y diseño de interfaces de software.",
  },
  {
    type: "laboral",
    title: "Desarrollador freelance",
    place: "Que Ricuras · negocio familiar de comidas rápidas",
    date: "Junio 2026 — Actualidad",
    start: "2026-06",
    description:
      "Diseño y desarrollo de una PWA de punto de venta con Firebase, usada en el negocio. Ya preparo una nueva versión.",
  },
  // TODO: agregar empleos o prácticas reales con { type: "laboral", ... }.
];

export const sortedExperience = [...experience].sort((a, b) => b.start.localeCompare(a.start));
