
import { useEffect, useRef } from 'react';

interface TextAnimationProps {
  texts: string[];
  className?: string;
}

export const TextAnimation = ({ texts, className = "" }: TextAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const letterBoxes = containerRef.current.querySelectorAll("[data-letter-effect]");
    let activeLetterBoxIndex = 0;
    let lastActiveLetterBoxIndex = 0;
    let totalLetterBoxDelay = 0;

    const setLetterEffect = () => {
      for (let i = 0; i < letterBoxes.length; i++) {
        let letterAnimationDelay = 0;
        const letters = letterBoxes[i].textContent?.trim() || "";
        letterBoxes[i].textContent = "";

        for (let j = 0; j < letters.length; j++) {
          const span = document.createElement("span");
          span.style.animationDelay = `${letterAnimationDelay}s`;
          
          if (i === activeLetterBoxIndex) {
            span.classList.add("animate-fade-in");
          } else {
            span.classList.add("animate-fade-out");
          }

          span.textContent = letters[j];
          if (letters[j] === " ") span.classList.add("inline-block", "w-2");
          letterBoxes[i].appendChild(span);

          if (j >= letters.length - 1) break;
          letterAnimationDelay += 0.05;
        }

        if (i === activeLetterBoxIndex) {
          totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
        }

        if (i === lastActiveLetterBoxIndex) {
          letterBoxes[i].classList.add("opacity-100");
        } else {
          letterBoxes[i].classList.remove("opacity-100");
        }
      }

      setTimeout(() => {
        lastActiveLetterBoxIndex = activeLetterBoxIndex;
        activeLetterBoxIndex >= letterBoxes.length - 1 ? activeLetterBoxIndex = 0 : activeLetterBoxIndex++;
        setLetterEffect();
      }, (totalLetterBoxDelay * 1000) + 3000);
    };

    const timer = setTimeout(setLetterEffect, 1000);
    return () => clearTimeout(timer);
  }, [texts]);

  return (
    <div ref={containerRef} className={className}>
      {texts.map((text, index) => (
        <span 
          key={index}
          data-letter-effect
          className="block text-4xl md:text-6xl lg:text-7xl font-bold text-yellow-400 opacity-0 transition-opacity duration-300"
        >
          {text}
        </span>
      ))}
    </div>
  );
};
