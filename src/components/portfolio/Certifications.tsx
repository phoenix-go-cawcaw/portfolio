import SectionHeader from "./SectionHeader";
import BrushDivider from "./BrushDivider";
import Reveal from "@/components/Reveal";

const certs = [
  { name: "Certificate of Artificial Intelligence", issuer: "Microsoft Azure", year: "2026" },
  { name: "Introduction to Cloud", issuer: "IBM", year: "2026" },
  { name: "YouthCode Software Development Project", issuer: "Achievement", year: "2026" },
  { name: "React & TypeScript", issuer: "Front-end Academy", year: "2025" },
  { name: "Chinese Typography", issuer: "Ink Atelier", year: "2025" },
];

const Certifications = () => (
  <section id="certifications" className="section-pad relative">
    <div className="container-elegant">
      <SectionHeader number="三" titleEn="Certifications & Honours" titleZh="证书" />
      <Reveal>
        <BrushDivider className="mb-12" />
      </Reveal>
      <div className="paper-card">
        {certs.map((c, i) => (
          <Reveal key={c.name} delay={i * 70}>
            <div className="cert-row">
              <span className="cert-dot" />
              <div className="flex-1 min-w-0">
                <div className="font-en text-lg text-ink">{c.name}</div>
                <div className="font-zh-sans text-xs tracking-[0.2em] uppercase text-ink-muted mt-0.5">
                  {c.issuer}
                </div>
              </div>
              <div className="font-en text-sm text-ink-soft tracking-widest">{c.year}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
