// Habilidades agrupadas por área (sin porcentajes arbitrarios).
// "usedIn" enlaza cada habilidad con los proyectos donde la apliqué (ids de data/projects.ts).
// TODO: revisar la lista y agregar o quitar lo que corresponda.

import { tx, type Tx } from "@/lib/i18n";

/** `nameEn` solo cuando el nombre no es igual en inglés. */
export type Skill = { name: string; nameEn?: string; usedIn?: string[] };

export type SkillGroup = {
  id: string;
  title: Tx;
  summary: Tx;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "lenguajes",
    title: tx("Lenguajes", "Languages"),
    summary: tx("La base: tipado fuerte cuando puedo, scripting cuando conviene.", "The basics: strong typing when I can, scripting when it makes sense."),
    skills: [
      { name: "Kotlin", usedIn: ["vidalvl"] },
      { name: "Java" },
      { name: "TypeScript", usedIn: ["vozsegura", "mudanzify"] },
      { name: "JavaScript" },
      { name: "Python" },
      { name: "SQL" },
    ],
  },
  {
    id: "frameworks",
    title: tx("Frameworks y librerías", "Frameworks and libraries"),
    summary: tx("Interfaces nativas, web y de escritorio.", "Native, web and desktop interfaces."),
    skills: [
      { name: "Jetpack Compose", usedIn: ["vidalvl"] },
      { name: "React", usedIn: ["vozsegura", "mudanzify"] },
      { name: "Electron", usedIn: ["mudanzify"] },
      { name: "Next.js" },
      { name: "Tailwind CSS", usedIn: ["vozsegura", "mudanzify"] },
      { name: "Capacitor", usedIn: ["vozsegura"] },
      { name: "HTML y CSS", nameEn: "HTML and CSS" },
    ],
  },
  {
    id: "datos",
    title: tx("Datos y nube", "Data and cloud"),
    summary: tx("Persistencia local, bases relacionales y servicios en la nube.", "Local persistence, relational databases and cloud services."),
    skills: [
      { name: "Firebase" },
      { name: "MySQL" },
      { name: "Room", usedIn: ["vidalvl"] },
    ],
  },
  {
    id: "herramientas",
    title: tx("Herramientas", "Tools"),
    summary: tx("Control de versiones, despliegue y servicios externos.", "Version control, deployment and external services."),
    skills: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Vercel", usedIn: ["vozsegura"] },
      { name: "Android Studio", usedIn: ["vidalvl"] },
      { name: "Telegram Bot API", usedIn: ["vozsegura"] },
      { name: "Gemini / Groq (IA)", usedIn: ["vozsegura", "mudanzify", "vidalvl"] },
    ],
  },
  {
    id: "diseno",
    title: tx("Diseño", "Design"),
    summary: tx("Pensar la interfaz antes de programarla.", "Thinking through the interface before coding it."),
    skills: [
      { name: "UI/UX" },
      { name: "Diseño responsive", nameEn: "Responsive design" },
      { name: "Accesibilidad web", nameEn: "Web accessibility" },
      { name: "UML" },
    ],
  },
];

/** Chips destacados para la sección "Acerca de mí". */
export const highlightSkills = ["Kotlin", "TypeScript", "Java", "Python", "React", "Firebase", "MySQL", "Git", "UI/UX"];
