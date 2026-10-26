"use client";

import { useEffect, useRef } from "react";
import { smoothPath } from "@/lib/contours";
import { ACCENT_LINE, VIEW_H, VIEW_W, mix, shapes, type Shape, type ShapeName } from "@/lib/shapes";

// Fondo de líneas fijo detrás de todo el contenido. Cada sección pide una forma con
// data-bg="…" y, al hacer scroll, las líneas se transforman de una forma a la siguiente.
// El servidor ya pinta las ondas del inicio, así que sin JS el fondo se ve igual.

const toD = (shape: Shape) => shape.map((line) => smoothPath(line, false));
const initial = toD(shapes.waves);

// Suavizado: la transformación ocurre en la franja central entre dos secciones,
// y cada forma se queda quieta mientras su sección ocupa la pantalla.
const ease = (t: number) => {
  const u = Math.min(1, Math.max(0, (t - 0.3) / 0.4));
  return u * u * (3 - 2 * u);
};

export function WaveField() {
  const groupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const paths = Array.from(groupRef.current?.querySelectorAll("path") ?? []);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = "";

    function render() {
      frame = 0;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-bg]"));
      if (!sections.length) return;
      const mid = window.innerHeight / 2;
      // Centro de cada sección relativo al centro de la pantalla.
      const centers = sections.map((s) => {
        const r = s.getBoundingClientRect();
        return r.top + r.height / 2 - mid;
      });
      let i = 0;
      while (i < centers.length - 1 && centers[i + 1] <= 0) i++;
      const next = Math.min(i + 1, sections.length - 1);
      let t = next === i ? 0 : ease(-centers[i] / (centers[next] - centers[i]));
      if (reduce.matches) t = Math.round(t); // Sin transición continua: cambia de golpe.

      const a = sections[i].dataset.bg as ShapeName;
      const b = sections[next].dataset.bg as ShapeName;
      const key = `${a}|${b}|${t.toFixed(3)}`;
      if (key === last) return;
      last = key;
      const ds = toD(mix(shapes[a] ?? shapes.waves, shapes[b] ?? shapes.waves, t));
      paths.forEach((p, k) => p.setAttribute("d", ds[k]));
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMid slice"
      className="wave-field pointer-events-none fixed inset-0 -z-40 h-full w-full select-none"
    >
      <g ref={groupRef} fill="none" strokeLinejoin="round">
        {initial.map((d, i) => (
          <path
            key={i}
            d={d}
            stroke={i === ACCENT_LINE ? "var(--wave-accent)" : "var(--wave)"}
            strokeWidth={i === ACCENT_LINE ? 1.6 : i % 6 === 5 ? 1.4 : 0.9}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}
