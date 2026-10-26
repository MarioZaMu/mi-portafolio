"use client";

import { useEffect, useState } from "react";
import { navItems, site, whatsappHref } from "@/data/site";
import { Icon, type IconName } from "./ui/Icon";
import { StrataDivider } from "./ui/Contours";
import { Container } from "./ui/Primitives";

type Social = { icon: IconName; label: string; href: string; external: boolean };

const socials: Social[] = [
  { icon: "github", label: "GitHub", href: site.github, external: true },
  ...(site.linkedin ? [{ icon: "linkedin" as const, label: "LinkedIn", href: site.linkedin, external: true }] : []),
  ...(site.whatsapp ? [{ icon: "whatsapp" as const, label: "WhatsApp", href: whatsappHref(site.whatsapp), external: true }] : []),
  { icon: "mail", label: "Correo", href: `mailto:${site.email}`, external: false },
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function toTop() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("hero-title")?.closest("section")?.querySelector<HTMLElement>("a, button")?.focus({ preventScroll: true });
  }

  return (
    <footer className="relative mt-12 border-t border-line bg-surface-soft">
      <StrataDivider seed={9} className="absolute inset-x-0 -top-7 md:-top-9" />
      <Container className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl text-fg">{site.shortName}</p>
          <p className="mt-2 max-w-xs text-muted">{site.role}.</p>
          <ul className="mt-6 flex gap-2" aria-label="Redes sociales">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.external ? `${s.label} (se abre en una pestaña nueva)` : s.label}
                  {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:bg-teal/15 active:bg-teal/25"
                >
                  <Icon name={s.icon} size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Enlaces rápidos">
          <p className="label-mono text-accent">Enlaces rápidos</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 md:grid-cols-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="inline-flex min-h-11 items-center text-muted underline-offset-4 hover:text-fg hover:underline">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label-mono text-accent">Ubicación</p>
          <p className="mt-4 text-muted">{site.location}</p>
          <p className="label-mono mt-2 text-muted">
            {site.coordinates} · {site.altitude}
          </p>
        </div>
      </Container>

      <div className="border-t border-line">
        <Container className="flex flex-col gap-2 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {site.name}
          </p>
          <p>Hecho con Next.js + Tailwind</p>
        </Container>
      </div>

      <button
        type="button"
        onClick={toTop}
        aria-label="Volver arriba"
        tabIndex={showTop ? 0 : -1}
        aria-hidden={!showTop}
        className={`fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-action text-on-action shadow-[0_12px_30px_-10px_var(--shadow-layer)] transition-[opacity,transform,background-color] duration-300 hover:bg-action-hover md:bottom-8 md:right-8 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <Icon name="arrowUp" size={22} />
      </button>
    </footer>
  );
}
