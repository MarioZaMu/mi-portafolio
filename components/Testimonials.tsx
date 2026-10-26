"use client";

import { useState, type KeyboardEvent } from "react";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { Icon } from "./ui/Icon";
import { Container, SectionHeading } from "./ui/Primitives";

const initials = (name: string) =>
  name
    .split(" ")
    .filter((w) => w.length > 2)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");

function Person({ t }: { t: Testimonial }) {
  return (
    <div className="flex items-center gap-4">
      {t.avatar ? (
        // eslint-disable-next-line @next/next/no-img-element -- avatares pequeños opcionales
        <img src={t.avatar} alt="" width={56} height={56} className="h-12 w-12 rounded-full border border-line object-cover" />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-harbor font-display text-lg italic text-pearl"
        >
          {initials(t.name)}
        </span>
      )}
      <div>
        <p className="font-semibold text-fg">{t.name}</p>
        <p className="text-sm text-muted">{t.role}</p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const total = testimonials.length;
  const go = (i: number) => setIndex((i + total) % total);

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  }

  return (
    <section id="testimonios" aria-labelledby="testimonios-title" data-bg="topo" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          id="testimonios-title"
          eyebrow="Testimonios"
          title="Lo que dicen de mi trabajo"
          aside={<span className="label-mono rounded-chip border border-line px-3 py-1.5 text-accent">{total} testimonios</span>}
        />

        <div role="region" aria-roledescription="carrusel" aria-label="Testimonios" tabIndex={0} onKeyDown={onKeyDown} className="reveal rounded-layer">
          {/* Escritorio: las tres a la vista y la activa resaltada. Móvil: solo la activa. */}
          <ul className="grid gap-6 md:grid-cols-3" aria-live="polite">
            {testimonials.map((t, i) => (
              <li
                key={t.name + i}
                aria-roledescription="testimonio"
                aria-label={`${i + 1} de ${total}`}
                className={`relative flex-col rounded-layer border p-6 transition-[border-color,transform] duration-300 sm:p-7 ${
                  i === index ? "flex border-accent bg-harbor light:bg-snow md:-translate-y-1" : "hidden border-line bg-surface md:flex"
                }`}
              >
                <span aria-hidden="true" className="absolute right-6 top-4 font-display text-6xl leading-none text-accent/40">
                  “
                </span>
                {t.rating ? (
                  <p role="img" className="text-accent" aria-label={`${t.rating} de 5 estrellas`}>
                    {"★".repeat(t.rating)}
                    <span className="text-muted">{"★".repeat(5 - t.rating)}</span>
                  </p>
                ) : null}
                <blockquote className="mt-4 flex-1">
                  <p className="text-base leading-relaxed text-fg">«{t.text}»</p>
                </blockquote>
                <div className="mt-8">
                  <Person t={t} />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="label-mono text-muted">Usa las flechas del teclado para navegar</p>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name + i}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Ir al testimonio ${i + 1}`}
                    aria-current={i === index ? "true" : undefined}
                    className="group inline-flex h-11 w-8 items-center justify-center rounded-full"
                  >
                    <span
                      className={`block h-2 rounded-full transition-all duration-300 ${
                        i === index ? "w-5 bg-accent" : "w-2 bg-line group-hover:bg-accent"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(index - 1)}
                aria-label="Testimonio anterior"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:bg-periwinkle/15"
              >
                <Icon name="chevronLeft" size={22} />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                aria-label="Testimonio siguiente"
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-action text-on-action transition-colors hover:bg-action-hover"
              >
                <Icon name="chevronRight" size={22} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
