// Proyectos del portafolio: arreglo tipado que Projects.tsx recorre con .map().
// Para agregar un proyecto basta con agregar un objeto a este arreglo.

export type ProjectLink = { label: string; href: string };

export type Project = {
  id: string;
  title: string;
  description: string;
  /** Ruta en public/. Capturas tomadas de la app real (1600 × 1000). */
  image: string;
  imageAlt: string;
  /** La primera etiqueta es la tecnología principal (se usa en el filtro). */
  tags: string[];
  /** Obligatorio: repositorio en GitHub. */
  githubUrl: string;
  /** Obligatorio. null mientras no haya demo publicada (TODO). Nunca usar "#". */
  demoUrl: string | null;
  /** Texto del botón de demo cuando no es una web (p. ej. un instalador). Por defecto "Demo en vivo". */
  demoLabel?: string;
  /** Repositorio («usuario/repo») cuyos GitHub Releases se leen solos (lib/releases.ts). */
  releaseRepo?: string;
  /** Qué hice yo en el proyecto. */
  role: string;
  /** Último release publicado; lo completa lib/releases.ts, no se escribe a mano. */
  release?: { tag: string; url: string; label: string; publishedAt: string };
  /** Repositorios o enlaces adicionales (p. ej. backend). */
  extraLinks?: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: "vozsegura",
    title: "Voz Segura",
    description:
      "Botón de pánico silencioso para smartwatch: un doble toque en la carátula graba audio y envía la ubicación a contactos de confianza por Telegram, con un resumen del audio hecho por IA.",
    image: "/images/projects/vozsegura.png",
    imageAlt: "Captura de Voz Segura: mockup de reloj inteligente con la hora, los pasos y el modo demo activado",
    tags: ["React", "TypeScript", "Capacitor", "Node.js", "IA"],
    githubUrl: "https://github.com/MarioZaMu/VozSegura-Frontend",
    demoUrl: "https://voz-segura-frontend.vercel.app",
    releaseRepo: "MarioZaMu/VozSegura-Frontend",
    role: "Diseño de interfaz, frontend y funciones serverless",
    extraLinks: [{ label: "Backend", href: "https://github.com/MarioZaMu/VozSegura-backend" }],
  },
  {
    id: "mudanzify",
    title: "Mudanzify",
    description:
      "Aplicación de escritorio que guía el traspaso de archivos, carpetas y hojas de cálculo entre equipos, asistida por inteligencia artificial, sin duplicar ni perder nada. Antes se llamaba TraspasoIA.",
    image: "/images/projects/mudanzify.png",
    imageAlt: "Captura de Mudanzify: pantalla de bienvenida «Tu mudanza de datos, sin perder nada» con el logo de la caja",
    tags: ["Electron", "TypeScript", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/MarioZaMu/Mudanzify-Frontend",
    // El instalador para Windows sale del último release (botón «Descargar app»).
    demoUrl: null,
    releaseRepo: "MarioZaMu/Mudanzify-Backend",
    role: "Diseño de interfaz, frontend y backend",
    extraLinks: [{ label: "Backend", href: "https://github.com/MarioZaMu/Mudanzify-Backend" }],
  },
  {
    id: "vidalvl",
    title: "Vidalvl",
    description:
      "App Android de hábitos con estilo RPG: cada misión completada da experiencia a Cuerpo, Mente, Disciplina o Social y hace crecer un avatar en pixel art. Incluye verificación con foto e ideas de tareas con IA.",
    image: "/images/projects/vidalvl.png",
    imageAlt: "Captura de Vidalvl: pantalla de misiones con el avatar en pixel art, nivel, racha y misiones diarias",
    tags: ["Kotlin", "Jetpack Compose", "Room", "CameraX"],
    githubUrl: "https://github.com/MarioZaMu/Vidalvl",
    // En cuanto haya un release con el APK, aparece «Descargar APK» solo.
    demoUrl: null,
    releaseRepo: "MarioZaMu/Vidalvl",
    role: "Diseño y desarrollo de la app",
  },
];
