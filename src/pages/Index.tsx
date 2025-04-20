
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";

const featuredProducts = [
  {
    id: "1",
    name: "Honeycrisp Apple",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
    category: "Premium",
  },
  {
    id: "2",
    name: "Fuji Apple",
    price: 1.99,
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80",
    category: "Classic",
  },
  {
    id: "3",
    name: "Pink Lady",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
    category: "Premium",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-5xl font-bold text-gray-800 mb-6">
              Exceptional Apples,
              <br />
              Delivered Fresh
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Experience the finest hand-picked apples from our orchards to your doorstep.
            </p>
            <Button asChild className="bg-primary hover:bg-primary-hover text-white px-8 py-6 text-lg">
              <Link to="/products">Shop Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Featured Varieties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-8">
              For generations, we've been cultivating the finest apple varieties in our family orchards.
              Our commitment to quality and sustainability ensures that every apple we deliver is perfect.
            </p>
            <Button variant="outline" asChild>
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Stay Updated
            </h2>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter for seasonal updates, special offers, and apple care tips.
            </p>
            <form className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="bg-primary hover:bg-primary-hover text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
