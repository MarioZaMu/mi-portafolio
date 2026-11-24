"use client";

import { useEffect } from "react";
import { useLang } from "@/lib/useLang";

/** Cambia entre español e inglés. Muestra el idioma al que se cambiará, como el botón de tema. */
export function LangToggle({ className = "" }: { className?: string }) {
  const lang = useLang();
  const next = lang === "es" ? "en" : "es";

  // El título de la pestaña sigue al idioma (también al recargar con inglés guardado).
  useEffect(() => {
    const apply = () => {
      const want = document.title.replace(/Portafolio|Portfolio/, lang === "en" ? "Portfolio" : "Portafolio");
      if (document.title !== want) document.title = want;
    };
    apply();
    // Next vuelve a escribir el título al terminar de cargar: se reaplica el idioma.
    const observer = new MutationObserver(apply);
    observer.observe(document.head, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [lang]);

  function toggle() {
    const root = document.documentElement;
    root.dataset.lang = next;
    root.lang = next;
    try {
      localStorage.setItem("lang", next);
    } catch {
      // Almacenamiento bloqueado: el cambio aplica solo a esta visita.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      lang={next}
      aria-label={next === "en" ? "Switch to English" : "Cambiar a español"}
      title={next === "en" ? "English" : "Español"}
      className={`inline-flex h-11 w-11 items-center justify-center rounded-full border border-line font-mono text-xs font-semibold tracking-wider text-fg transition-colors hover:border-accent hover:bg-periwinkle/15 active:bg-periwinkle/25 ${className}`}
    >
      {next.toUpperCase()}
    </button>
  );
}
