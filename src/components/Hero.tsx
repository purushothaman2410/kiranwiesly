/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Camera, Instagram, Youtube } from "lucide-react";
import { TextAnimation } from "./TextAnimation";
import { useEffect, useState } from "react";

// ✅ Sliding Background with API-based image fetching
const SlidingBackground = () => {
  const [images, setImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL; // Adjust this based on your API endpoint
  useEffect(() => {
    const fetchSliderImages = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/sliders`); // Adjust the endpoint as needed
        const data = await res.json();
        const urls = data.map((img: any) => img.base64 || img.imageUrl); // Adjust based on your API response
        setImages(urls);
      } catch (error) {
        console.error("Failed to load slider images:", error);
      }
    };

    fetchSliderImages();
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // every 5s
    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="absolute inset-0">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out bg-cover bg-center bg-no-repeat`}
          style={{
            backgroundImage: `url('${img}')`,
            opacity: index === currentIndex ? 0.5 : 0,
            filter: "blur(8px)",
            backgroundAttachment: "fixed",
            zIndex: 0,
          }}
        ></div>
      ))}
    </div>
  );
};

// ✅ Hero Section
export const Hero = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/9573938313/?text=Hello%2C%20how%20are%20you%3F", "_blank");
  };

  const handleInstagram = () => {
    window.open("https://www.instagram.com/kiranwesley_photography/", "_blank");
  };

  const handleYoutube = () => {
    window.open("https://www.youtube.com/@kiran_wesley", "_blank");
  };

  const animatedTexts = ["Photography", "Videography", "Film Making"];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-black">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>

      {/* Sliding Background */}
      <SlidingBackground />

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 mt-8" data-reveal>
        <div className="flex justify-center mb-6">
          <Camera size={64} className="text-yellow-400" />
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          Kiran Wesley
          <TextAnimation texts={animatedTexts} className="mt-4" />
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
          Capturing life's precious moments with passion and creativity for over 10 years
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button
            onClick={handleWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
          >
            Book Your Session
          </Button>

          <div className="flex gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleInstagram}
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              <Instagram size={20} />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={handleYoutube}
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              <Youtube size={20} />
            </Button>
          </div>
        </div>

        <div className="text-sm text-gray-400">
          <p>📍 Palakollu, Andhra Pradesh | 📞 +91 9573938313</p>
        </div>
      </div>
    </section>
  );
};
