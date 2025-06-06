
import { useState, useEffect } from 'react';

export const BackToTop = () => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const bodyHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollEndPos = bodyHeight - windowHeight;
      const totalScrollPercent = (window.scrollY / scrollEndPos) * 100;

      setScrollPercent(Math.round(totalScrollPercent));
      setIsVisible(totalScrollPercent > 5);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-16 h-16 bg-yellow-400 text-black rounded-full font-bold text-sm transition-all duration-300 z-40 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      data-back-top-btn
    >
      {scrollPercent}%
    </button>
  );
};
