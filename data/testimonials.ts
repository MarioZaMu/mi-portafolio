// Testimonios: deben ser de personas REALES y con su permiso.
// TODO: reemplazar con testimonio real (los 3 elementos de abajo son placeholders).

export type Testimonial = {
  name: string;
  /** Cargo o relación conmigo: profesor, compañera, cliente… */
  role: string;
  text: string;
  /** Ruta a la foto en public/images/; si es null se muestran sus iniciales. */
  avatar: string | null;
  /** Opcional, de 1 a 5. Solo si la persona la da. */
  rating?: number;
};

export const testimonials: Testimonial[] = [
  {
    // TODO: reemplazar con testimonio real
    name: "Nombre del profesor o profesora",
    role: "Profesor(a) · Universidad Cooperativa de Colombia",
    text: "Espacio reservado para el testimonio de un docente sobre mi trabajo en clase. Lo publicaré cuando tenga su texto y su permiso.",
    avatar: null,
  },
  {
    // TODO: reemplazar con testimonio real
    name: "Nombre del compañero o compañera",
    role: "Compañero(a) de proyecto · AgroTec",
    text: "Espacio reservado para la opinión de alguien con quien trabajé en equipo. Lo publicaré cuando tenga su texto y su permiso.",
    avatar: null,
  },
  {
    // TODO: reemplazar con testimonio real
    name: "Nombre del cliente",
    role: "Cliente · Que Ricuras",
    text: "Espacio reservado para el comentario de quien usa el punto de venta a diario. Lo publicaré cuando tenga su texto y su permiso.",
    avatar: null,
  },
];
