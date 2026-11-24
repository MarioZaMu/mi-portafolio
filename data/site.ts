// Datos personales y de navegación. Todo el texto visible del sitio sale de data/.
// Los textos con dos idiomas son { es, en } (ver lib/i18n.tsx).

import { tx, type Tx } from "@/lib/i18n";

export const site = {
  name: "Mario Alberto Zambrano Muñoz",
  shortName: "Mario Zambrano",
  initials: "MZ",
  role: tx("Desarrollador de software · apps móviles, web y de escritorio", "Software developer · mobile, web and desktop apps"),
  tagline: tx("Hago software que se siente bien al usarlo, como un buen juego.", "I build software that feels good to use, like a great game."),
  about: tx(
    "Soy Mario, estudiante de cuarto semestre de Ingeniería de Software en la UCC de Pasto. Me gusta construir apps móviles, web y de escritorio que resuelvan problemas reales y que se sientan bien al usarlas. Me apasionan los videojuegos y llevo esa forma de pensar, con metas claras, progreso visible y algo de diversión, a todo lo que diseño y programo.",
    "I'm Mario, a fourth-semester Software Engineering student at UCC in Pasto. I like building mobile, web and desktop apps that solve real problems and feel good to use. I'm passionate about video games, and I bring that way of thinking, with clear goals, visible progress and a bit of fun, to everything I design and code.",
  ),
  university: "Universidad Cooperativa de Colombia",
  location: "Pasto, Nariño, Colombia",
  semester: tx("Cuarto semestre", "Fourth semester"),
  /** Solo el número ordinal, para etiquetas cortas («4.º semestre»). */
  semesterShort: tx("4.º", "4th"),
  interests: [tx("Desarrollo de videojuegos", "Video game development")] as Tx[],
  // Coordenadas y altitud reales de Pasto, usadas como detalle de "carta topográfica".
  coordinates: "N 01°12′ · O 77°16′",
  altitude: "2 527 m s. n. m.",
  email: "marioalbertomunoz50@gmail.com",
  github: "https://github.com/MarioZaMu",
  githubUser: "MarioZaMu",
  // TODO: agregar la URL cuando exista el perfil. Mientras sea null se muestra como "próximamente".
  linkedin: null as string | null,
  // TODO (opcional): número con indicativo, solo dígitos, p. ej. "573001234567".
  whatsapp: null as string | null,
  whatsappMessage: "¡Hola! Vi tu portafolio y me interesa conversar contigo sobre un proyecto. ¡Gracias!",
  cv: "/cv.pdf",
  // Si este archivo existe en public/, el Hero y "Acerca de mí" lo muestran; si no, avatar con iniciales.
  photo: "/images/profile.jpg",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://mario-zambrano.vercel.app",
} as const;

export type NavItem = { id: string; label: Tx };

// Mismo orden que el mapa del profesor (la sección adicional va antes del pie).
export const navItems: NavItem[] = [
  { id: "inicio", label: tx("Inicio", "Home") },
  { id: "sobre-mi", label: tx("Sobre mí", "About") },
  { id: "proyectos", label: tx("Proyectos", "Projects") },
  { id: "experiencia", label: tx("Experiencia", "Experience") },
  { id: "contacto", label: tx("Contacto", "Contact") },
  { id: "habilidades", label: tx("Habilidades", "Skills") },
];

export function whatsappHref(number: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(site.whatsappMessage)}`;
}
