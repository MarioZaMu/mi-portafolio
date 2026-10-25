"use client";

import { useRef, useState, type FormEvent } from "react";
import { site, whatsappHref } from "@/data/site";
import { Button } from "./ui/Button";
import { Icon, type IconName } from "./ui/Icon";
import { Container, SectionHeading, delay } from "./ui/Primitives";

// Formspree: crea un formulario en formspree.io y pon su ID en .env.local → NEXT_PUBLIC_FORMSPREE_ID=xxxxxx
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const endpoint = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : null;

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;
type Status = "idle" | "sending" | "success" | "mailto" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Escribe tu nombre (mínimo 2 caracteres).";
  if (!values.email.trim()) errors.email = "Escribe tu correo electrónico.";
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = "Revisa el formato del correo, por ejemplo: nombre@dominio.com.";
  if (values.message.trim().length < 10) errors.message = "Cuéntame un poco más (mínimo 10 caracteres).";
  return errors;
}

type Channel = { icon: IconName; label: string; value: string; href: string | null; external?: boolean };

const channels: Channel[] = [
  { icon: "mail", label: "Correo", value: site.email, href: `mailto:${site.email}` },
  { icon: "github", label: "GitHub", value: `@${site.githubUser}`, href: site.github, external: true },
  { icon: "linkedin", label: "LinkedIn", value: site.linkedin ? "Ver perfil" : "Próximamente", href: site.linkedin, external: true },
  ...(site.whatsapp
    ? [{ icon: "whatsapp" as const, label: "WhatsApp", value: "Escríbeme", href: whatsappHref(site.whatsapp), external: true }]
    : []),
];

export default function Contact() {
  const [values, setValues] = useState<Record<Field, string>>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const statusRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const update = (field: Field, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field: Field) => {
    setTouched((t) => ({ ...t, [field]: true }));
    setErrors(validate(values));
  };

  function showStatus(next: Status) {
    setStatus(next);
    requestAnimationFrame(() => statusRef.current?.focus());
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, message: true });
    const firstInvalid = (Object.keys(found) as Field[])[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const data = new FormData(e.currentTarget);
    // Trampa anti-spam: los humanos no ven este campo.
    if (data.get("_gotcha")) {
      showStatus("success");
      return;
    }

    if (!endpoint) {
      const subject = encodeURIComponent(`Contacto desde el portafolio — ${values.name}`);
      const body = encodeURIComponent(`${values.message}\n\n${values.name} · ${values.email}`);
      window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
      showStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, _subject: `Portafolio: mensaje de ${values.name}` }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setValues({ name: "", email: "", message: "" });
      setTouched({});
      showStatus("success");
    } catch {
      showStatus("error");
    }
  }

  const fieldClass = (field: Field) =>
    `mt-2 block w-full rounded-card border bg-bg/60 px-4 py-3 text-base text-fg placeholder:text-muted/80 transition-colors focus:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent ${
      errors[field] && touched[field] ? "border-accent-warm" : "border-line hover:border-accent"
    }`;

  const fieldError = (field: Field) =>
    errors[field] && touched[field] ? (
      <p id={`${field}-error`} className="mt-2 flex items-center gap-2 text-sm font-medium text-accent-warm">
        <Icon name="alert" size={16} className="shrink-0" />
        {errors[field]}
      </p>
    ) : null;

  const invalid = (field: Field) => Boolean(errors[field] && touched[field]);
  const done = status === "success" || status === "mailto";

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="relative py-24 md:py-32">
      <Container>
        <SectionHeading
          id="contacto-title"
          eyebrow="Contacto"
          title="Hablemos de tu proyecto"
          intro="¿Tienes una idea, una práctica o una pregunta? Escríbeme por el canal que prefieras; respondo lo antes posible."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
          <ul className="reveal grid min-w-0 grid-cols-1 content-start gap-3">
            {channels.map((c) => {
              const inner = (
                <>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-deep text-mist transition-colors group-hover:border-accent">
                    <Icon name={c.icon} size={22} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="label-mono block text-muted">{c.label}</span>
                    <span className="block truncate font-semibold text-fg">{c.value}</span>
                  </span>
                  {c.href && <Icon name={c.external ? "external" : "arrowRight"} size={18} className="text-accent" />}
                </>
              );
              const cls =
                "group flex min-h-16 items-center gap-4 rounded-card border border-line bg-surface p-3 pr-5 transition-[border-color,transform] duration-200";
              return (
                <li key={c.label}>
                  {c.href ? (
                    <a
                      href={c.href}
                      className={`${cls} hover:-translate-y-0.5 hover:border-accent motion-reduce:transform-none`}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {inner}
                      {c.external && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
                    </a>
                  ) : (
                    <div aria-disabled="true" className={`${cls} border-dashed opacity-70`}>
                      {inner}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="reveal layered rounded-layer border border-line bg-surface p-6 sm:p-8" style={delay(120)}>
            {done ? (
              <div ref={statusRef} tabIndex={-1} role="status" className="flex flex-col items-center py-10 text-center focus:outline-none">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent text-accent">
                  <Icon name="check" size={40} />
                </span>
                <h3 className="mt-6 text-3xl font-medium text-fg">
                  {status === "success" ? "¡Mensaje enviado!" : "Tu correo está listo"}
                </h3>
                <p className="mt-3 max-w-sm text-muted">
                  {status === "success"
                    ? "Gracias por escribirme. Te responderé pronto a tu correo."
                    : "Abrí tu aplicación de correo con el mensaje escrito. Solo tienes que pulsar «Enviar»."}
                </p>
                <Button variant="secondary" className="mt-8" onClick={() => setStatus("idle")} icon="arrowRight">
                  Escribir otro mensaje
                </Button>
              </div>
            ) : (
              <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby="form-nota" className="grid gap-6">
                <p id="form-nota" className="text-sm text-muted">
                  Todos los campos son obligatorios.
                </p>
                <div>
                  <label htmlFor="name" className="font-semibold text-fg">
                    Nombre
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="¿Cómo te llamas?"
                    value={values.name}
                    onChange={(e) => update("name", e.target.value)}
                    onBlur={() => blur("name")}
                    aria-invalid={invalid("name")}
                    aria-describedby={invalid("name") ? "name-error" : undefined}
                    className={fieldClass("name")}
                  />
                  {fieldError("name")}
                </div>
                <div>
                  <label htmlFor="email" className="font-semibold text-fg">
                    Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    placeholder="nombre@dominio.com"
                    value={values.email}
                    onChange={(e) => update("email", e.target.value)}
                    onBlur={() => blur("email")}
                    aria-invalid={invalid("email")}
                    aria-describedby={invalid("email") ? "email-error" : undefined}
                    className={fieldClass("email")}
                  />
                  {fieldError("email")}
                </div>
                <div>
                  <label htmlFor="message" className="font-semibold text-fg">
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Cuéntame en qué puedo ayudarte"
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    onBlur={() => blur("message")}
                    aria-invalid={invalid("message")}
                    aria-describedby={invalid("message") ? "message-error" : undefined}
                    className={`${fieldClass("message")} resize-y`}
                  />
                  {fieldError("message")}
                </div>

                {/* Honeypot: oculto para personas y lectores de pantalla */}
                <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
                  <label htmlFor="_gotcha">No llenes este campo</label>
                  <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {status === "error" && (
                  <div
                    ref={statusRef}
                    tabIndex={-1}
                    role="alert"
                    className="flex items-start gap-3 rounded-card border border-accent-warm/60 bg-crimson/10 p-4 text-fg"
                  >
                    <Icon name="alert" className="mt-0.5 shrink-0 text-accent-warm" />
                    <p>
                      No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme a{" "}
                      <a href={`mailto:${site.email}`} className="font-semibold text-accent underline underline-offset-4">
                        {site.email}
                      </a>
                      .
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="submit"
                    size="lg"
                    icon="send"
                    disabled={status === "sending"}
                    aria-disabled={status === "sending"}
                  >
                    {status === "sending" ? "Enviando…" : "Enviar mensaje"}
                  </Button>
                  <p className="text-sm text-muted" aria-live="polite">
                    {status === "sending" ? "Enviando tu mensaje…" : ""}
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
