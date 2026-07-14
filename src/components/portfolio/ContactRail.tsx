import { Phone, Mail } from "lucide-react";

const contactItems = [
  {
    label: "Call",
    value: "079 183 6152",
    href: "tel:+27791836152",
    Icon: Phone,
  },
  {
    label: "Email",
    value: "jojoeydenver@gmail.com",
    href: "mailto:jojoeydenver@gmail.com",
    Icon: Mail,
  },
];

const ContactRail = () => (
  <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4">
    {contactItems.map(({ label, value, href, Icon }) => (
      <a
        key={label}
        href={href}
        aria-label={`${label}: ${value}`}
        className="group relative flex items-center justify-center w-11 h-11 rounded-full border border-ink/30 bg-background/80 backdrop-blur-sm text-ink-soft transition-colors hover:bg-seal hover:border-seal hover:text-seal-foreground"
        style={{ boxShadow: "0 4px 12px hsl(var(--ink) / 0.08)" }}
      >
        <Icon className="w-4 h-4" strokeWidth={1.75} />

        <span
          className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-ink/20 bg-background px-3 py-1.5 font-zh-sans text-[0.65rem] tracking-[0.1em] text-ink opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100"
        >
          {value}
        </span>
      </a>
    ))}

    <span className="mt-1 h-10 w-px bg-ink/15" aria-hidden="true" />
  </div>
);

export default ContactRail;