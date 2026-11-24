// Proyectos del portafolio: arreglo tipado que Projects.tsx recorre con .map().
// Para agregar un proyecto basta con agregar un objeto a este arreglo.
// Los textos visibles van en dos idiomas con tx("español", "english") (ver lib/i18n.tsx).

import { tx, type Tx } from "@/lib/i18n";

export type Platform = "Móvil" | "Web" | "Escritorio";

/** Una captura. `srcLight` es la versión del tema claro cuando la app tiene ambos temas. */
export type Shot = { src: string; srcLight?: string; alt: Tx };

export type ProjectLink = { label: Tx; href: string };

export type Project = {
  id: string;
  title: string;
  description: Tx;
  /** Una línea para las tarjetas del inicio. */
  summary: Tx;
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
  demoLabel?: Tx;
  /** Repositorio («usuario/repo») cuyos GitHub Releases se leen solos (lib/releases.ts). */
  releaseRepo?: string;
  /** Qué hice yo en el proyecto. */
  role: Tx;
  /** Repositorios o enlaces adicionales (p. ej. backend). */
  extraLinks?: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: "vozsegura",
    title: "Voz Segura",
    summary: tx(
      "Botón de pánico silencioso para smartwatch con aviso por Telegram.",
      "Silent panic button for smartwatch with a Telegram alert.",
    ),
    description: tx(
      "Botón de pánico silencioso para smartwatch. Un doble toque en la carátula graba audio y envía tu ubicación a contactos de confianza por Telegram, sin nada visible en pantalla; la IA resume el audio para dar contexto. Funciona en el navegador y como app Android.",
      "Silent panic button for smartwatch. A double tap on the watch face records audio and sends your location to trusted contacts through Telegram, with nothing visible on screen; AI summarizes the audio to give context. It works in the browser and as an Android app.",
    ),
    shots: [
      {
        src: "/images/projects/vozsegura.png",
        alt: tx(
          "Captura de Voz Segura: mockup de reloj inteligente con la hora, los pasos y el modo demo activado",
          "Voz Segura screenshot: smartwatch mockup showing the time, the steps and demo mode on",
        ),
      },
    ],
    tags: ["React", "TypeScript", "Capacitor", "Node.js", "Telegram", "IA"],
    platforms: ["Web", "Móvil"],
    githubUrl: "https://github.com/MarioZaMu/VozSegura-Frontend",
    demoUrl: "https://voz-segura-frontend.vercel.app",
    releaseRepo: "MarioZaMu/VozSegura-Frontend",
    role: tx(
      "Diseño de interfaz, app React + Capacitor y backend serverless con Telegram e IA",
      "Interface design, React + Capacitor app and a serverless backend with Telegram and AI",
    ),
    extraLinks: [{ label: tx("Backend", "Backend"), href: "https://github.com/MarioZaMu/VozSegura-backend" }],
  },
  {
    id: "mudanzify",
    title: "Mudanzify",
    summary: tx(
      "App de escritorio para mudar tus archivos entre equipos sin perder nada.",
      "Desktop app to move your files between computers without losing anything.",
    ),
    description: tx(
      "App de escritorio que guía el traspaso de carpetas, archivos y hojas de cálculo entre equipos. Detecta duplicados, datos personales y archivos basura; una IA te entrevista para proponer cómo organizarlo, y la copia nunca toca el original y verifica cada archivo.",
      "Desktop app that guides the transfer of folders, files and spreadsheets between computers. It detects duplicates, personal data and junk files; an AI interviews you to suggest how to organize everything, and the copy never touches the original and verifies every file.",
    ),
    shots: [
      {
        src: "/images/projects/mudanzify-bienvenida.png",
        alt: tx(
          "Captura de Mudanzify: pantalla de bienvenida «Tu mudanza de datos, sin perder nada» con la caja del logo",
          "Mudanzify screenshot: welcome screen reading «Tu mudanza de datos, sin perder nada» with the box logo",
        ),
      },
      {
        src: "/images/projects/mudanzify-inicio.png",
        alt: tx(
          "Captura de Mudanzify: inicio «Listo para empacar» con los pasos elegir el origen, revisar con la IA y confirmar y entregar",
          "Mudanzify screenshot: home screen «Listo para empacar» with the steps choose the source, review with AI, and confirm and deliver",
        ),
      },
    ],
    tags: ["Electron", "TypeScript", "React", "Tailwind CSS", "IA"],
    platforms: ["Escritorio"],
    githubUrl: "https://github.com/MarioZaMu/Mudanzify-Frontend",
    // El instalador para Windows sale del último release (botón «Descargar app»).
    demoUrl: null,
    releaseRepo: "MarioZaMu/Mudanzify-Backend",
    role: tx(
      "Sistema de diseño, interfaz, app Electron y entrevista con IA",
      "Design system, interface, Electron app and the AI interview",
    ),
    extraLinks: [{ label: tx("Backend", "Backend"), href: "https://github.com/MarioZaMu/Mudanzify-Backend" }],
  },
  {
    id: "vidalvl",
    title: "Vidalvl",
    summary: tx("App Android de hábitos gamificada estilo RPG.", "Gamified RPG-style habit app for Android."),
    description: tx(
      "App Android de hábitos estilo RPG: cada misión da experiencia a Cuerpo, Mente, Disciplina o Social y hace crecer tu avatar en pixel art. Mide constancia, no esfuerzo: nunca pierdes nivel por faltar un día. 62 recompensas, logros, verificación con foto e ideas de tareas con IA.",
      "RPG-style habit app for Android: each quest gives experience to Body, Mind, Discipline or Social and makes your pixel-art avatar grow. It measures consistency, not effort: you never lose a level for missing a day. 62 rewards, achievements, photo verification and AI task ideas.",
    ),
    shots: [
      {
        src: "/images/projects/vidalvl-misiones-oscuro.png",
        srcLight: "/images/projects/vidalvl-misiones-claro.png",
        alt: tx(
          "Captura de Vidalvl: pantalla de misiones con el avatar en pixel art, su nivel, la experiencia y las misiones diarias",
          "Vidalvl screenshot: quests screen with the pixel-art avatar, its level, the experience and the daily quests",
        ),
      },
      {
        src: "/images/projects/vidalvl-avatar-oscuro.png",
        srcLight: "/images/projects/vidalvl-avatar-claro.png",
        alt: tx(
          "Captura de Vidalvl: pantalla del avatar con sus atributos Cuerpo, Mente, Disciplina y Social, y el inventario",
          "Vidalvl screenshot: avatar screen with its Body, Mind, Discipline and Social attributes, and the inventory",
        ),
      },
    ],
    shotLayout: "phone",
    tags: ["Kotlin", "Jetpack Compose", "Room", "CameraX", "IA"],
    platforms: ["Móvil"],
    githubUrl: "https://github.com/MarioZaMu/Vidalvl",
    // En cuanto haya un release con el APK, aparece «Descargar APK» solo.
    demoUrl: null,
    releaseRepo: "MarioZaMu/Vidalvl",
    role: tx(
      "Diseño y desarrollo completo: interfaz, reglas del juego, avatar en pixel art e IA",
      "Full design and development: interface, game rules, pixel-art avatar and AI",
    ),
  },
  {
    id: "ton-music-player",
    title: "TON Music Player",
    summary: tx(
      "Reproductor de música estilo Spotify hecho sobre una lista doblemente enlazada.",
      "Spotify-style music player built on a doubly linked list.",
    ),
    description: tx(
      "Reproductor de música estilo Spotify cuya lista de reproducción es una lista doblemente enlazada escrita desde cero en TypeScript. Permite agregar canciones buscándolas en línea, desde un archivo propio o sin audio, reordenarlas, marcar favoritas, deshacer cambios y ver la letra sincronizada.",
      "Spotify-style music player whose playlist is a doubly linked list written from scratch in TypeScript. You can add songs by searching online, from your own file or without audio, reorder them, mark favorites, undo changes and see synced lyrics.",
    ),
    shots: [
      {
        src: "/images/projects/ton-reproductor.png",
        alt: tx(
          "Captura de TON Music Player: lista de reproducción con quince canciones, el menú lateral y la barra de reproducción",
          "TON Music Player screenshot: playlist with fifteen songs, the side menu and the playback bar",
        ),
      },
    ],
    tags: ["React", "TypeScript", "Vite", "Estructuras de datos"],
    platforms: ["Web"],
    githubUrl: "https://github.com/MarioZaMu/TallerReproductordeMusica",
    demoUrl: "https://taller-reproductorde-m-sica.vercel.app",
    role: tx(
      "Lista doblemente enlazada propia, interfaz del reproductor y búsqueda de canciones con un backend serverless",
      "Own doubly linked list, player interface and song search with a serverless backend",
    ),
  },
];
