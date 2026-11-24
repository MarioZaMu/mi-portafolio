// Testimonios de personas que usan lo que construí. Cada texto resume lo que la persona le contó
// a Mario y se redactó a partir de eso; conviene que cada una lo revise antes de publicarlo.
// Cuando tengan nombre propio o una foto, se reemplazan `name` y `avatar`.

import { tx, type Tx } from "@/lib/i18n";

export type Testimonial = {
  name: Tx;
  /** Relación conmigo o con el proyecto. */
  role: Tx;
  text: Tx;
  /** Ruta a la foto en public/images/; si es null se muestran sus iniciales. */
  avatar: string | null;
  /** Opcional, de 1 a 5. Solo si la persona la da. */
  rating?: number;
};

export const testimonials: Testimonial[] = [
  {
    name: tx("Familiar de Mario", "Mario's relative"),
    role: tx("Que Ricuras · negocio familiar", "Que Ricuras · family business"),
    text: tx(
      "La aplicación que Mario hizo para el negocio me facilitó el trabajo.",
      "The app Mario made for the business made my work easier.",
    ),
    avatar: null,
  },
  {
    name: tx("Papá de Mario", "Mario's dad"),
    role: tx("Usuario de TON Music Player", "TON Music Player user"),
    text: tx(
      "Me encantó el reproductor de música de Mario. Puedo armar mis propias listas sin que me salgan anuncios.",
      "I loved Mario's music player. I can build my own playlists without any ads.",
    ),
    avatar: null,
  },
  {
    name: tx("Mamá de Mario", "Mario's mom"),
    role: tx("Usuaria de Mudanzify", "Mudanzify user"),
    text: tx(
      "Por mi trabajo tengo muchos documentos y presentaciones, y me llenan la memoria del computador. Con Mudanzify traspaso los que necesito y la app me ayuda a identificar cuáles ya no sirven.",
      "Because of my job I have lots of documents and presentations, and they fill up my computer's memory. With Mudanzify I transfer the ones I need and the app helps me spot which ones are no longer useful.",
    ),
    avatar: null,
  },
];
