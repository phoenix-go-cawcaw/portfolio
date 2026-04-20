import { useEffect, useState } from "react";

const items = [
  { id: "hero", en: "Home", zh: "首" },
  { id: "skills", en: "Skills", zh: "艺" },
  { id: "projects", en: "Works", zh: "作" },
  { id: "certifications", en: "Honours", zh: "证" },
  { id: "about", en: "About", zh: "我" },
  { id: "contact", en: "Contact", zh: "联" },
];

const TopNav = () => {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    items.forEach((i) => {
      const el = document.getElementById(i.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="top-nav">
      <div className="container-elegant flex items-center justify-between h-16">
        <button onClick={() => go("hero")} className="flex items-center gap-3 group">
          <span className="font-zh text-xl font-bold tracking-wider text-seal group-hover:opacity-80 transition-opacity">
            凤
          </span>
          <span className="font-en text-sm tracking-[0.3em] uppercase text-ink-soft">Phoenix</span>
        </button>
        <nav className="hidden md:flex items-center gap-7">
          {items.map((i) => (
            <button
              key={i.id}
              onClick={() => go(i.id)}
              className={`nav-link relative ${active === i.id ? "text-seal" : ""}`}
            >
              {i.en}
              {active === i.id && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-seal" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default TopNav;
