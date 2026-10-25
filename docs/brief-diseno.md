# Brief de diseño — Portafolio de Mario Zambrano

## 1. Público y objetivo

- **Público:** el profesor de Diseño de Interfaces de Software (evaluador), reclutadores de prácticas y posibles clientes freelance.
- **Objetivo:** que en menos de 10 segundos se entienda *quién soy, qué hago y cómo ver mi trabajo*, y que en un minuto se pueda revisar un proyecto, descargar el CV o escribirme.
- **Requisitos fuente:** las 9 capturas de `assets/referencias/` (pestañas *Estructura* y *Secciones*) coinciden con la tabla del prompt. No se ven las pestañas **Entrega** ni **Checklist**; se tratan como pendientes.

## 2. Concepto: «Capas»

La paleta sale de una ilustración aérea: agua profunda con **curvas de nivel**, una franja de arena y una franja roja que cruzan en diagonal. El portafolio se lee como un **corte del terreno**:

- **Curvas de nivel en SVG** generadas por código (anillos deformados con ruido determinista) como fondo del Hero y de varias secciones, siempre `aria-hidden` y sin eventos.
- **Estratos:** cada sección es una capa con su altitud. Las etiquetas mono imitan una carta topográfica: `02 · ACERCA DE MÍ · 2 527 m` (altitud real de Pasto).
- **La franja:** una cinta diagonal `mist` + `crimson` atraviesa el Hero, en homenaje directo a la ilustración. Es el único gran uso de rojo; el resto del rojo se reserva para la acción principal.
- **Tarjetas apiladas:** proyectos y testimonios muestran capas detrás (sombras desplazadas en `teal`/`deep`) que se separan al pasar el cursor.

## 3. Paleta y contraste (WCAG 2.1, calculado)

| Token | Hex | Uso |
|---|---|---|
| `abyss` | `#0E2931` | Fondo oscuro |
| `deep` | `#12484C` | Superficies / tarjetas |
| `teal` | `#2B7574` | Bordes, íconos, decoración |
| `crimson` | `#861211` | Relleno de botón primario, franja |
| `mist` | `#E2E2E0` | Texto (oscuro) / fondo (claro) |
| `teal-300` *(derivado: teal 40 % + mist 60 %)* | `#99B6B5` | Texto/enlaces de acento en oscuro |
| `crimson-300` *(crimson 25 % + mist 75 %)* | `#CBAEAC` | Acento rojo como texto en oscuro |
| `mist-muted` *(mist 75 % + abyss 25 %)* | `#ADB4B4` | Texto secundario en oscuro |
| `teal-700` *(teal 70 % + abyss 30 %)* | `#225E60` | Texto/enlaces de acento en claro |
| `abyss-muted` *(abyss 75 % + mist 25 %)* | `#43575D` | Texto secundario en claro |

| Combinación | Ratio | Veredicto |
|---|---|---|
| `mist` sobre `abyss` | **11.73:1** | AAA |
| `mist` sobre `deep` | **7.87:1** | AAA |
| `mist` sobre `crimson` (botón) | **7.68:1** | AAA |
| `teal-300` sobre `abyss` / `deep` | **7.04 / 4.72** | AAA / AA |
| `crimson-300` sobre `abyss` / `deep` | **7.38 / 4.95** | AAA / AA |
| `mist-muted` sobre `abyss` / `deep` | **7.22 / 4.84** | AAA / AA |
| `abyss` sobre `mist` (tema claro) | **11.73:1** | AAA |
| `teal-700` sobre `mist` | **5.70:1** | AA |
| `abyss-muted` sobre `mist` | **5.87:1** | AA |
| `crimson` sobre `mist` | **7.68:1** | AAA (en claro sí sirve como texto) |
| ❌ `crimson` sobre `abyss` | 1.53:1 | Prohibido como texto |
| ❌ `teal` sobre `abyss` | 2.83:1 | Solo decoración / bordes (≥3:1 no se exige a decoración) |

Tema claro: superficie `mist-2` = mist 92 % + teal 8 % (`#D3D9D7`); `abyss` encima 10.63:1 y `crimson` 6.96:1. Los valores exactos están en `app/globals.css` y se verifican en `docs/decisiones-ux.md`.

## 4. Tipografía

- **Fraunces** (serif variable; solo eje de peso para aligerar la carga): títulos grandes. Tiene carácter editorial y curvas blandas que dialogan con las curvas de nivel.
- **Manrope** (sans geométrica humanista): lectura. Alta legibilidad a 16 px y buena x-height.
- **JetBrains Mono**: etiquetas tipo carta topográfica, fechas, chips.

Escala (ratio ≈ 1.25, rem): 12 · 14 · 16 · 18 · 20 · 24 · 30 · 38 · 48 · 60 · 76 px (el nombre del Hero usa `clamp()` hasta ~96 px). Mínimos: **16 px lectura, 12 px etiquetas**.

## 5. Espaciado y retícula

Base de **4 px**; los bloques usan múltiplos de 8 (8, 16, 24, 32, 48, 64, 96, 128). Contenedor máx. 1200 px con gutter de 16 px (móvil) / 32 px (escritorio). Radio: 4 px (chips), 16 px (tarjetas), 28 px (capas grandes).

## 6. Wireframes

**Escritorio (≥1024 px)**

```
┌──────────────────────────────────────────────────────────────┐
│ MZ  Inicio Sobre mí Proyectos Testimonios Experiencia …  ◐   │  navbar fija + blur
├──────────────────────────────────────────────────────────────┤
│ N 01°12′ · O 77°16′ · 2 527 m          ╭──────────╮ ≈≈≈≈≈≈   │
│ Mario Alberto                          │  (( MZ )) │ curvas   │
│ Zambrano Muñoz                         │  anillos  │ de nivel │
│ Desarrollador de software · 4.º sem.   ╰──────────╯          │
│ «Construyo software capa por capa…»   ╲╲ franja mist/crimson │
│ [↓ Descargar CV]  [Ver proyectos]       ╲╲                   │
├──────────────────────────────────────────────────────────────┤
│ 02 · ACERCA DE MÍ                                             │
│ ┌ retrato/capas ┐  Párrafo 1.ª persona     ┌ datos rápidos ┐  │
│ └───────────────┘  chips de tecnologías    └───────────────┘  │
├──────────────────────────────────────────────────────────────┤
│ 03 · PROYECTOS   [Todos][Kotlin][Firebase][Java]…            │
│ ┌card┐ ┌card┐ ┌card┐                                         │
│ ┌card┐ ┌card┐                       grid 3 col              │
├──────────────────────────────────────────────────────────────┤
│ 04 · TESTIMONIOS   capas apiladas   ‹  ● ○ ○  ›              │
├──────────────────────────────────────────────────────────────┤
│ 05 · EXPERIENCIA  leyenda ● académica ● laboral               │
│        │● 2026 …                                              │
│        │● 2025 …           línea de tiempo vertical           │
├──────────────────────────────────────────────────────────────┤
│ 06 · CONTACTO  [correo][GitHub][LinkedIn] │ formulario        │
├──────────────────────────────────────────────────────────────┤
│ 07 · HABILIDADES (adicional)  estratos: Lenguajes / Frameworks│
├──────────────────────────────────────────────────────────────┤
│ footer: nombre ©año · redes · enlaces · ↑ · créditos          │
└──────────────────────────────────────────────────────────────┘
```

**Móvil (360–390 px)**

```
┌──────────────────────┐
│ MZ            ◐  ☰   │
├──────────────────────┤
│ (( MZ ))             │
│ Mario Alberto        │
│ Zambrano Muñoz       │
│ rol · frase          │
│ [↓ Descargar CV]     │  botones a ancho completo
│ [Ver proyectos]      │
├──────────────────────┤
│ Sobre mí → datos →   │
│ chips                │
├──────────────────────┤
│ [filtros ↔ scroll]   │
│ card                 │  1 columna
│ card                 │
├──────────────────────┤
│ testimonio ‹ ● ›     │
│ timeline (izq.)      │
│ contacto + form      │
│ habilidades          │
│ footer               │
└──────────────────────┘
```

**Layout elegido:** secciones a ancho completo tipo editorial (no columna sticky). Justificación: con 8+ secciones, una columna lateral fija reduce el ancho útil de la grilla de proyectos (la sección más importante) y complica el móvil; la identidad se mantiene en el navbar.

## 7. Principios de interfaz y dónde se aplican

| Principio | Aplicación |
|---|---|
| **Jerarquía** | Nombre en serif ~96 px > títulos de sección 38–48 px > cuerpo 16–18 px. Un solo `h1`. |
| **Consistencia** | Mismo componente de título de sección, misma tarjeta, mismos botones en todo el sitio (Nielsen #4). |
| **Proximidad** | Etiquetas de tecnología pegadas a su proyecto; botones GitHub/Demo agrupados al pie de cada tarjeta. |
| **Contraste** | Rojo solo para la acción principal (Descargar CV, Enviar). Todo texto ≥ AA. |
| **Feedback** | Estados enviando/éxito/error del formulario, sección activa en el menú, hover/focus visibles (Nielsen #1). |
| **Affordance** | Botones con borde/relleno e ícono de flecha o descarga; enlaces externos con ícono ↗. |
| **Ley de Fitts** | Objetivos ≥ 44×44 px; CTA del Hero grandes y cerca del contenido que leen. |
| **Ley de Hick** | Navbar con 7 enlaces cortos; filtro de proyectos con pocas tecnologías principales. |
| **Reconocer vs. recordar** | Navbar fija con sección activa resaltada (Nielsen #6). |
| **Prevención de errores** | Validación en línea del formulario con mensajes claros (Nielsen #5 y #9). |
| **Estética minimalista** | Paleta de 5 colores + tintes, sin gradientes pastel ni emojis (Nielsen #8). |
| **Control y libertad** | Toggle de tema, menú que cierra con `Esc`, botón volver arriba (Nielsen #3). |

## 8. Pendientes (`TODO`) que debe resolver Mario

1. Foto real (`public/images/profile.jpg`) — mientras tanto se usa avatar con iniciales «MZ».
2. CV real (`public/cv.pdf`) — se genera un PDF provisional marcado.
3. URLs de GitHub de **Que Ricuras**, **MediHome** y **AgroTec** (no están públicos en `github.com/MarioZaMu`).
4. URLs de demo en vivo de los 5 proyectos (o enlace a video/APK para las apps nativas).
5. Capturas reales de cada proyecto.
6. Fechas de inicio en la UCC, cursos/certificados y experiencia laboral real.
7. **Tres testimonios reales** (nombre, relación, texto y permiso).
8. Número de WhatsApp (opcional) y LinkedIn cuando exista.
9. ID de Formspree para que el formulario envíe correos.
10. Revisar el borrador de «Acerca de mí», intereses y niveles de habilidades.
