
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, MessageCircle, Instagram, Youtube, Facebook } from "lucide-react";

export const Contact = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/9573938313/?text=Hello%2C%20how%20are%20you%3F", "_blank");
  };

  const handleInstagram = () => {
    window.open("https://www.instagram.com/kiranwesley_photography/", "_blank");
  };

  const handleYoutube = () => {
    window.open("https://www.youtube.com/@kiran_wesley", "_blank");
  };

  const handleFacebook = () => {
    window.open("https://www.facebook.com/KiranWesleyPhotography?mibextid=LQQJ4d", "_blank");
  };

  return (
    <section id="contact" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Contact Us</h2>
          <p className="text-xl text-gray-300">
            Any inquiry, Event Booking, Event Plan, Budget Quotes? Send Message.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
            
            <div className="space-y-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <MapPin className="text-yellow-400" size={24} />
                    <div>
                      <h4 className="font-bold text-white">Address</h4>
                      <p className="text-gray-300">
                        Pedda Gopuram Road, WHY NOT opp, Palakollu, W.G Dist, Andhra Pradesh, 534260
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <Phone className="text-yellow-400" size={24} />
                    <div>
                      <h4 className="font-bold text-white">Phone</h4>
                      <p className="text-gray-300">+91 9573938313</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleWhatsApp}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg"
              >
                <MessageCircle className="mr-2" size={20} />
                Contact via WhatsApp
              </Button>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleInstagram}
                  className="border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white"
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
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleFacebook}
                  className="border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                >
                  <Facebook size={20} />
                </Button>
                
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleWhatsApp}
                  className="border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                >
                  <MessageCircle size={20} />
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6">Find Us</h3>
            <div className="bg-gray-800 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.1712975327487!2d81.72528967606173!3d16.517447527281092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37daf966375855%3A0xf8d6e704e2141acd!2sKiran%20Wesley%20Photography!5e0!3m2!1sen!2sin!4v1709183383608!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-96"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700 text-center">
          <p className="text-gray-400">
            © Copyright Kiran Wesley Photography. All Rights Reserved
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Design By Flyhii @https://www.flyhii.in
          </p>
        </div>
      </div>
    </section>
  );
};
