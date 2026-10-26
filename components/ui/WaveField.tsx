// Fondo de líneas onduladas: decorativo, fijo detrás de todo el contenido.
// Se genera en el servidor (sin JS en el cliente) y siempre da el mismo dibujo.

const W = 1600;
const H = 1000;
const LINES = 34;
const STEP = 32;

function wave(i: number) {
  const base = (i + 0.5) * (H / LINES) * 1.15 - H * 0.08;
  // Dos armónicos con fase que avanza por línea: las ondas "fluyen" en diagonal.
  const a1 = 26 + (i % 5) * 3;
  const a2 = 11;
  const phase = i * 0.32;
  let d = "";
  for (let x = -STEP; x <= W + STEP; x += STEP) {
    const t = x / W;
    const y =
      base +
      a1 * Math.sin(t * Math.PI * 2.4 + phase) +
      a2 * Math.sin(t * Math.PI * 5.3 - phase * 1.7) -
      t * 90;
    d += `${x === -STEP ? "M" : "L"}${x} ${y.toFixed(1)}`;
  }
  return d;
}

const paths = Array.from({ length: LINES }, (_, i) => wave(i));

export function WaveField() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="wave-field pointer-events-none fixed inset-0 -z-40 h-full w-full select-none"
    >
      <g fill="none" stroke="var(--wave)" strokeLinejoin="round">
        {paths.map((d, i) => (
          <path key={i} d={d} strokeWidth={i % 6 === 5 ? 1.4 : 0.9} vectorEffect="non-scaling-stroke" />
        ))}
      </g>
    </svg>
  );
}
