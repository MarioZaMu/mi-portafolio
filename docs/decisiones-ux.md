# Decisiones de diseño y UX

## Decisión → principio → dónde se ve

| # | Decisión de diseño | Principio / heurística | Dónde se ve |
|---|---|---|---|
| 1 | Nombre en Fraunces a ~92 px, rol en negrita 20 px, frase en cursiva 24 px | Jerarquía visual | `components/Hero.tsx` |
| 2 | Un solo `h1` (nombre); cada sección abre con `h2` y una etiqueta corta con el nombre de la sección | Jerarquía · consistencia (Nielsen #4) | `components/ui/Primitives.tsx` → `SectionHeading` |
| 3 | Violeta intenso `iris-700` relleno solo en la acción principal (Descargar CV, Enviar, volver arriba) | Contraste · ley de Von Restorff | `Hero.tsx`, `Contact.tsx`, `Footer.tsx` |
| 4 | Menú fijo con la sección activa subrayada en rojo y `aria-current` | Reconocer antes que recordar (Nielsen #6) · visibilidad del estado (Nielsen #1) | `components/Navbar.tsx` |
| 5 | Etiquetas de tecnología y botones GitHub/Demo dentro de la misma tarjeta | Proximidad (Gestalt) | `components/Projects.tsx` |
| 6 | Filtro de proyectos solo por tecnología principal (6 opciones) | Ley de Hick | `components/Projects.tsx` |
| 7 | Todos los objetivos táctiles ≥ 44 × 44 px (`min-h-11`, `h-11 w-11`) | Ley de Fitts | `components/ui/Button.tsx`, navbar, carrusel |
| 8 | Validación al salir del campo y al enviar, con mensajes concretos y foco al primer error | Prevención de errores (Nielsen #5) · ayuda a reconocer errores (Nielsen #9) | `components/Contact.tsx` |
| 9 | Estados enviando / éxito / error y pantalla de confirmación | Visibilidad del estado del sistema (Nielsen #1) · feedback | `components/Contact.tsx` |
| 10 | Enlaces sin destino se muestran como «Repo/Demo pendiente» deshabilitado, nunca `#` | Coincidencia sistema–mundo real (Nielsen #2) · honestidad | `components/Projects.tsx` |
| 11 | Botones con relleno/borde, ícono de acción y desplazamiento al hover; enlaces externos con ↗ | Affordance y significantes | `components/ui/Button.tsx` |
| 12 | Toggle de tema, `Esc` cierra el menú, botón «volver arriba» | Control y libertad del usuario (Nielsen #3) | `ThemeToggle.tsx`, `Navbar.tsx`, `Footer.tsx` |
| 13 | Paleta «Medianoche violeta» de 6 colores + tintes derivados; único degradado: el fondo aurora, quieto y tenue | Estética y diseño minimalista (Nielsen #8) | `app/globals.css` |
| 14 | Línea de tiempo: académica a la izquierda (círculo teal), laboral a la derecha (cuadro rojo) + leyenda | Similitud (Gestalt) · consistencia | `components/Experience.tsx` |
| 15 | Habilidades por área con «en qué proyecto la usé», sin barras de % | Coincidencia con el mundo real · credibilidad | `components/Skills.tsx` |
| 16 | Motivo «Capas»: curvas de nivel, franja diagonal y tarjetas apiladas | Identidad y memorabilidad (diseño emocional) | `components/ui/Contours.tsx`, utilidad `layered` |

## Accesibilidad

- **Contraste AA verificado en ambos temas** (ratios en `docs/brief-diseno.md`). `iris` puro no se usa con texto encima (3.82:1); el botón usa `iris-700`. Para acentos de texto se usan `violet-300`/`mint` (oscuro) y `violet-700`/`mint-700` (claro).
- **Teclado:** enlace «Saltar al contenido», foco visible de 3 px en todo lo interactivo, orden de tabulación igual al visual, carrusel con flechas ←/→, menú móvil con `Esc` y retorno de foco.
- **Lectores de pantalla:** landmarks (`header`, `nav` ×2 con nombre, `main`, `section[aria-labelledby]`, `footer`), `aria-current` en el menú, `aria-expanded`/`aria-controls` en la hamburguesa, `aria-pressed` en filtros, región viva para el número de proyectos y para el carrusel, `aria-invalid` + `aria-describedby` en el formulario, íconos decorativos con `aria-hidden` y botones de solo ícono con `aria-label`.
- **Movimiento:** animaciones de entrada y parallax solo con `prefers-reduced-motion: no-preference`; el contenido nunca queda oculto si no hay JavaScript (la clase `.js` la pone el script inicial).
- **Tipografía:** 16 px mínimo para lectura y 12 px para etiquetas.
- **Tema:** respeta `prefers-color-scheme` en la primera visita y recuerda la elección.

## Limitaciones y mejoras

- Contenido pendiente (`TODO`): foto, CV real, testimonios reales, URLs de repos/demos, fechas.
- Las capturas de proyecto son PNG reales (Voz Segura desde su demo, Mudanzify en local y Vidalvl en el emulador) y `next/image` las sirve optimizadas.
- El formulario depende de Formspree (plan gratuito: 50 envíos/mes). Sin ID usa `mailto:`.
- Mejora posible: sección de actividad de GitHub (mapa de calor) con la API GraphQL y un token en el servidor; no se incluyó para no exponer claves ni depender de servicios de terceros.
- Mejora posible: página de detalle por proyecto (caso de estudio) y versión en inglés.

## Cambio de paleta (octubre 2026)

| Decisión | Principio | Dónde |
|---|---|---|
| Paleta «Medianoche violeta» en lugar de «ALONE», con los mismos roles semánticos (`--bg`, `--accent`, `--action`…) | Consistencia: el cambio se hizo en tokens, sin tocar la estructura | `app/globals.css` |
| Fondo aurora fijo y sin animación en lugar de curvas de nivel grandes por sección | Llena los espacios amplios sin distraer; cero costo de animación y respeta movimiento reducido | `.aurora` en `app/globals.css`, `app/layout.tsx` |
| Menta como color de detalle (experiencia laboral, punto del avatar) | Ley de Von Restorff: distingue tipos sin depender solo del color (también cambia ícono y forma) | `Experience.tsx`, `ui/Avatar.tsx` |
