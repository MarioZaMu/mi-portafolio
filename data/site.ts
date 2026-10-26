// Datos personales y de navegación. Todo el texto visible del sitio sale de data/.

export const site = {
  name: "Mario Alberto Zambrano Muñoz",
  shortName: "Mario Zambrano",
  initials: "MZ",
  role: "Desarrollador de software y estudiante de Ingeniería de Software",
  // Frase elegida entre 3 propuestas (ver docs/brief-diseno.md). TODO: confirmar o reemplazar.
  tagline: "Construyo software capa por capa: primero entiendo el problema, luego lo diseño y al final lo programo.",
  // TODO: borrador en 1.ª persona; edítalo con tu voz.
  about:
    "Soy Mario, estudiante de cuarto semestre de Ingeniería de Software en Pasto. Me gusta construir aplicaciones que resuelvan problemas reales: desde una app Android que convierte la productividad en un juego hasta el punto de venta que usa el negocio de mi familia. Disfruto tanto programar como diseñar la interfaz, porque creo que el buen software también tiene que sentirse bien al usarlo.",
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
  // TODO: reemplazar por la URL final de Vercel.
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
