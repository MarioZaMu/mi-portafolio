# Checklist de requisitos del profesor

Leyenda: ✅ cumplido · ⚠️ cumplido en código, falta contenido real (`TODO`) · ❌ pendiente

## Stack, estructura y entrega

| Requisito | Estado | Evidencia |
|---|---|---|
| Next.js (App Router) + TypeScript + Tailwind CSS | ✅ | `package.json` (Next 16.4, React 19, Tailwind 4) |
| Estructura `app/ · components/ · data/projects.ts · public/cv.pdf · public/images/` | ✅ | árbol del proyecto (extras: `components/ui/`, `lib/`, `data/*.ts`, `docs/`) |
| Un componente por sección en `components/` | ✅ | `Navbar, Hero, About, Projects, Testimonials, Experience, Contact, Skills, Footer .tsx` |
| `app/page.tsx` los une en el orden del mapa | ✅ | `app/page.tsx` |
| Desplegado en Vercel (`tu-nombre.vercel.app`) | ✅ | https://mario-zambrano.vercel.app · repo https://github.com/MarioZaMu/mi-portafolio (cada push a `main` publica) |

## Secciones

| # | Requisito | Estado | Evidencia |
|---|---|---|---|
| 1 | Menú con navegación a todas las secciones | ✅ | `components/Navbar.tsx` (escritorio + hamburguesa) |
| 2 | Nombre como título grande (`h1`) | ✅ | `Hero.tsx` |
| 2 | Rol / perfil | ✅ | `data/site.ts → role` |
| 2 | Foto o avatar | ⚠️ | `ui/Avatar.tsx`: monograma «MZ»; usa `public/images/profile.jpg` en cuanto exista |
| 2 | Frase corta | ✅ | `site.tagline` («Hago software que se siente bien al usarlo…») |
| 2 | Botón «Descargar CV» `href="/cv.pdf"` con `download` | ⚠️ | `Hero.tsx`; `public/cv.pdf` es provisional |
| 2 | Botón secundario (Ver proyectos) | ✅ | `Hero.tsx` |
| 3 | Párrafo en 1.ª persona, 3–5 líneas | ✅ | `site.about` (versión aprobada) |
| 3 | Foto o ilustración | ✅ | `About.tsx` (avatar en capas) |
| 3 | Habilidades / tecnologías | ✅ | `About.tsx` + `data/skills.ts` |
| 3 | Datos rápidos (ubicación, semestre, intereses) | ✅ | `About.tsx` (interés: desarrollo de videojuegos) |
| 4 | Tarjeta: imagen, título, descripción | ✅ | `Projects.tsx`; capturas reales de las 3 apps |
| 4 | Tecnologías como etiquetas | ✅ | `Chip` en cada tarjeta |
| 4 | Link a GitHub | ✅ | Voz Segura, Mudanzify y Vidalvl (+ backends) |
| 4 | Link a demo en vivo | ✅ | Voz Segura (web + APK), Mudanzify (instalador) y Vidalvl (APK); las descargas salen solas del último GitHub Release (`lib/releases.ts`, se actualiza cada 5 min) |
| 4 | Grid 1 col móvil, 2–3 escritorio | ✅ | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` |
| 4 | `target="_blank"` | ✅ | `ButtonLink external` → `target="_blank" rel="noopener noreferrer"` |
| 4 | Datos en `data/projects.ts`, tipado, `.map()` | ✅ | tipo `Project`, `projects.map` |
| 5 | Mínimo 3 testimonios con nombre, relación, avatar y texto | ❌ | Sección oculta por ahora (sin testimonios reales). `Testimonials.tsx` sigue listo: volver a ponerlo en `app/page.tsx` y en `navItems` antes de entregar |
| 5 | Tipo `Testimonial` + arreglo ≥ 3 | ✅ | `data/testimonials.ts` |
| 5 | Carrusel o grid (opcional) | ✅ | carrusel accesible con flechas, puntos y teclado |
| 6 | Académica y laboral | ✅ | `data/experience.ts` (UCC 2025 — Actualidad, Que Ricuras junio 2026 — Actualidad) |
| 6 | Fechas inicio/fin, institución, cargo, logros | ✅ | campos `date`, `place`, `title`, `description` |
| 6 | De la más reciente a la más antigua | ✅ | `sortedExperience` |
| 6 | Timeline con tipos diferenciados | ✅ | `Experience.tsx` (lado, color, ícono y leyenda) |
| 7 | Correo, LinkedIn, GitHub, WhatsApp (opc.) | ⚠️ | `Contact.tsx`; LinkedIn «Próximamente», WhatsApp opcional sin número |
| 7 | Formulario nombre/correo/mensaje | ✅ | `Contact.tsx` |
| 7 | `required` y `type="email"` | ✅ | atributos en los tres campos |
| 7 | Mensaje de confirmación | ✅ | panel «¡Mensaje enviado!» con `role="status"` |
| 7 | `"use client"` | ✅ | primera línea de `Contact.tsx` |
| 7 | Envío real (Formspree/EmailJS/Resend) | ⚠️ | Formspree listo; falta `NEXT_PUBLIC_FORMSPREE_ID` (sin él usa `mailto:`) |
| + | Sección adicional antes del pie | ✅ | `Skills.tsx` + modo oscuro/claro |
| 8 | Nombre y año con `new Date().getFullYear()` | ✅ | `Footer.tsx` |
| 8 | Íconos de redes | ✅ | `Footer.tsx` |
| 8 | Enlaces rápidos | ✅ | `Footer.tsx` |
| 8 | Botón volver arriba | ✅ | aparece tras ~1 pantalla de scroll |
| 8 | «Hecho con Next.js + Tailwind» | ✅ | `Footer.tsx` |

## Calidad

| Verificación | Resultado |
|---|---|
| `npm run build` | ✅ sin errores (página estática con ISR cada 5 min) |
| `npm run lint` | ✅ sin errores ni avisos |
| Enlaces con `href="#"` | ✅ ninguno |
| Consola del navegador | ✅ sin errores |
| Scroll horizontal a 360 px | ✅ `scrollWidth = 360` |
| Lighthouse móvil (build local) | Performance 87–93 (varía entre corridas) · Accesibilidad 100 · Buenas prácticas 100 · SEO 100 |

## Pruebas manuales

| Prueba | Estado |
|---|---|
| Escritorio 1440 px (Chromium) | ✅ revisado |
| Móvil 360 px: hamburguesa, `Esc`, foco de vuelta al botón | ✅ revisado |
| Tema claro / oscuro y persistencia | ✅ revisado |
| Validación del formulario (vacío → 3 errores, foco al primero) | ✅ revisado |
| 390, 768 y 1024 px | ❌ revisar antes de entregar |
| Firefox / Safari / Edge | ❌ revisar antes de entregar |
| Navegación completa solo con teclado (Tab / Shift+Tab) | ❌ revisar antes de entregar |
| Envío real con Formspree configurado | ❌ tras crear el formulario |
| Lector de pantalla (NVDA / VoiceOver) | ❌ opcional |

> Las pestañas **Entrega** y **Checklist** de la guía del profesor no aparecen en las capturas de `assets/referencias/`; si tienen requisitos extra, agrégalos aquí.
