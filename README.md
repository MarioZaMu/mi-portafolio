# Portafolio · Mario Alberto Zambrano Muñoz

Portafolio personal para la materia **Diseño de Interfaces de Software** (Universidad Cooperativa de Colombia, Pasto). Concepto visual **«Capas»**: curvas de nivel, estratos y la franja diagonal de la ilustración «ALONE» que define la paleta.

> Capturas: `TODO` agrega aquí imágenes del sitio publicado (escritorio y móvil).

## Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19 + TypeScript
- Tailwind CSS 4 (tokens en `@theme`, sin `tailwind.config`)
- `next/font`: Fraunces (títulos), Manrope (texto), JetBrains Mono (etiquetas)
- Formspree para el formulario de contacto
- Sin librerías de UI: íconos y curvas de nivel en SVG propio

## Estructura

```
app/          layout.tsx · page.tsx · globals.css · icon.svg · opengraph-image.tsx
components/   Navbar · Hero · About · Projects · Testimonials · Experience · Contact · Skills · Footer
components/ui Botones, chips, tarjetas, avatar, curvas de nivel, toggle de tema
data/         projects.ts · site.ts · testimonials.ts · experience.ts · skills.ts
lib/          contours.ts (generador de curvas de nivel)
public/       cv.pdf · images/
docs/         brief-diseno.md · decisiones-ux.md · checklist.md
```

## Desarrollo

```bash
npm install
```

```bash
npm run dev
```

Abre http://localhost:3000. Antes de entregar: `npm run lint` y `npm run build`.

## Cómo editar el contenido

Todo el texto vive en `data/`; no hace falta tocar los componentes.

| Quiero cambiar… | Archivo |
|---|---|
| Nombre, rol, frase, «Acerca de mí», correo, LinkedIn, WhatsApp | `data/site.ts` |
| Proyectos (agregar uno = agregar un objeto) | `data/projects.ts` |
| Testimonios (mínimo 3, reales y con permiso) | `data/testimonials.ts` |
| Experiencia académica y laboral | `data/experience.ts` |
| Habilidades por área | `data/skills.ts` |
| Foto de perfil | guarda `public/images/profile.jpg` (se detecta sola al compilar) |
| CV | reemplaza `public/cv.pdf` |
| Botón de descarga (APK / instalador) | nada: publica un release en GitHub y aparece solo en ≤ 5 min (campo `releaseRepo`) |
| Capturas de proyectos | `public/images/projects/` (1600 × 1000) y el campo `image` en `data/projects.ts` |

Busca `TODO` en el proyecto para ver lo que falta.

## Cómo cambiar la paleta

Los 5 colores base están en un solo lugar: el bloque `@theme` de `app/globals.css`. Los tintes (`teal-300`, `crimson-300`, etc.) se calculan con `color-mix` a partir de ellos, y los colores semánticos de cada tema (`--bg`, `--fg`, `--accent`…) están justo debajo. Si cambias la paleta, vuelve a comprobar el contraste (mínimo 4.5:1 para texto).

## Formulario de contacto (Formspree)

1. Crea una cuenta en https://formspree.io y un formulario nuevo con tu correo.
2. Copia el ID (la parte final de `https://formspree.io/f/XXXXXXXX`).
3. Crea `.env.local` a partir de `.env.example` y pon `NEXT_PUBLIC_FORMSPREE_ID=XXXXXXXX`.
4. En Vercel agrega la misma variable en *Settings → Environment Variables* y vuelve a desplegar.

Sin ID, el formulario abre el cliente de correo del visitante con el mensaje ya escrito (`mailto:`). El campo oculto `_gotcha` es una trampa anti-spam.

## Despliegue en Vercel

1. Sube el proyecto a un repositorio de GitHub (p. ej. `MarioZaMu/mi-portafolio`).
2. En https://vercel.com/new importa el repositorio (Vercel detecta Next.js solo).
3. Agrega las variables `NEXT_PUBLIC_FORMSPREE_ID` y `NEXT_PUBLIC_SITE_URL` (la URL final, p. ej. `https://mario-zambrano.vercel.app`).
4. Despliega. Para cambiar el subdominio: *Settings → Domains*.

Cada `git push` a la rama principal vuelve a publicar el sitio.

## Documentación

- `docs/brief-diseno.md`: concepto, paleta con contrastes, tipografía, wireframes.
- `docs/decisiones-ux.md`: decisiones → principios/heurísticas, accesibilidad y limitaciones.
- `docs/checklist.md`: requisitos del profesor con evidencia.
