// Proyectos del portafolio: arreglo tipado que Projects.tsx recorre con .map().
// Para agregar un proyecto basta con agregar un objeto a este arreglo.

export type ProjectLink = { label: string; href: string };

export type Project = {
  id: string;
  title: string;
  description: string;
  /** Una línea para las tarjetas del inicio. */
  summary: string;
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
  /** Repositorios o enlaces adicionales (p. ej. backend). */
  extraLinks?: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: "vozsegura",
    title: "Voz Segura",
    summary: "Botón de pánico silencioso para smartwatch con aviso por Telegram.",
    description:
      "Botón de pánico silencioso para smartwatch. Un doble toque en la carátula graba audio y envía tu ubicación a contactos de confianza por Telegram, sin nada visible en pantalla; la IA resume el audio para dar contexto. Funciona en el navegador y como app Android.",
    image: "/images/projects/vozsegura.png",
    imageAlt: "Captura de Voz Segura: mockup de reloj inteligente con la hora, los pasos y el modo demo activado",
    tags: ["React", "TypeScript", "Capacitor", "Node.js", "Telegram", "IA"],
    githubUrl: "https://github.com/MarioZaMu/VozSegura-Frontend",
    demoUrl: "https://voz-segura-frontend.vercel.app",
    releaseRepo: "MarioZaMu/VozSegura-Frontend",
    role: "Diseño de interfaz, app React + Capacitor y backend serverless con Telegram e IA",
    extraLinks: [{ label: "Backend", href: "https://github.com/MarioZaMu/VozSegura-backend" }],
  },
  {
    id: "mudanzify",
    title: "Mudanzify",
    summary: "App de escritorio para mudar tus archivos entre equipos sin perder nada.",
    description:
      "App de escritorio que guía el traspaso de carpetas, archivos y hojas de cálculo entre equipos. Detecta duplicados, datos personales y archivos basura; una IA te entrevista para proponer cómo organizarlo, y la copia nunca toca el original y verifica cada archivo.",
    image: "/images/projects/mudanzify.png",
    imageAlt: "Captura de Mudanzify: pantalla de bienvenida «Tu mudanza de datos, sin perder nada» con el logo de la caja",
    tags: ["Electron", "TypeScript", "React", "Tailwind CSS", "IA"],
    githubUrl: "https://github.com/MarioZaMu/Mudanzify-Frontend",
    // El instalador para Windows sale del último release (botón «Descargar app»).
    demoUrl: null,
    releaseRepo: "MarioZaMu/Mudanzify-Backend",
    role: "Sistema de diseño, interfaz, app Electron y entrevista con IA",
    extraLinks: [{ label: "Backend", href: "https://github.com/MarioZaMu/Mudanzify-Backend" }],
  },
  {
    id: "vidalvl",
    title: "Vidalvl",
    summary: "App Android de hábitos gamificada estilo RPG.",
    description:
      "App Android de hábitos estilo RPG: cada misión da experiencia a Cuerpo, Mente, Disciplina o Social y hace crecer tu avatar en pixel art. Mide constancia, no esfuerzo: nunca pierdes nivel por faltar un día. 62 recompensas, logros, verificación con foto e ideas de tareas con IA.",
    image: "/images/projects/vidalvl.png",
    imageAlt: "Captura de Vidalvl: pantalla de misiones con el avatar en pixel art, nivel, racha y misiones diarias",
    tags: ["Kotlin", "Jetpack Compose", "Room", "CameraX", "IA"],
    githubUrl: "https://github.com/MarioZaMu/Vidalvl",
    // En cuanto haya un release con el APK, aparece «Descargar APK» solo.
    demoUrl: null,
    releaseRepo: "MarioZaMu/Vidalvl",
    role: "Diseño y desarrollo completo: interfaz, reglas del juego, avatar en pixel art e IA",
  },
];
