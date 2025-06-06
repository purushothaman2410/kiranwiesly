
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Gallery />
      <Services />
      <About />
      <Portfolio />
      <Contact />
    </div>
  );
};

export default Index;
