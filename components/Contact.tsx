"use client";

import { useRef, useState, type FormEvent } from "react";
import { site, whatsappHref } from "@/data/site";
import { T, newTab, pick, tx, type Tx } from "@/lib/i18n";
import { useLang } from "@/lib/useLang";
import { Button } from "./ui/Button";
import { Icon, type IconName } from "./ui/Icon";
import { Container, SectionHeading, delay } from "./ui/Primitives";

// Formspree: crea un formulario en formspree.io y pon su ID en .env.local → NEXT_PUBLIC_FORMSPREE_ID=xxxxxx
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;
const endpoint = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : null;

type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, Tx>>;
type Status = "idle" | "sending" | "success" | "mailto" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(values: Record<Field, string>): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = tx("Escribe tu nombre (mínimo 2 caracteres).", "Enter your name (at least 2 characters).");
  if (!values.email.trim()) errors.email = tx("Escribe tu correo electrónico.", "Enter your email address.");
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = tx(
      "Revisa el formato del correo, por ejemplo: nombre@dominio.com.",
      "Check the email format, for example: name@domain.com.",
    );
  if (values.message.trim().length < 10) errors.message = tx("Cuéntame un poco más (mínimo 10 caracteres).", "Tell me a bit more (at least 10 characters).");
  return errors;
}

type Channel = { icon: IconName; label: Tx; value: Tx | string; href: string | null; external?: boolean };

const channels: Channel[] = [
  { icon: "mail", label: tx("Correo", "Email"), value: site.email, href: `mailto:${site.email}` },
  { icon: "github", label: tx("GitHub", "GitHub"), value: `github.com/${site.githubUser}`, href: site.github, external: true },
  { icon: "linkedin", label: tx("LinkedIn", "LinkedIn"),
    value: site.linkedin ? tx("Ver perfil", "View profile") : tx("Próximamente", "Coming soon"),
     href: site.linkedin, external: true },
  ...(site.whatsapp
    ? [{ icon: "whatsapp" as const, label: tx("WhatsApp", "WhatsApp"), value: tx("Escríbeme", "Message me"), href: whatsappHref(site.whatsapp), external: true }]
    : []),
];

export default function Contact() {
  const lang = useLang();
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
        <T {...errors[field]!} />
      </p>
    ) : null;

  const invalid = (field: Field) => Boolean(errors[field] && touched[field]);
  const done = status === "success" || status === "mailto";

  return (
    <section id="contacto" aria-labelledby="contacto-title" data-bg="topo-b" className="relative py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          <div className="min-w-0">
            <SectionHeading
              id="contacto-title"
              number={6}
              eyebrow={<T {...tx("Contacto", "Contact")} />}
              title={<T {...tx("Hablemos", "Let's talk")} />}
              intro={
                <T
                  {...tx(
                    "¿Tienes una idea, una práctica o un proyecto? Escríbeme por donde te quede más cómodo.",
                    "Have an idea, an internship or a project? Write to me wherever suits you best.",
                  )}
                />
              }
            />
            <ul className="reveal grid min-w-0 grid-cols-1 content-start gap-3">
              {channels.map((c) => {
                const inner = (
                  <>
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-line bg-harbor text-pearl transition-colors group-hover:border-accent">
                      <Icon name={c.icon} size={22} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="label-mono block text-muted">
                        <T {...c.label} />
                      </span>
                      <span className="block truncate font-semibold text-fg">
                        {typeof c.value === "string" ? c.value : <T {...c.value} />}
                      </span>
                    </span>
                    {c.href && <Icon name={c.external ? "external" : "arrowRight"} size={18} className="text-accent" />}
                  </>
                );
                const cls =
                  "group flex min-h-16 items-center gap-4 rounded-card border border-line bg-harbor p-3 pr-5 light:bg-snow transition-[border-color,transform] duration-200";
                return (
                  <li key={c.label.es}>
                    {c.href ? (
                      <a
                        href={c.href}
                        className={`${cls} hover:-translate-y-0.5 hover:border-accent motion-reduce:transform-none`}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {inner}
                        {c.external && (
                          <span className="sr-only">
                            {" "}
                            <T {...newTab} />
                          </span>
                        )}
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
          </div>

          <div
            className="reveal rounded-layer border border-line bg-harbor p-6 shadow-[0_30px_60px_-30px_var(--shadow-layer)] light:bg-snow sm:p-8 lg:mt-8"
            style={delay(120)}
          >
            {done ? (
              <div ref={statusRef} tabIndex={-1} role="status" className="flex flex-col items-center py-10 text-center focus:outline-none">
                <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-accent text-accent">
                  <Icon name="check" size={40} />
                </span>
                <h3 className="mt-6 text-3xl font-medium text-fg">
                  {status === "success" ? <T {...tx("¡Mensaje enviado!", "Message sent!")} /> : <T {...tx("Tu correo está listo", "Your email is ready")} />}
                </h3>
                <p className="mt-3 max-w-sm text-muted">
                  {status === "success" ? (
                    <T {...tx("Gracias por escribirme. Te responderé pronto a tu correo.", "Thanks for writing to me. I'll reply to your email soon.")} />
                  ) : (
                    <T
                      {...tx(
                        "Abrí tu aplicación de correo con el mensaje escrito. Solo tienes que pulsar «Enviar».",
                        "I opened your email app with the message written. You just have to press “Send”.",
                      )}
                    />
                  )}
                </p>
                <Button variant="secondary" className="mt-8" onClick={() => setStatus("idle")} icon="arrowRight">
                  <T {...tx("Escribir otro mensaje", "Write another message")} />
                </Button>
              </div>
            ) : (
              <form ref={formRef} noValidate onSubmit={onSubmit} aria-describedby="form-nota" className="grid gap-5">
                <div>
                  <h3 className="text-2xl font-medium text-fg sm:text-3xl">
                    <T {...tx("Envíame un mensaje", "Send me a message")} />
                  </h3>
                  <p id="form-nota" className="mt-1 text-sm text-muted">
                    <T {...tx("Todos los campos son obligatorios.", "All fields are required.")} />
                  </p>
                </div>
                <div>
                  <label htmlFor="name" className="font-semibold text-fg">
                    <T {...tx("Nombre", "Name")} />
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder={lang === "en" ? "What's your name?" : "¿Cómo te llamas?"}
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
                    <T {...tx("Correo electrónico", "Email address")} />
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    placeholder={lang === "en" ? "name@domain.com" : "nombre@dominio.com"}
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
                    <T {...tx("Mensaje", "Message")} />
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder={lang === "en" ? "Tell me how I can help you" : "Cuéntame en qué puedo ayudarte"}
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
                    className="flex items-start gap-3 rounded-card border border-accent-warm/60 bg-marine/10 p-4 text-fg"
                  >
                    <Icon name="alert" className="mt-0.5 shrink-0 text-accent-warm" />
                    <p>
                      <T
                        {...tx(
                          "No se pudo enviar el mensaje. Inténtalo de nuevo o escríbeme a",
                          "The message could not be sent. Try again or write to me at",
                        )}
                      />{" "}
                      <a href={`mailto:${site.email}`} className="font-semibold text-accent underline underline-offset-4">
                        {site.email}
                      </a>
                      .
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  <Button
                    type="submit"
                    size="lg"
                    icon="send"
                    className="w-full"
                    disabled={status === "sending"}
                    aria-disabled={status === "sending"}
                  >
                    {status === "sending" ? <T {...tx("Enviando…", "Sending…")} /> : <T {...tx("Enviar mensaje", "Send message")} />}
                  </Button>
                  <p className="text-sm text-muted" aria-live="polite">
                    {status === "sending" ? pick(tx("Enviando tu mensaje…", "Sending your message…"), lang) : ""}
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
