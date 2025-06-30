/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export const Services = () => {
  const [services, setServicesImages] = useState<any[]>([]);
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/gallery"); // replace with your actual API URL
        const data = await res.json();

        const formatted = data.map((item: any) => ({
          id: item._id,
          url: item.image, // This is the base64 URL from backend
          title: item.title || "Untitled",
          category: item.category || "Uncategorized",
        }));

        setServicesImages(formatted);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      }
    };

    fetchImages();
  }, []);
  const handleWhatsApp = () => {
    window.open("https://wa.me/9573938313/?text=Hello%2C%20how%20are%20you%3F", "_blank");
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
          <p className="text-xl text-gray-600">Professional photography and videography services</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button 
                      onClick={handleWhatsApp}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black"
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
