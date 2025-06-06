
import { Button } from "@/components/ui/button";
import { Camera, Instagram, Youtube } from "lucide-react";

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

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-black">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90"></div>
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/placeholder.svg')",
        }}
      ></div>

      <div className="relative z-10 text-center text-white px-4">
        <div className="flex justify-center mb-6">
          <Camera size={64} className="text-yellow-400" />
        </div>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          Kiran Wesley
          <span className="block text-yellow-400">Photography</span>
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
