// Habilidades agrupadas por área (sin porcentajes arbitrarios).
// "usedIn" enlaza cada habilidad con los proyectos donde la apliqué (ids de data/projects.ts).
// TODO: revisar la lista y agregar o quitar lo que corresponda.

export type Skill = { name: string; usedIn?: string[] };

export type SkillGroup = {
  id: string;
  title: string;
  summary: string;
  skills: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "lenguajes",
    title: "Lenguajes",
    summary: "La base: tipado fuerte cuando puedo, scripting cuando conviene.",
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
    title: "Frameworks y librerías",
    summary: "Interfaces nativas, web y de escritorio.",
    skills: [
      { name: "Jetpack Compose", usedIn: ["vidalvl"] },
      { name: "React", usedIn: ["vozsegura", "mudanzify"] },
      { name: "Electron", usedIn: ["mudanzify"] },
      { name: "Next.js" },
      { name: "Tailwind CSS", usedIn: ["vozsegura", "mudanzify"] },
      { name: "Capacitor", usedIn: ["vozsegura"] },
      { name: "HTML y CSS" },
    ],
  },
  {
    id: "datos",
    title: "Datos y nube",
    summary: "Persistencia local, bases relacionales y servicios en la nube.",
    skills: [
      { name: "Firebase" },
      { name: "MySQL" },
      { name: "Room", usedIn: ["vidalvl"] },
    ],
  },
  {
    id: "herramientas",
    title: "Herramientas",
    summary: "Control de versiones y despliegue.",
    skills: [{ name: "Git" }, { name: "GitHub" }, { name: "Vercel", usedIn: ["vozsegura"] }, { name: "Android Studio", usedIn: ["vidalvl"] }],
  },
  {
    id: "diseno",
    title: "Diseño",
    summary: "Pensar la interfaz antes de programarla.",
    skills: [{ name: "UI/UX" }, { name: "Diseño responsive" }, { name: "Accesibilidad web" }, { name: "UML" }],
  },
];

/** Chips destacados para la sección "Acerca de mí". */
export const highlightSkills = ["Kotlin", "TypeScript", "Java", "Python", "React", "Firebase", "MySQL", "Git", "UI/UX"];
