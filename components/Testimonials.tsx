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
        <img src={t.avatar} alt="" width={56} height={56} className="h-14 w-14 rounded-full border border-line object-cover" />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line bg-deep font-display text-lg italic text-mist"
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

  const current = testimonials[index];

  return (
    <section id="testimonios" aria-labelledby="testimonios-title" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          id="testimonios-title"
          index="04"
          eyebrow="Testimonios"
          title="Lo que dicen quienes han trabajado conmigo"
        />

        <div
          className="reveal mx-auto max-w-3xl"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Testimonios"
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          {/* Pila de capas: las tarjetas siguientes asoman detrás */}
          <div className="relative pb-6 pr-6" aria-live="polite">
            <div aria-hidden="true" className="absolute bottom-6 left-0 right-6 top-0 translate-x-6 translate-y-6 rounded-layer border border-line bg-surface-soft" />
            <div aria-hidden="true" className="absolute bottom-6 left-0 right-6 top-0 translate-x-3 translate-y-3 rounded-layer border border-line bg-surface-soft" />
            <div
              key={index}
              role="group"
              aria-roledescription="testimonio"
              aria-label={`${index + 1} de ${total}`}
              className="rise relative rounded-layer border border-line bg-surface p-6 sm:p-10"
            >
              <span aria-hidden="true" className="block h-12 font-display text-8xl leading-none text-accent-warm">
                “
              </span>
              <blockquote className="mt-4">
                <p className="font-display text-xl leading-snug text-fg sm:text-2xl">«{current.text}»</p>
              </blockquote>
              {current.rating ? (
                <p role="img" className="mt-4 text-accent-warm" aria-label={`${current.rating} de 5 estrellas`}>
                  {"★".repeat(current.rating)}
                  <span className="text-muted">{"★".repeat(5 - current.rating)}</span>
                </p>
              ) : null}
              <div className="mt-8 border-t border-line pt-6">
                <Person t={current} />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Testimonio anterior"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:bg-teal/15 active:bg-teal/25"
            >
              <Icon name="chevronLeft" size={22} />
            </button>

            <div className="flex items-center gap-1">
              {testimonials.map((t, i) => (
                <button
                  key={t.name + i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  aria-current={i === index ? "true" : undefined}
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-full"
                >
                  <span
                    className={`block h-2.5 rounded-full transition-all duration-300 ${
                      i === index ? "w-8 bg-crimson" : "w-2.5 bg-teal group-hover:bg-accent"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Testimonio siguiente"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:bg-teal/15 active:bg-teal/25"
            >
              <Icon name="chevronRight" size={22} />
            </button>
          </div>
          <p className="label-mono mt-4 text-center text-muted">Usa las flechas del teclado para navegar</p>
        </div>
      </Container>
    </section>
  );
}
