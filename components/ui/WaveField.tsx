"use client";

import { useEffect, useRef } from "react";
import { smoothPath } from "@/lib/contours";
import { ACCENT_LINE, LINES, POINTS, VIEW_H, VIEW_W, shapes, type ShapeName } from "@/lib/shapes";

// Fondo de líneas fijo detrás de todo el contenido. Cada sección pide una forma con
// data-bg="…" y, al hacer scroll, las líneas se transforman de una forma a la siguiente.
// El servidor pinta las ondas del inicio en SVG (se ve igual sin JS); al cargar, un
// <canvas> toma el relevo porque redibujar en canvas es mucho más barato que reescribir
// el atributo `d` de 30 trazos en cada frame.

const initial = shapes.waves.map((line) => smoothPath(line, false));

// Cada forma como un arreglo plano [x0, y0, x1, y1…] por línea: interpolar sin crear objetos.
const flat = Object.fromEntries(
  Object.entries(shapes).map(([name, shape]) => [name, shape.map((line) => Float32Array.from(line.flat()))]),
) as Record<ShapeName, Float32Array[]>;

const buffer = new Float32Array(POINTS * 2);
const width = (i: number) => (i === ACCENT_LINE ? 1.7 : i % 6 === 5 ? 1.5 : 1);

/** Curva suave (Catmull-Rom → Bézier) trazada directamente desde el arreglo plano. */
function trace(ctx: CanvasRenderingContext2D, p: Float32Array) {
  const n = POINTS;
  const x = (i: number) => p[Math.max(0, Math.min(n - 1, i)) * 2];
  const y = (i: number) => p[Math.max(0, Math.min(n - 1, i)) * 2 + 1];
  ctx.beginPath();
  ctx.moveTo(x(0), y(0));
  for (let i = 0; i < n - 1; i++) {
    ctx.bezierCurveTo(
      x(i) + (x(i + 1) - x(i - 1)) / 6,
      y(i) + (y(i + 1) - y(i - 1)) / 6,
      x(i + 1) - (x(i + 2) - x(i)) / 6,
      y(i + 1) - (y(i + 2) - y(i)) / 6,
      x(i + 1),
      y(i + 1),
    );
  }
  ctx.stroke();
}

// La transformación ocurre en la franja central entre dos secciones;
// cada forma se queda quieta mientras su sección ocupa la pantalla.
const ease = (t: number) => {
  const u = Math.min(1, Math.max(0, (t - 0.3) / 0.4));
  return u * u * (3 - 2 * u);
};

export function WaveField() {
  const svgRef = useRef<SVGSVGElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let sections: { name: ShapeName; center: number }[] = [];
    let colors = { line: "", accent: "" };
    let frame = 0;
    let current = -1; // Posición dibujada: índice de sección + progreso (p. ej. 1.4)
    let lastTime = 0;

    // Los colores salen de las variables del tema (--wave, --wave-accent).
    function readColors() {
      const probe = document.createElement("span");
      document.body.appendChild(probe);
      probe.style.color = "var(--wave)";
      const line = getComputedStyle(probe).color;
      probe.style.color = "var(--wave-accent)";
      const accent = getComputedStyle(probe).color;
      probe.remove();
      colors = { line, accent };
    }

    // Tamaño real del canvas (con densidad de píxeles) y posiciones de las secciones.
    // Se leen solo al cambiar el tamaño, nunca en cada frame.
    function measure() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas!.clientWidth;
      const h = canvas!.clientHeight;
      if (canvas!.width !== Math.round(w * dpr) || canvas!.height !== Math.round(h * dpr)) {
        canvas!.width = Math.round(w * dpr);
        canvas!.height = Math.round(h * dpr);
      }
      sections = Array.from(document.querySelectorAll<HTMLElement>("[data-bg]")).map((el) => {
        const r = el.getBoundingClientRect();
        return { name: el.dataset.bg as ShapeName, center: r.top + window.scrollY + r.height / 2 };
      });
    }

    function target() {
      const mid = window.scrollY + window.innerHeight / 2;
      let i = 0;
      while (i < sections.length - 1 && sections[i + 1].center <= mid) i++;
      if (i === sections.length - 1) return i;
      const t = (mid - sections[i].center) / (sections[i + 1].center - sections[i].center);
      return i + ease(Math.max(0, t));
    }

    function draw(pos: number) {
      const i = Math.floor(pos);
      const t = pos - i;
      const a = flat[sections[i]?.name] ?? flat.waves;
      const b = flat[sections[Math.min(i + 1, sections.length - 1)]?.name] ?? a;

      // Igual que preserveAspectRatio="xMidYMid slice" del SVG.
      const cw = canvas!.width;
      const ch = canvas!.height;
      const scale = Math.max(cw / VIEW_W, ch / VIEW_H);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx!.setTransform(1, 0, 0, 1, 0, 0);
      ctx!.clearRect(0, 0, cw, ch);
      ctx!.setTransform(scale, 0, 0, scale, (cw - VIEW_W * scale) / 2, (ch - VIEW_H * scale) / 2);
      ctx!.lineJoin = "round";
      for (let k = 0; k < LINES; k++) {
        const la = a[k];
        const lb = b[k];
        for (let j = 0; j < buffer.length; j++) buffer[j] = la[j] + (lb[j] - la[j]) * t;
        ctx!.strokeStyle = k === ACCENT_LINE ? colors.accent : colors.line;
        ctx!.lineWidth = (width(k) * dpr) / scale; // Grosor constante en píxeles de pantalla.
        trace(ctx!, buffer);
      }
    }

    // Bucle con amortiguación: las líneas "persiguen" al scroll en vez de saltar con cada
    // paso de la rueda, y el bucle se detiene solo cuando ya llegaron.
    function tick(now: number) {
      frame = 0;
      if (!sections.length) return;
      const goal = reduce.matches ? Math.round(target()) : target();
      const dt = lastTime ? Math.min(64, now - lastTime) : 16;
      lastTime = now;
      const next = current < 0 || reduce.matches ? goal : current + (goal - current) * (1 - Math.exp(-dt / 120));
      const settled = Math.abs(goal - next) < 0.001;
      const pos = settled ? goal : next;
      if (Math.abs(pos - current) > 0.0003) {
        current = pos;
        draw(pos);
      }
      if (!settled) frame = requestAnimationFrame(tick);
      else lastTime = 0;
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };
    // Tras un cambio de tamaño o de tema se redibuja aunque la posición no cambie.
    const redraw = () => {
      measure();
      if (current >= 0) draw(current);
      schedule();
    };
    const retheme = () => {
      readColors();
      if (current >= 0) draw(current);
    };

    readColors();
    measure();
    schedule();
    // El canvas ya dibujó: se oculta el SVG del servidor.
    requestAnimationFrame(() => {
      if (svgRef.current) svgRef.current.style.display = "none";
      canvas.style.opacity = "1";
    });

    const resize = new ResizeObserver(redraw);
    resize.observe(document.body);
    resize.observe(canvas);
    const theme = new MutationObserver(retheme);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    window.addEventListener("scroll", schedule, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      theme.disconnect();
      window.removeEventListener("scroll", schedule);
    };
  }, []);

  return (
    <>
      <svg
        ref={svgRef}
        aria-hidden="true"
        focusable="false"
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none fixed inset-0 -z-40 h-full w-full select-none"
      >
        <g fill="none" strokeLinejoin="round">
          {initial.map((d, i) => (
            <path
              key={i}
              d={d}
              stroke={i === ACCENT_LINE ? "var(--wave-accent)" : "var(--wave)"}
              strokeWidth={width(i)}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </g>
      </svg>
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-40 h-full w-full opacity-0" />
      {/* Desvanece las líneas hacia abajo (más barato que una máscara sobre el fondo animado) */}
      <div aria-hidden="true" className="wave-fade pointer-events-none fixed inset-0 -z-30" />
    </>
  );
}
