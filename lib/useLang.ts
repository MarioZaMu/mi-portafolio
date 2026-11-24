"use client";

import { useSyncExternalStore } from "react";
import type { Lang } from "./i18n";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-lang"] });
  return () => observer.disconnect();
}

const getLang = (): Lang => (document.documentElement.dataset.lang === "en" ? "en" : "es");

/** Idioma activo, para los atributos que no pueden llevar los dos textos (aria-label, placeholder…). */
export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getLang, () => "es" as Lang);
}
