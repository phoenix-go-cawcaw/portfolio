import TopNav from "@/components/portfolio/TopNav";
import Hero from "@/components/portfolio/Hero";
import Skills from "@/components/portfolio/Skills";
import Projects from "@/components/portfolio/Projects";
import Certifications from "@/components/portfolio/Certifications";
import About from "@/components/portfolio/About";
import Testimonials from "@/components/portfolio/Testimonials";
import Contact from "@/components/portfolio/Contact";

const Index = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      <TopNav />
      <Hero />
      <Skills />
      <Projects />
      <Certifications />
      <About />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default Index;
