
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Truck, ArrowLeft, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "@/components/ui/sonner";

// Mock product data
const products = {
  "1": {
    id: "1",
    name: "Honeycrisp Apple",
    price: 2.99,
    images: [
      "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
      "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80",
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=80",
    ],
    category: "Premium",
    description: "The Honeycrisp apple is an exceptionally crisp and juicy apple with a well-balanced sweet-tart flavor. Developed at the University of Minnesota, this apple has rapidly become a favorite for many due to its fantastic eating quality and storage life.",
    flavor: "Sweet-Tart",
    origin: "USA",
    nutritionalFacts: {
      calories: 95,
      carbs: "25g",
      fiber: "4g",
      sugar: "19g",
      protein: "0.5g"
    },
    inStock: true,
    isOrganic: true,
    harvestSeason: "Fall",
    relatedProducts: ["2", "3", "8"]
  },
  "2": {
    id: "2",
    name: "Fuji Apple",
    price: 1.99,
    images: [
      "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80",
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80",
      "https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?w=800&q=80",
    ],
    category: "Classic",
    description: "The Fuji apple is a sweet and crisp apple, named after the Japanese town where it was developed. It's a cross between Red Delicious and Virginia Ralls Genet apples. The Fuji has dense flesh that's juicy and sweet with hints of both honey and citrus.",
    flavor: "Sweet",
    origin: "Japan",
    nutritionalFacts: {
      calories: 80,
      carbs: "21g",
      fiber: "3.8g",
      sugar: "16g",
      protein: "0.3g"
    },
    inStock: true,
    isOrganic: false,
    harvestSeason: "Late Fall to Winter",
    relatedProducts: ["1", "5", "7"]
  },
  "3": {
    id: "3",
    name: "Pink Lady",
    price: 2.49,
    images: [
      "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=80",
      "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80",
    ],
    category: "Premium",
    description: "Pink Lady® apples are known for their distinctive pink-red blush over a green background. They have a unique sweet-tart flavor and effervescent finish. This apple was developed in Australia by crossing Golden Delicious with Lady Williams apples.",
    flavor: "Sweet-Tart",
    origin: "Australia",
    nutritionalFacts: {
      calories: 85,
      carbs: "22g",
      fiber: "4.2g",
      sugar: "17g",
      protein: "0.4g"
    },
    inStock: true,
    isOrganic: true,
    harvestSeason: "Late Fall",
    relatedProducts: ["1", "8", "9"]
  },
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>("description");

  // Get the product based on the ID from the URL
  const product = id ? products[id] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Product Not Found</h1>
          <p className="text-gray-600 mb-8">
            Sorry, the product you are looking for does not exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast.success(`${quantity} ${product.name}${quantity > 1 ? 's' : ''} added to cart`);
    // In a real app, this would update the cart state or call an API
  };

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="text-gray-600">
            <Link to="/products">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Products
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden aspect-square">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden border-2 ${
                    selectedImage === index ? "border-primary" : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Product Information */}
          <div>
            <div className="mb-6">
              <div className="flex items-center">
                <span className="inline-block bg-gray-100 text-gray-800 px-2 py-1 text-xs rounded-md mr-2">
                  {product.category}
                </span>
                {product.isOrganic && (
                  <span className="inline-block bg-green-100 text-green-800 px-2 py-1 text-xs rounded-md">
                    Organic
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mt-2">{product.name}</h1>
              <div className="mt-2">
                <span className="text-2xl font-semibold text-primary">${product.price.toFixed(2)}</span>
                <span className="text-gray-500 ml-2">per lb</span>
              </div>
            </div>
            
            <div className="mb-8">
              <p className="text-gray-600">{product.description.substring(0, 150)}...</p>
            </div>
            
            <div className="mb-8 border-y border-gray-200 py-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="block text-sm text-gray-500">Flavor Profile</span>
                  <span className="font-medium">{product.flavor}</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500">Origin</span>
                  <span className="font-medium">{product.origin}</span>
                </div>
                <div>
                  <span className="block text-sm text-gray-500">Season</span>
                  <span className="font-medium">{product.harvestSeason}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                  <span>{product.inStock ? "In Stock" : "Out of Stock"}</span>
                </div>
                
                <div className="flex items-center">
                  <Truck className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="text-gray-600">Free shipping on orders over $50</span>
                </div>
              </div>
            </div>
            
            {product.inStock && (
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="mr-6">
                    <label htmlFor="quantity" className="block text-sm text-gray-500 mb-1">
                      Quantity (lbs)
                    </label>
                    <select
                      id="quantity"
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="border border-gray-300 rounded-md px-3 py-1.5"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Total</label>
                    <span className="font-semibold text-primary">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Button onClick={handleAddToCart} className="flex-1">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
            
            {/* Collapsible Sections */}
            <div className="space-y-4">
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection("description")}
                  className="flex justify-between items-center w-full py-4"
                >
                  <h3 className="font-medium text-gray-800">Description</h3>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedSection === "description" ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedSection === "description" && (
                  <div className="pb-4">
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                )}
              </div>
              
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection("nutrition")}
                  className="flex justify-between items-center w-full py-4"
                >
                  <h3 className="font-medium text-gray-800">Nutritional Information</h3>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedSection === "nutrition" ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedSection === "nutrition" && (
                  <div className="pb-4">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h4 className="font-medium mb-2">Nutritional Facts (per apple)</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li className="flex justify-between">
                          <span>Calories:</span>
                          <span>{product.nutritionalFacts.calories}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Carbohydrates:</span>
                          <span>{product.nutritionalFacts.carbs}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Fiber:</span>
                          <span>{product.nutritionalFacts.fiber}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Sugar:</span>
                          <span>{product.nutritionalFacts.sugar}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Protein:</span>
                          <span>{product.nutritionalFacts.protein}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleSection("shipping")}
                  className="flex justify-between items-center w-full py-4"
                >
                  <h3 className="font-medium text-gray-800">Shipping & Storage</h3>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      expandedSection === "shipping" ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedSection === "shipping" && (
                  <div className="pb-4">
                    <p className="text-gray-600 mb-3">
                      Our apples are carefully packed and shipped in temperature-controlled containers to ensure 
                      freshness upon arrival. Orders typically ship within 24 hours Monday-Friday.
                    </p>
                    <h4 className="font-medium mb-2">Storage Tips:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      <li>Store in refrigerator for maximum freshness</li>
                      <li>Keep apples away from strong-smelling foods</li>
                      <li>Optimal storage temperature: 32-35°F</li>
                      <li>Will stay fresh for up to 3 weeks when refrigerated</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* This would use the relatedProducts array to fetch and display related items */}
            {product.relatedProducts.map((relatedId) => (
              <div key={relatedId} className="group bg-white rounded-lg shadow-sm overflow-hidden">
                <Link to={`/products/${relatedId}`} className="block">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={products[relatedId]?.images[0]}
                      alt={products[relatedId]?.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-gray-500 mb-1">{products[relatedId]?.category}</p>
                    <h3 className="font-semibold text-gray-800 mb-2">{products[relatedId]?.name}</h3>
                    <p className="text-primary font-medium">${products[relatedId]?.price.toFixed(2)}</p>
                  </div>
                </Link>
                <div className="p-4 pt-0">
                  <Button 
                    onClick={() => {
                      toast.success(`${products[relatedId]?.name} added to cart`);
                    }}
                    className="w-full"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
