
import { useState, useEffect } from 'react';

export const LoadingScreen = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoaded(true);
        document.body.classList.remove("active");
      }, 1000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  if (isLoaded) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000 ${
        isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      data-loading
    >
      <div className="text-center">
        <img 
          src="/lovable-uploads/18b75167-90d4-4a97-acbc-c8b6d5c02211.png" 
          width="55" 
          height="55" 
          alt="loading" 
          className="mx-auto mb-4 animate-pulse"
        />
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    </div>
  );
};
