import SectionHeader from "./SectionHeader";
import BrushDivider from "./BrushDivider";
import Reveal from "@/components/Reveal";

const testimonials = [
  {
    text: "Phoenix translated a brief into an experience that felt both modern and rooted. Every scroll had weight, grace, and beautiful kinetic polish.",
    seal: "信",
    name: "Yun Li",
    role: "Product Lead · Pixel Studio",
  },
  {
    text: "The interface feels like a digital scroll: elegant, calm, expressive. Motion and typography work together perfectly.",
    seal: "誉",
    name: "Mei Chen",
    role: "Creative Director · East Wave",
  },
  {
    text: "A rare blend of craftsmanship and technical clarity. The final delivery was polished, memorable, and beautifully restrained.",
    seal: "礼",
    name: "Jia Wen",
    role: "Founder · Silk Road Ventures",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="section-pad relative">
    <div className="container-elegant">
      <SectionHeader number="五" titleEn="Testimonials" titleZh="口碑" />
      <Reveal>
        <BrushDivider className="mb-12" />
      </Reveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 100}>
            <div className="paper-card p-7 h-full flex flex-col">
              <div className="font-zh text-5xl font-light text-seal/30 leading-none mb-4">"</div>
              <p className="font-en text-base text-ink-soft leading-relaxed flex-1 italic">
                {t.text}
              </p>
              <div className="mt-6 pt-5 border-t border-border flex items-center gap-4">
                <div
                  className="w-11 h-11 flex items-center justify-center font-zh font-bold text-base bg-seal text-seal-foreground"
                  style={{ boxShadow: "var(--shadow-seal)" }}
                >
                  {t.seal}
                </div>
                <div>
                  <div className="font-en text-base text-ink">{t.name}</div>
                  <div className="font-zh-sans text-[0.65rem] tracking-[0.2em] uppercase text-ink-muted">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
