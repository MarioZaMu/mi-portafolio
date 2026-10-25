// Generador determinista de curvas de nivel (motivo "Capas").
// Se ejecuta en el servidor/build: el navegador solo recibe <path> estáticos.

type Point = [number, number];

/** PRNG mulberry32: misma semilla → mismo dibujo en cada build. */
function random(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Catmull-Rom → Bézier cúbica: curvas suaves que pasan por todos los puntos. */
function smoothPath(points: Point[], closed: boolean) {
  const n = points.length;
  const at = (i: number) => (closed ? points[(i + n) % n] : points[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${r1(points[0][0])} ${r1(points[0][1])}`;
  const last = closed ? n : n - 1;
  for (let i = 0; i < last; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    const c1: Point = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Point = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${r1(c1[0])} ${r1(c1[1])} ${r1(c2[0])} ${r1(c2[1])} ${r1(p2[0])} ${r1(p2[1])}`;
  }
  return closed ? `${d}Z` : d;
}

type Harmonic = { k: number; amp: number; phase: number; drift: number };

function harmonics(rand: () => number, wobble: number, ks: number[]): Harmonic[] {
  return ks.map((k) => ({
    k,
    amp: (wobble * (0.4 + rand() * 0.6)) / Math.sqrt(k),
    phase: rand() * Math.PI * 2,
    drift: (rand() - 0.5) * 0.35,
  }));
}

export type RingsOptions = {
  cx: number;
  cy: number;
  count: number;
  minRadius: number;
  step: number;
  seed: number;
  wobble?: number;
  points?: number;
};

/** Anillos concéntricos deformados, como una cima vista en un mapa topográfico. */
export function contourRings({ cx, cy, count, minRadius, step, seed, wobble = 0.16, points = 36 }: RingsOptions) {
  const rand = random(seed);
  const hs = harmonics(rand, wobble, [2, 3, 5]);
  return Array.from({ length: count }, (_, i) => {
    const radius = minRadius + i * step;
    const pts: Point[] = Array.from({ length: points }, (_, j) => {
      const t = (j / points) * Math.PI * 2;
      const f = 1 + hs.reduce((acc, h) => acc + h.amp * Math.sin(h.k * t + h.phase + i * h.drift), 0);
      return [cx + Math.cos(t) * radius * f, cy + Math.sin(t) * radius * f];
    });
    return smoothPath(pts, true);
  });
}

export type LinesOptions = {
  width: number;
  height: number;
  count: number;
  seed: number;
  /** Altura inicial de la primera línea (0–1 relativo a height). */
  start?: number;
  /** Separación entre líneas en unidades del viewBox. */
  gap?: number;
  /** Inclinación total (en unidades) de izquierda a derecha. */
  slope?: number;
  amplitude?: number;
  points?: number;
};

/** Líneas que fluyen de lado a lado, como estratos o la franja de la ilustración. */
export function contourLines({
  width,
  height,
  count,
  seed,
  start = 0.2,
  gap = 14,
  slope = 0,
  amplitude = 22,
  points = 14,
}: LinesOptions) {
  const rand = random(seed);
  const hs = harmonics(rand, 1, [1, 2, 3]);
  return Array.from({ length: count }, (_, i) => {
    const pts: Point[] = Array.from({ length: points + 1 }, (_, j) => {
      const x = (j / points) * width;
      const u = (j / points) * Math.PI * 2;
      const wave = hs.reduce((acc, h) => acc + h.amp * Math.sin(h.k * u + h.phase + i * h.drift), 0);
      return [x, height * start + i * gap + (slope * j) / points + wave * amplitude * 0.5];
    });
    return smoothPath(pts, false);
  });
}

/** Banda rellena entre dos líneas paralelas (la "franja" mist/crimson). */
export function ribbon(options: LinesOptions & { thickness: number }) {
  const start = options.start ?? 0.2;
  // Misma semilla → misma forma: la línea inferior es la superior desplazada.
  const [top] = contourLines({ ...options, count: 1, start });
  const [bottom] = contourLines({ ...options, count: 1, start: start + options.thickness / options.height });
  // Recorre la línea inferior en sentido inverso para cerrar el polígono.
  const bottomPts = bottom
    .replace(/^M/, "")
    .split("C")
    .flatMap((seg) => seg.trim().split(" "))
    .filter(Boolean)
    .map(Number);
  const coords: Point[] = [];
  for (let i = 0; i < bottomPts.length; i += 2) coords.push([bottomPts[i], bottomPts[i + 1]]);
  const reversed = coords.reverse();
  let d = `${top}L${reversed[0][0]} ${reversed[0][1]}`;
  for (let i = 1; i + 2 < reversed.length; i += 3) {
    d += `C${reversed[i][0]} ${reversed[i][1]} ${reversed[i + 1][0]} ${reversed[i + 1][1]} ${reversed[i + 2][0]} ${reversed[i + 2][1]}`;
  }
  return `${d}Z`;
}
