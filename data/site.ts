// Datos personales y de navegación. Todo el texto visible del sitio sale de data/.

export const site = {
  name: "Mario Alberto Zambrano Muñoz",
  shortName: "Mario Zambrano",
  initials: "MZ",
  role: "Desarrollador de software · apps móviles, web y de escritorio",
  tagline: "Hago software que se siente bien al usarlo, como un buen juego.",
  about:
    "Soy Mario, estudiante de cuarto semestre de Ingeniería de Software en la UCC de Pasto. Me gusta construir apps móviles, web y de escritorio que resuelvan problemas reales y que se sientan bien al usarlas. Me apasionan los videojuegos y llevo esa forma de pensar —metas claras, progreso visible y algo de diversión— a todo lo que diseño y programo.",
  university: "Universidad Cooperativa de Colombia",
  location: "Pasto, Nariño, Colombia",
  semester: "Cuarto semestre",
  interests: ["Desarrollo de videojuegos"],
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

export type NavItem = { id: string; label: string };

// Mismo orden que el mapa del profesor (la sección adicional va antes del pie).
export const navItems: NavItem[] = [
  { id: "inicio", label: "Inicio" },
  { id: "sobre-mi", label: "Sobre mí" },
  { id: "proyectos", label: "Proyectos" },
  { id: "experiencia", label: "Experiencia" },
  { id: "contacto", label: "Contacto" },
  { id: "habilidades", label: "Habilidades" },
];

export function whatsappHref(number: string) {
  return `https://wa.me/${number}?text=${encodeURIComponent(site.whatsappMessage)}`;
}
