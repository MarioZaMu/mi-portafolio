// Idiomas del sitio. El idioma activo vive en <html data-lang="es|en"> (igual que el tema):
// un script antes del primer pintado lo fija y CSS muestra solo la versión activa de cada texto.
// Así los componentes de servidor no necesitan JavaScript y no hay parpadeo al cargar.

export type Lang = "es" | "en";

/** Un texto en los dos idiomas. */
export type Tx = { es: string; en: string };

export const tx = (es: string, en: string): Tx => ({ es, en });

/** Texto bilingüe: pinta las dos versiones y el CSS (globals.css) oculta la que no está activa. */
export function T({ es, en }: Tx) {
  return (
    <>
      <span data-l="es" lang="es">
        {es}
      </span>
      <span data-l="en" lang="en">
        {en}
      </span>
    </>
  );
}

/** Para atributos (aria-label, placeholder, alt) que no admiten dos versiones a la vez. */
export const pick = (t: Tx, lang: Lang) => t[lang];

/** Plataformas de los proyectos. */
export const platformText = {
  Móvil: tx("Móvil", "Mobile"),
  Web: tx("Web", "Web"),
  Escritorio: tx("Escritorio", "Desktop"),
} as const;

/** Etiquetas de tecnología que no son nombres propios. */
const tagEn: Record<string, string> = { IA: "AI", "Estructuras de datos": "Data structures" };
export const tagText = (tag: string): Tx => tx(tag, tagEn[tag] ?? tag);

/** Texto que se abre en otra pestaña (lectores de pantalla). */
export const newTab = tx("(se abre en una pestaña nueva)", "(opens in a new tab)");
