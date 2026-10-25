import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "tonal" | "ghost";
type Size = "md" | "lg";

const base =
  "group inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-full font-semibold transition-[background-color,border-color,color,transform,box-shadow] duration-200 active:translate-y-px disabled:cursor-not-allowed disabled:opacity-50 aria-disabled:cursor-not-allowed aria-disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Rojo solo como relleno: texto mist encima (7.68:1)
  primary:
    "bg-action text-on-action shadow-[0_10px_30px_-14px_var(--action)] hover:bg-action-hover hover:shadow-[0_14px_34px_-12px_var(--action)] active:bg-action-hover",
  secondary: "border-2 border-teal bg-transparent text-fg hover:border-accent hover:bg-teal/15 active:bg-teal/25",
  // Relleno deep con texto mist (7.87:1) en ambos temas
  tonal: "border border-teal bg-deep text-mist hover:bg-abyss active:bg-abyss",
  ghost: "text-accent underline-offset-4 hover:bg-teal/10 hover:underline active:bg-teal/20",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconPosition?: "start" | "end";
  children: ReactNode;
};

function Content({ icon, iconPosition = "end", children }: Pick<CommonProps, "icon" | "iconPosition" | "children">) {
  const iconEl = icon ? (
    <Icon
      name={icon}
      size={18}
      className="shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transform-none"
    />
  ) : null;
  return (
    <>
      {iconPosition === "start" && iconEl}
      <span>{children}</span>
      {iconPosition === "end" && iconEl}
    </>
  );
}

type ButtonLinkProps = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { external?: boolean };

/** Enlace con aspecto de botón. `external` abre en otra pestaña de forma segura. */
export function ButtonLink({ variant, size, icon, iconPosition, children, className = "", external, ...props }: ButtonLinkProps) {
  return (
    <a
      className={buttonClasses(variant, size, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      <Content icon={icon} iconPosition={iconPosition}>
        {children}
      </Content>
      {external && <span className="sr-only"> (se abre en una pestaña nueva)</span>}
    </a>
  );
}

type ButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant, size, icon, iconPosition, children, className = "", type = "button", ...props }: ButtonProps) {
  return (
    <button type={type} className={buttonClasses(variant, size, className)} {...props}>
      <Content icon={icon} iconPosition={iconPosition}>
        {children}
      </Content>
    </button>
  );
}
