
import { useEffect } from "react";
import { Hero } from "@/components/Hero";
import { Gallery } from "@/components/Gallery";
import { Services } from "@/components/Services";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { Navigation } from "@/components/Navigation";
import { LoadingScreen } from "@/components/LoadingScreen";
import { BackToTop } from "@/components/BackToTop";
import { CustomCursor } from "@/components/CustomCursor";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCustomCursor } from "@/hooks/useCustomCursor";

const Index = () => {
  useScrollReveal();
  useCustomCursor();

  useEffect(() => {
    // Add any additional page-level effects here
    document.body.classList.add("active");
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <LoadingScreen />
      <Navigation />
      <Hero />
      <Gallery />
      <Services />
      <About />
      <Portfolio />
      <Contact />
      <BackToTop />
      <CustomCursor />
    </div>
  );
};

export default Index;