
export const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6">
              Hi. I'm <br />
              <span className="text-yellow-400">Kiran Wesley</span>
            </h2>
            
            <div className="space-y-4 text-lg text-gray-300">
              <p>
                A passionate <em className="text-yellow-400">photographer</em> who has been working in this field for the{" "}
                <em className="text-yellow-400">last 10 years.</em> I'm ready to give you my best.
              </p>
              
              <p>
                From intimate weddings to grand celebrations, from newborn shoots to fashion photography, 
                I capture the essence of every moment with creativity and precision.
              </p>
              
              <p>
                Based in Palakollu, Andhra Pradesh, I serve clients across the region with professional 
                photography and videography services that tell your unique story.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 text-center">
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-yellow-400">10+</div>
                <div className="text-gray-300">Years Experience</div>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="text-3xl font-bold text-yellow-400">500+</div>
                <div className="text-gray-300">Happy Clients</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="/placeholder.svg"
                alt="Kiran Wesley"
                className="w-full max-w-md mx-auto rounded-lg shadow-2xl"
              />
            </div>
            <div className="absolute top-4 left-4 w-full h-full bg-yellow-400 rounded-lg -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
