// Proyectos del portafolio: arreglo tipado que Projects.tsx recorre con .map().
// Para agregar un proyecto basta con agregar un objeto a este arreglo.

export type Platform = "Móvil" | "Web" | "Escritorio";

/** Una captura. `srcLight` es la versión del tema claro cuando la app tiene ambos temas. */
export type Shot = { src: string; srcLight?: string; alt: string };

export type ProjectLink = { label: string; href: string };

export type Project = {
  id: string;
  title: string;
  description: string;
  /** Una línea para las tarjetas del inicio. */
  summary: string;
  /** Capturas reales de la app (rutas en public/). */
  shots: Shot[];
  /** "phone": capturas verticales de celular, lado a lado. "screen" (por defecto): una a la vez. */
  shotLayout?: "phone" | "screen";
  tags: string[];
  /** Dónde corre la app (se usa en el filtro). La primera es la principal. */
  platforms: Platform[];
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
    shots: [
      {
        src: "/images/projects/vozsegura.png",
        alt: "Captura de Voz Segura: mockup de reloj inteligente con la hora, los pasos y el modo demo activado",
      },
    ],
    tags: ["React", "TypeScript", "Capacitor", "Node.js", "Telegram", "IA"],
    platforms: ["Web", "Móvil"],
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
    shots: [
      {
        src: "/images/projects/mudanzify-bienvenida.png",
        alt: "Captura de Mudanzify: pantalla de bienvenida «Tu mudanza de datos, sin perder nada» con la caja del logo",
      },
      {
        src: "/images/projects/mudanzify-inicio.png",
        alt: "Captura de Mudanzify: inicio «Listo para empacar» con los pasos elegir el origen, revisar con la IA y confirmar y entregar",
      },
    ],
    tags: ["Electron", "TypeScript", "React", "Tailwind CSS", "IA"],
    platforms: ["Escritorio"],
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
    shots: [
      {
        src: "/images/projects/vidalvl-misiones-oscuro.png",
        srcLight: "/images/projects/vidalvl-misiones-claro.png",
        alt: "Captura de Vidalvl: pantalla de misiones con el avatar en pixel art, su nivel, la experiencia y las misiones diarias",
      },
      {
        src: "/images/projects/vidalvl-avatar-oscuro.png",
        srcLight: "/images/projects/vidalvl-avatar-claro.png",
        alt: "Captura de Vidalvl: pantalla del avatar con sus atributos Cuerpo, Mente, Disciplina y Social, y el inventario",
      },
    ],
    shotLayout: "phone",
    tags: ["Kotlin", "Jetpack Compose", "Room", "CameraX", "IA"],
    platforms: ["Móvil"],
    githubUrl: "https://github.com/MarioZaMu/Vidalvl",
    // En cuanto haya un release con el APK, aparece «Descargar APK» solo.
    demoUrl: null,
    releaseRepo: "MarioZaMu/Vidalvl",
    role: "Diseño y desarrollo completo: interfaz, reglas del juego, avatar en pixel art e IA",
  },
];
