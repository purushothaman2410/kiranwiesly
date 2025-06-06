
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { href: "#home", label: "Home" },
    { href: "#gallery", label: "Gallery" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsApp = () => {
    window.open("https://wa.me/9573938313/?text=Hello%2C%20how%20are%20you%3F", "_blank");
  };

  const closeNav = () => {
    setIsOpen(false);
    document.body.classList.remove("active");
  };

  const toggleNav = () => {
    setIsOpen(!isOpen);
    document.body.classList.toggle("active");
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-black/95 backdrop-blur-sm border-b border-gray-800' : 'bg-black/90 backdrop-blur-sm border-b border-gray-800'
        }`}
        data-header
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/18b75167-90d4-4a97-acbc-c8b6d5c02211.png" 
                alt="Kiran Wesley Photography Logo" 
                className="w-10 h-10 rounded-full"
              />
              <span className="text-white font-bold text-lg">Kiran Wesley</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-gray-300 hover:text-white transition-colors duration-300"
                  onClick={closeNav}
                >
                  {item.label}
                </a>
              ))}
              <Button 
                onClick={handleWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Book a Slot
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={toggleNav}
              data-nav-toggler
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <nav className="md:hidden py-4 border-t border-gray-800" data-navbar>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block py-2 text-gray-300 hover:text-white transition-colors"
                  onClick={closeNav}
                  data-nav-link
                >
                  {item.label}
                </a>
              ))}
              <Button 
                onClick={handleWhatsApp}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white"
              >
                Book a Slot
              </Button>
            </nav>
          )}
        </div>
      </header>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeNav}
          data-overlay
        />
      )}
    </>
  );
};
