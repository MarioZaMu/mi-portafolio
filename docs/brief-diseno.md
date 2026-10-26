# Brief de diseño — Portafolio de Mario Zambrano

## 1. Público y objetivo

- **Público:** el profesor de Diseño de Interfaces de Software (evaluador), reclutadores de prácticas y posibles clientes freelance.
- **Objetivo:** que en menos de 10 segundos se entienda *quién soy, qué hago y cómo ver mi trabajo*, y que en un minuto se pueda revisar un proyecto, descargar el CV o escribirme.
- **Requisitos fuente:** las 9 capturas de `assets/referencias/` (pestañas *Estructura* y *Secciones*) coinciden con la tabla del prompt. No se ven las pestañas **Entrega** ni **Checklist**; se tratan como pendientes.

## 2. Concepto: «Capas» con paleta «Medianoche violeta»

La primera versión usaba la paleta de la ilustración «ALONE» (verde azulado y rojo). En octubre de 2026 se cambió a **Medianoche violeta**, más moderna y cercana a mi interés por los videojuegos. La estructura y el concepto de capas se mantienen:

- **Fondo aurora:** manchas de luz violeta, iris y menta, muy difusas y quietas, fijas detrás de todo el contenido (`.aurora` en `app/globals.css`). Llenan los espacios amplios sin distraer y no se animan, así que no afectan el rendimiento ni a quien prefiere movimiento reducido.
- **Curvas de nivel en SVG** solo como detalle: anillos alrededor del avatar. Siempre `aria-hidden`.
- **La franja:** una cinta diagonal menta + violeta en la base del Hero.
- **Tarjetas apiladas:** proyectos y formulario muestran capas detrás que se separan al pasar el cursor.

## 3. Paleta y contraste (WCAG 2.1, calculado)

| Token | Hex | Uso |
|---|---|---|
| `night` | `#0E0B1F` | Fondo oscuro |
| `indigo` | `#1A1535` | Superficies / tarjetas |
| `violet` | `#8B7CFF` | Bordes, íconos, decoración, aurora |
| `iris` | `#6D5DFC` | Franja, subrayados, aurora |
| `frost` | `#ECEAF6` | Texto (oscuro) |
| `mint` | `#3DDC97` | Detalles: experiencia laboral, punto del avatar, franja |
| `violet-300` *(violet 55 % + frost)* | `#B7AEFB` | Texto/enlaces de acento en oscuro |
| `iris-700` *(iris 78 % + night)* | `#584BCB` | Relleno del botón principal (ambos temas) |
| `frost-muted` *(frost 75 % + night)* | `#B4B2C0` | Texto secundario en oscuro |
| `violet-700` *(violet 55 % + night)* | `#53499A` | Texto/enlaces de acento en claro |
| `mint-700` *(mint 48 % + night)* | `#256F59` | Acento menta como texto en claro |
| `night-muted` *(night 72 % + frost)* | `#4C495B` | Texto secundario en claro |

| Combinación | Ratio | Veredicto |
|---|---|---|
| `frost` sobre `night` / `indigo` | **16.26 / 14.69** | AAA |
| `frost` sobre `iris-700` (botón) | **5.38:1** | AA |
| `violet-300` sobre `night` / `indigo` | **9.63 / 8.70** | AAA |
| `mint` sobre `night` / `indigo` | **10.94 / 9.88** | AAA |
| `frost-muted` sobre `night` / `indigo` | **9.27 / 8.37** | AAA |
| `night` sobre lavanda `#F4F2FB` (tema claro) | **17.44:1** | AAA |
| `violet-700` sobre lavanda / superficie `#E9E5F8` | **6.79 / 6.11** | AA |
| `mint-700` sobre lavanda / superficie | **5.42 / 4.87** | AA |
| `night-muted` sobre lavanda / superficie | **7.85 / 7.06** | AAA / AA |
| ❌ `frost` sobre `iris` puro | 3.82:1 | Por eso el botón usa `iris-700` |
| `violet` sobre `night` | 5.91:1 | Bordes y decoración |

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
│ «Construyo software capa por capa…»   ╲╲ franja menta/violeta│
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
| **Estética minimalista** | Paleta de 6 colores + tintes; el único degradado es el fondo aurora, muy tenue (Nielsen #8). |
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
