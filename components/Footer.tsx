"use client";

import { useEffect, useState } from "react";
import { navItems, site, whatsappHref } from "@/data/site";
import { Icon, type IconName } from "./ui/Icon";
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
    <footer className="relative mt-12 border-t border-line bg-bg/70 backdrop-blur-sm">
      <Container className="grid gap-8 py-10 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10">
        <div>
          <p className="font-display text-2xl text-fg">{site.shortName}</p>
          <p className="mt-1 text-sm text-muted">
            © <span suppressHydrationWarning>{new Date().getFullYear()}</span> · Todos los derechos reservados
          </p>
          <p className="label-mono mt-2 text-accent">Hecho con Next.js + Tailwind</p>
        </div>

        <nav aria-label="Enlaces rápidos" className="md:justify-self-center">
          <ul className="flex flex-wrap gap-x-1 gap-y-0">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-muted underline-offset-4 hover:text-fg hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ul className="flex gap-2" aria-label="Redes sociales">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                aria-label={s.external ? `${s.label} (se abre en una pestaña nueva)` : s.label}
                {...(s.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:bg-periwinkle/15 active:bg-periwinkle/25"
              >
                <Icon name={s.icon} size={20} />
              </a>
            </li>
          ))}
        </ul>
      </Container>

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
