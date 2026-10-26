# Brief de diseño — Portafolio de Mario Zambrano

## 1. Público y objetivo

- **Público:** el profesor de Diseño de Interfaces de Software (evaluador), reclutadores de prácticas y posibles clientes freelance.
- **Objetivo:** que en menos de 10 segundos se entienda *quién soy, qué hago y cómo ver mi trabajo*, y que en un minuto se pueda revisar un proyecto, descargar el CV o escribirme.
- **Requisitos fuente:** las 9 capturas de `assets/referencias/` (pestañas *Estructura* y *Secciones*) coinciden con la tabla del prompt. No se ven las pestañas **Entrega** ni **Checklist**; se tratan como pendientes.

## 2. Concepto: «Capas» con paleta «Perla y navy»

Historial de paletas: «ALONE» (verde azulado y rojo) → «Medianoche violeta» → **«Perla y navy»** (octubre 2026). El modo claro toma el gris perla y el azul marino de una referencia de portafolio; el modo oscuro, «navy nocturno», es su espejo: fondo azul marino casi negro con texto perla, para que cambiar de tema se sienta natural.

- **Fondo aurora (provisional):** resplandores marine y navy muy difusos, fijos detrás del contenido. Se reemplazará por el diseño de fondo nuevo.
- **Curvas de nivel en SVG** como detalle alrededor del avatar. Siempre `aria-hidden`.
- **La franja:** cinta diagonal en la base del Hero (periwinkle + marine en oscuro, navy en claro).
- **Tarjetas apiladas:** proyectos y formulario muestran capas detrás que se separan al pasar el cursor.

## 3. Paleta y contraste (WCAG 2.1, calculado)

| Token | Hex | Uso |
|---|---|---|
| `midnight` | `#0F1024` | Fondo oscuro |
| `harbor` | `#1B1D3A` | Tarjetas en oscuro, botón tonal |
| `navy` | `#2D2F55` | Texto, acento y botón en claro |
| `marine` | `#4A4E9E` | Botón en oscuro, franja, subrayados |
| `periwinkle` | `#A9ADF0` | Acento (texto/enlaces) en oscuro |
| `pearl` | `#E6E7EB` | Fondo claro / texto en oscuro |
| `snow` | `#F6F6F8` | Tarjetas en claro / texto sobre botones |
| `periwinkle-200` *(periwinkle 45 % + pearl)* | `#CBCDED` | Acento secundario en oscuro |
| `pearl-muted` *(pearl 72 % + midnight)* | `#AAABB3` | Texto secundario en oscuro |
| `navy-muted` *(navy 78 % + pearl)* | `#565776` | Texto secundario en claro |

| Combinación | Ratio | Veredicto |
|---|---|---|
| `pearl` sobre `midnight` / `harbor` | **15.18 / 13.24** | AAA |
| `periwinkle` sobre `midnight` / `harbor` | **8.86 / 7.73** | AAA |
| `pearl-muted` sobre `midnight` / `harbor` | **8.20 / 7.16** | AAA |
| `snow` sobre `marine` (botón oscuro) | **6.77:1** | AA |
| `navy` sobre `pearl` / `snow` (tema claro) | **10.30 / 11.80** | AAA |
| `navy-muted` sobre `pearl` / `snow` | **5.63 / 6.44** | AA |
| `marine` sobre `pearl` / `snow` | **6.92 / 7.93** | AA |
| `snow` sobre `navy` (botón claro) | **11.80:1** | AAA |
| `marine` sobre `midnight` | 2.57:1 | Solo decoración (franja, rombo) |

Los valores exactos están en `app/globals.css`.

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
│ «Hago software que se siente bien…»   ╲╲ franja del inicio   │
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
| **Estética minimalista** | Paleta de 7 colores + tintes; el único degradado es el fondo aurora, muy tenue (Nielsen #8). |
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
