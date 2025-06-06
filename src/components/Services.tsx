
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Services = () => {
  const services = [
    {
      title: "Christian Wedding",
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749224032/cm1_gkgutf.jpg",
      description: "Complete Christian wedding photography and videography services"
    },
    {
      title: "Hindu Wedding",
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749224049/hm3_povm3o.jpg",
      description: "Traditional Hindu wedding ceremonies captured beautifully"
    },
    {
      title: "Birthday Shoots",
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749224030/birthdaybaby_dmjoda.jpg",
      description: "Memorable birthday celebration photography"
    },
    {
      title: "Candid Photography",
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749223786/candid_rgvtep.jpg",
      description: "Natural, spontaneous moments captured perfectly"
    },
    {
      title: "Couple Shoots",
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749224027/couple6_ecqgoz.jpg",
      description: "Romantic couple photography sessions"
    },
    {
      title: "Cinematic Wedding",
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749224010/couple3_karski.jpg",
      description: "Movie-style wedding videography"
    },
    {
      title: "Short Film Making",
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749224012/short-film_pvrxev.webp",
      description: "Professional short film production"
    },
    {
      title: "Drone Photography",
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749224053/Drone_nfkmfm.jpg",
      description: "Aerial photography and videography"
    },
    {
      title: "Film Making",
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749224056/Film_ljnhdf.jpg",
      description: "Complete film production services"
    },
    {
      title: "Advertisement Making",
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749223967/f7_rlxqes.jpg",
      description: "Professional advertisement creation"
    },
    {
      title: "Live Streaming",
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749224004/Led_screens_d13rqx.webp",
      description: "YouTube live streaming and LED wall services"
    }
  ];

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
