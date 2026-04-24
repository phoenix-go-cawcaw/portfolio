import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const items = [
  { id: "hero", en: "Home", zh: "首" },
  { id: "skills", en: "Skills", zh: "艺" },
  { id: "projects", en: "Works", zh: "作" },
  { id: "certifications", en: "Honours", zh: "证" },
  { id: "about", en: "About", zh: "我" },
  { id: "contact", en: "Contact", zh: "联" },
];

  const TopNav = () => {
  const isMobile = useIsMobile();
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

        {isMobile && (
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <button className="p-1.5 rounded-md border hover:bg-paper-aged transition-colors">
                <Menu className="h-5 w-5 text-ink" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0 bg-card border-ink/30">
<DialogTitle className="sr-only">Navigation</DialogTitle>
              <DialogDescription className="sr-only">Main navigation menu</DialogDescription>
              <div className="flex flex-col h-full">
                <div className="p-6 border-b border-ink/20">
                  <button onClick={() => go("hero")} className="flex items-center gap-3 group">
                    <span className="font-zh text-xl font-bold tracking-wider text-seal group-hover:opacity-80 transition-opacity">
                      凤
                    </span>
                    <span className="font-en text-sm tracking-[0.3em] uppercase text-ink-soft">Phoenix</span>
                  </button>
                </div>
                <nav className="flex-1 p-6 flex flex-col gap-4">
                  {items.map((i) => (
                    <SheetClose key={i.id} asChild>
                      <button
                        onClick={() => go(i.id)}
                        className={`nav-link w-full text-left py-3 px-3 rounded-md flex items-center justify-between group transition-colors ${
                          active === i.id ? "text-seal bg-paper-aged" : ""
                        }`}
                      >
                        <span className="font-en">{i.en}</span>
                        <span className="font-zh text-lg opacity-60">{i.zh}</span>
                        {active === i.id && (
                          <span className="w-2 h-2 ml-2 rounded-full bg-seal flex-shrink-0" />
                        )}
                      </button>
                    </SheetClose>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </header>
  );
};

export default TopNav;
