
import { Card, CardContent } from "@/components/ui/card";

export const Gallery = () => {
  const galleryItems = [
    {
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749223966/f1_hts7yr.jpg",
      title: "Fashion Photography",
      category: "Model, Event",
      link: "https://www.instagram.com/kiranwesley_photography/"
    },
    {
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749224049/hm3_povm3o.jpg",
      title: "Wedding Photography",
      category: "Bride Groom",
      link: "https://www.instagram.com/kiranwesley_photography/"
    },
    {
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749223785/baby2_axou2k.jpg",
      title: "Birthday Celebrations",
      category: "Birthday Event",
      link: "https://www.instagram.com/kiranwesley_photography/"
    },
    {
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749224046/grrom4_dqydkq.jpg",
      title: "Groom Shoot",
      category: "OutDoor",
      link: "https://www.instagram.com/kiranwesley_photography/"
    },
    {
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749223785/baby8_zpqk0e.jpg",
      title: "Baby Photography",
      category: "Babies, Film",
      link: "https://www.instagram.com/kiranwesley_photography/"
    },
    {
      image: "https://res.cloudinary.com/dqopsgfom/image/upload/v1749224008/couple1_yao4oo.jpg",
      title: "Maternity Shoot",
      category: "Mom To be",
      link: "https://www.instagram.com/kiranwesley_photography/"
    }
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Gallery</h2>
          <p className="text-xl text-gray-600">Explore our stunning photography collection</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item, index) => (
            <Card key={index} className="group overflow-hidden hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.category}</p>
                      <a 
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-yellow-400 hover:text-yellow-300"
                      >
                        View More →
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
