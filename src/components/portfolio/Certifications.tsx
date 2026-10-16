import SectionHeader from "./SectionHeader";
import Reveal from "@/components/Reveal";
import { ChevronDown } from "lucide-react";

const certifications = [
  {
    name: "Artificial Intelligence on Microsoft Azure",
    issuer: "Coursera",
    year: "2026",
    image: "/certificates/azure-ai-certificate.jpeg",
    verificationUrl: "https://coursera.org/verify/EW0KC4XSLOAQ",
  },
];

const Certifications = () => (
  <section id="certifications" className="section-snap relative overflow-hidden">
    <div className="container-elegant relative z-10">
      <SectionHeader number="三" titleEn="Certifications" titleZh="证书" />
      <div className="paper-card relative overflow-hidden">
        {certifications.map((certificate, index) => (
          <Reveal key={`${certificate.name}-${index}`} delay={index * 70}>
            <details className="cert-disclosure">
              <summary className="cert-row cert-disclosure-summary">
                <span className="cert-dot" />
                <div className="flex-1 min-w-0">
                  <div className="font-en text-lg text-ink">{certificate.name}</div>
                  <div className="font-zh-sans text-xs tracking-[0.2em] uppercase text-ink-muted mt-0.5">
                    {certificate.issuer}
                  </div>
                </div>
                <div className="font-en text-sm text-ink-soft tracking-widest">{certificate.year}</div>
                <ChevronDown className="cert-disclosure-icon h-4 w-4 shrink-0 text-ink-muted" aria-hidden="true" />
              </summary>
              <div className="px-5 pb-5">
                <a
                  href={certificate.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block overflow-hidden border border-[hsl(var(--border))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--seal))]"
                  aria-label={`View and verify ${certificate.name} certificate`}
                >
                  <img
                    src={certificate.image}
                    alt={`${certificate.name} course certificate issued to Phoenix Chung`}
                    className="h-auto w-full"
                  />
                </a>
                <a
                  href={certificate.verificationUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 font-en text-sm text-ink-soft transition-colors hover:text-[hsl(var(--seal))]"
                >
                  Verify certificate <span aria-hidden="true">↗</span>
                </a>
              </div>
            </details>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Certifications;
