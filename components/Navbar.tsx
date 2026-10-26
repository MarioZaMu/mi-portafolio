"use client";

import { useEffect, useRef, useState } from "react";
import { navItems, site } from "@/data/site";
import { Icon } from "./ui/Icon";
import { ThemeToggle } from "./ui/ThemeToggle";

export default function Navbar() {
  const [active, setActive] = useState<string>(navItems[0].id);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Sección activa: la que ocupa la franja central de la pantalla.
  useEffect(() => {
    const sections = navItems
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => observer.observe(s));

    const onScroll = () => setScrolled(window.scrollY > 12);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Menú móvil: Esc lo cierra y devuelve el foco al botón.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const linkClass = (id: string) =>
    `relative inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium transition-colors ${
      active === id ? "text-fg" : "text-muted hover:text-fg"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled || open
          ? "border-b border-line bg-bg/80 shadow-[0_10px_30px_-20px_var(--shadow-layer)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-[75rem] items-center justify-between gap-4 px-4 sm:px-6 md:px-8">
        <a
          href="#inicio"
          className="group inline-flex min-h-11 items-center gap-3 rounded-full pr-2"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-harbor font-display text-lg italic text-pearl transition-colors group-hover:border-accent"
          >
            {site.initials}
          </span>
          <span className="sr-only font-display text-lg text-fg sm:not-sr-only">{site.shortName}</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.slice(1).map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className={linkClass(item.id)} aria-current={active === item.id ? "location" : undefined}>
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-marine transition-transform duration-300 ${
                    active === item.id ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:bg-periwinkle/15 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </nav>

      <div id="menu-movil" hidden={!open} className="border-t border-line lg:hidden">
        <ul className="mx-auto grid max-w-[75rem] gap-1 px-4 py-4 sm:px-6">
          {navItems.map((item, i) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? "location" : undefined}
                className={`flex min-h-12 items-center gap-4 rounded-card px-3 text-base font-medium transition-colors hover:bg-periwinkle/15 ${
                  active === item.id ? "bg-periwinkle/15 text-fg" : "text-muted"
                }`}
              >
                <span aria-hidden="true" className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
