// Testimonios de personas que usan lo que construí. Cada texto resume lo que la persona le contó
// a Mario y se redactó a partir de eso; conviene que cada una lo revise antes de publicarlo.
// Para agregar una foto, se completa `avatar`.

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
    name: tx("Que Ricuras", "Que Ricuras"),
    role: tx("Negocio familiar de comidas rápidas", "Family fast-food business"),
    text: tx(
      "Con la aplicación que Mario hizo para el negocio, el trabajo se volvió mucho más fácil. Antes todo nos tomaba más tiempo; ahora tenemos el punto de venta a la mano y atendemos con menos complicaciones. Además, Mario está pendiente de mejorarla y ya trabaja en una nueva versión. Se nota el cariño con el que la hizo.",
      "With the app Mario built for the business, our work became so much easier. Everything used to take us longer; now we have the point of sale at hand and we serve customers with fewer complications. Mario is also always looking to improve it and is already working on a new version. You can tell it was made with care.",
    ),
    avatar: null,
  },
  {
    name: tx("Fernando Zambrano", "Fernando Zambrano"),
    role: tx("Usuario de TON Music Player", "TON Music Player user"),
    text: tx(
      "Me encantó el reproductor que hizo Mario: armo mis propias listas y las escucho sin un solo anuncio. Puedo buscar mis canciones, ordenarlas a mi gusto, marcar las favoritas y hasta ver la letra mientras suenan. Es fácil de usar y estoy muy orgulloso de lo que Mario logró.",
      "I loved the music player Mario made: I put together my own playlists and listen to them without a single ad. I can search for my songs, arrange them the way I like, mark my favorites and even see the lyrics while they play. It's easy to use and I'm very proud of what Mario achieved.",
    ),
    avatar: null,
  },
  {
    name: tx("Mirian Muñoz", "Mirian Muñoz"),
    role: tx("Usuaria de Mudanzify", "Mudanzify user"),
    text: tx(
      "Por mi trabajo manejo muchísimos documentos y presentaciones, y terminan llenando la memoria de mi computador. Con Mudanzify traspaso los que necesito y, además, la app me ayuda a identificar cuáles ya no sirven. Lo que más tranquilidad me da es que la copia nunca toca el original y que revisa cada archivo para confirmar que pasó completo. Me ha ahorrado mucho tiempo.",
      "My job means handling a huge number of documents and presentations, and they end up filling my computer's memory. With Mudanzify I transfer the ones I need and, on top of that, the app helps me spot which ones are no longer useful. What gives me the most peace of mind is that the copy never touches the original and that it checks every file to confirm it came through complete. It has saved me a lot of time.",
    ),
    avatar: null,
  },
];
