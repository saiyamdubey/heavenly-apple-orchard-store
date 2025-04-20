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
    flavor: "Sweet & Crisp",
    origin: "Washington",
  },
  {
    id: "2",
    name: "Fuji Apple",
    price: 1.99,
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80",
    category: "Classic",
    flavor: "Sweet & Juicy",
    origin: "California",
  },
  {
    id: "3",
    name: "Pink Lady",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
    category: "Premium",
    flavor: "Sweet-Tart",
    origin: "Oregon",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Food Blogger",
    content: "The best apples I've ever tasted. The quality is consistently excellent.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=200&h=200&fit=crop",
  },
  {
    name: "Mike Chen",
    role: "Chef",
    content: "Heavenly Apple's selection is unmatched. Perfect for my restaurant's desserts.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=200&h=200&fit=crop",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl animate-fade-in flex items-center space-x-6">
            <img 
              src="/lovable-uploads/9904f552-8589-4804-a70f-09bb2bb51fbe.png" 
              alt="Heavenly Apple" 
              className="h-24 w-24"
            />
            <div>
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
          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-gray-800 mb-12 text-center">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{testimonial.name}</h3>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">{testimonial.content}</p>
              </div>
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
