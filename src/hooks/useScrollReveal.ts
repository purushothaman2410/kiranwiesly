
import { useEffect } from 'react';

export const useScrollReveal = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll("[data-reveal]");
    
    const scrollReveal = () => {
      for (let i = 0; i < revealElements.length; i++) {
        const elementIsInScreen = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.15;
        
        if (elementIsInScreen) {
          revealElements[i].classList.add("revealed");
        } else {
          revealElements[i].classList.remove("revealed");
        }
      }
    };

    window.addEventListener("scroll", scrollReveal);
    scrollReveal(); // Initial call

    return () => {
      window.removeEventListener("scroll", scrollReveal);
    };
  }, []);
};
