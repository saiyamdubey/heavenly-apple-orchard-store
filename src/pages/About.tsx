
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Our Story</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
                alt="Our Orchard"
                className="rounded-lg shadow-lg w-full h-[300px] object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Heritage & Tradition</h2>
              <p className="text-gray-600 mb-4">
                Since 1950, Heavenly Apple has been cultivating the finest apple varieties in our family orchards.
                Our commitment to quality and sustainable farming practices ensures that every apple we deliver
                meets our exacting standards.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We use eco-friendly farming practices to protect our environment.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quality</h3>
              <p className="text-gray-600">
                Every apple is hand-picked at peak ripeness.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community</h3>
              <p className="text-gray-600">
                Supporting local communities through sustainable agriculture.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
