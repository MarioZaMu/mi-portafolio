// Formas del fondo animado. Todas tienen el mismo número de trazos y de puntos por trazo,
// así se pueden interpolar punto a punto: las ondas del inicio se "enrollan" en anillos,
// los anillos se abren en curvas de nivel, etc. Coordenadas en un viewBox de 1600 × 1000.

import { random, type Point } from "./contours";

export const VIEW_W = 1600;
export const VIEW_H = 1000;
export const LINES = 30;
export const POINTS = 48;
/** Trazo que se dibuja con el color de acento (como la línea roja de la referencia). */
export const ACCENT_LINE = 9;

export type Shape = Point[][];
export type ShapeName = "waves" | "rings" | "topo" | "flow" | "topo-b";

/** Ondas horizontales que fluyen en diagonal (las del inicio). */
function waves(): Shape {
  return Array.from({ length: LINES }, (_, i) => {
    const base = (i + 0.5) * (VIEW_H / LINES) * 1.15 - VIEW_H * 0.08;
    const a1 = 26 + (i % 5) * 3;
    const phase = i * 0.32;
    return Array.from({ length: POINTS }, (_, j) => {
      const t = j / (POINTS - 1);
      const x = -40 + t * (VIEW_W + 80);
      const y =
        base + a1 * Math.sin(t * Math.PI * 2.4 + phase) + 11 * Math.sin(t * Math.PI * 5.3 - phase * 1.7) - t * 90;
      return [x, y] as Point;
    });
  });
}

type Peak = { cx: number; cy: number; count: number; r0: number; step: number; seed: number; wobble: number };

/** Anillos deformados alrededor de una o varias cimas, como un mapa topográfico. */
function peaks(list: Peak[]): Shape {
  const shape: Shape = [];
  for (const p of list) {
    const rand = random(p.seed);
    const hs = [2, 3, 5].map((k) => ({
      k,
      amp: (p.wobble * (0.4 + rand() * 0.6)) / Math.sqrt(k),
      phase: rand() * Math.PI * 2,
      drift: (rand() - 0.5) * 0.35,
    }));
    for (let i = 0; i < p.count; i++) {
      const r = p.r0 + i * p.step;
      shape.push(
        Array.from({ length: POINTS }, (_, j) => {
          // El último punto coincide con el primero: el anillo queda cerrado.
          const t = (j / (POINTS - 1)) * Math.PI * 2;
          const f = 1 + hs.reduce((acc, h) => acc + h.amp * Math.sin(h.k * t + h.phase + i * h.drift), 0);
          return [p.cx + Math.cos(t) * r * f, p.cy + Math.sin(t) * r * f * 0.82] as Point;
        }),
      );
    }
  }
  return shape;
}

/** Líneas verticales suaves que acompañan la línea de tiempo de la experiencia. */
function flow(): Shape {
  return Array.from({ length: LINES }, (_, i) => {
    const base = -80 + i * ((VIEW_W + 160) / (LINES - 1));
    const phase = i * 0.27;
    return Array.from({ length: POINTS }, (_, j) => {
      const t = j / (POINTS - 1);
      const y = -40 + t * (VIEW_H + 80);
      const x = base + 38 * Math.sin(t * Math.PI * 2.2 + phase) + 12 * Math.sin(t * Math.PI * 5 - phase * 1.5) + t * 60;
      return [x, y] as Point;
    });
  });
}

export const shapes: Record<ShapeName, Shape> = {
  waves: waves(),
  rings: peaks([{ cx: 470, cy: 520, count: LINES, r0: 24, step: 30, seed: 7, wobble: 0.14 }]),
  topo: peaks([
    { cx: 1260, cy: 230, count: 12, r0: 26, step: 28, seed: 11, wobble: 0.24 },
    { cx: 280, cy: 760, count: 11, r0: 30, step: 30, seed: 23, wobble: 0.22 },
    { cx: 860, cy: 560, count: 7, r0: 20, step: 22, seed: 5, wobble: 0.3 },
  ]),
  flow: flow(),
  "topo-b": peaks([
    { cx: 300, cy: 220, count: 11, r0: 28, step: 30, seed: 31, wobble: 0.22 },
    { cx: 1320, cy: 720, count: 12, r0: 24, step: 29, seed: 17, wobble: 0.24 },
    { cx: 820, cy: 420, count: 7, r0: 18, step: 24, seed: 3, wobble: 0.3 },
  ]),
};

/** Mezcla dos formas (t de 0 a 1). */
export function mix(a: Shape, b: Shape, t: number): Shape {
  if (t <= 0) return a;
  if (t >= 1) return b;
  return a.map((line, i) => line.map(([x, y], j) => [x + (b[i][j][0] - x) * t, y + (b[i][j][1] - y) * t] as Point));
}
