
import { useEffect } from 'react';

export const useCustomCursor = () => {
  useEffect(() => {
    const cursor = document.querySelector("[data-cursor]") as HTMLElement;
    if (!cursor) return;

    const anchorElements = document.querySelectorAll("a");
    const buttons = document.querySelectorAll("button");

    const handleMouseMove = (event: MouseEvent) => {
      setTimeout(() => {
        cursor.style.top = `${event.clientY}px`;
        cursor.style.left = `${event.clientX}px`;
      }, 100);
    };

    const hoverActive = () => cursor.classList.add("hovered");
    const hoverDeactive = () => cursor.classList.remove("hovered");

    const addEventOnElements = (elements: NodeListOf<Element>, eventType: string, callback: () => void) => {
      for (let i = 0; i < elements.length; i++) {
        elements[i].addEventListener(eventType, callback);
      }
    };

    document.body.addEventListener("mousemove", handleMouseMove);
    
    addEventOnElements(anchorElements, "mouseover", hoverActive);
    addEventOnElements(anchorElements, "mouseout", hoverDeactive);
    addEventOnElements(buttons, "mouseover", hoverActive);
    addEventOnElements(buttons, "mouseout", hoverDeactive);

    document.body.addEventListener("mouseout", () => {
      cursor.classList.add("disabled");
    });

    document.body.addEventListener("mouseover", () => {
      cursor.classList.remove("disabled");
    });

    return () => {
      document.body.removeEventListener("mousemove", handleMouseMove);
      // Cleanup other event listeners if needed
    };
  }, []);
};
