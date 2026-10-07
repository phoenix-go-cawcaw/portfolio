import SectionHeader from "./SectionHeader";
import BrushDivider from "./BrushDivider";
import Reveal from "@/components/Reveal";

const placeholderCerts = [
  { name: "Placeholder certification", issuer: "To be added", year: "TBD" },
];

const Certifications = () => (
  <section id="certifications" className="section-snap relative overflow-hidden">
    <div className="container-elegant relative z-10">
      <SectionHeader number="三" titleEn="Certifications" titleZh="证书" />
      <Reveal>
        <BrushDivider className="mb-12" />
      </Reveal>
      <div className="paper-card relative overflow-hidden">
        {placeholderCerts.map((certificate, index) => (
          <Reveal key={`${certificate.name}-${index}`} delay={index * 70}>
            <div className="cert-row opacity-80">
              <span className="cert-dot" />
              <div className="flex-1 min-w-0">
                <div className="font-en text-lg text-ink">{certificate.name}</div>
                <div className="font-zh-sans text-xs tracking-[0.2em] uppercase text-ink-muted mt-0.5">
                  {certificate.issuer}
                </div>
              </div>
              <div className="font-en text-sm text-ink-soft tracking-widest">{certificate.year}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
