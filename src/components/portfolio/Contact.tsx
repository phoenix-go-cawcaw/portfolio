import Reveal from "@/components/Reveal";
import BrushDivider from "./BrushDivider";

const links = [
  { label: "Email", href: "https://mail.google.com/mail/?view=cm&fs=1&to=jojoeydenver@gmail.com" },
  { label: "GitHub", href: "https://github.com/phoenix-go-cawcaw" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/phoenix-c-75251a3b1" },
];

const Contact = () => (
  <section id="contact" className="section-pad relative">
    <div className="container-elegant text-center">
      <Reveal>
        <p className="font-zh-sans text-[0.7rem] tracking-[0.55em] uppercase text-ink-muted mb-5">
          联系我 · Get in touch
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2 className="font-en text-5xl md:text-6xl font-light text-ink ink-shadow mb-3">
          Let's create together.
        </h2>
      </Reveal>
      <Reveal delay={160}>
        <p className="font-zh text-base text-ink-muted tracking-[0.2em] mb-10">
          以心相待 · 以艺相会
        </p>
      </Reveal>
      <Reveal delay={220}>
        <BrushDivider className="mb-10" />
      </Reveal>

      <Reveal delay={300}>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="font-zh-sans text-xs tracking-[0.35em] uppercase border border-ink/40 px-7 py-3.5 hover:bg-seal hover:border-seal hover:text-seal-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>
      </Reveal>
    </div>

    <footer className="container-elegant mt-24 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-3">
      <span className="font-zh text-xs tracking-[0.3em] text-ink-muted">
        凤凰 · 作品集 · {new Date().getFullYear()}
      </span>
      <span className="font-zh text-[0.65rem] tracking-[0.3em] text-ink-muted opacity-70">
        笔墨之间，意在象外
      </span>
    </footer>
  </section>
);

export default Contact;
