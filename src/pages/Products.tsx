
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

// Mock product data (this would come from MongoDB in a real implementation)
const allProducts = [
  {
    id: "1",
    name: "Honeycrisp Apple",
    price: 2.99,
    image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
    category: "Premium",
    flavor: "Sweet-Tart",
    origin: "USA",
    inStock: true
  },
  {
    id: "2",
    name: "Fuji Apple",
    price: 1.99,
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80",
    category: "Classic",
    flavor: "Sweet",
    origin: "Japan",
    inStock: true
  },
  {
    id: "3",
    name: "Pink Lady",
    price: 2.49,
    image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
    category: "Premium",
    flavor: "Sweet-Tart",
    origin: "Australia",
    inStock: true
  },
  {
    id: "4",
    name: "Granny Smith",
    price: 1.79,
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=80",
    category: "Classic",
    flavor: "Tart",
    origin: "Australia",
    inStock: true
  },
  {
    id: "5",
    name: "Gala Apple",
    price: 1.89,
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80",
    category: "Classic",
    flavor: "Sweet",
    origin: "New Zealand",
    inStock: true
  },
  {
    id: "6",
    name: "Red Delicious",
    price: 1.59,
    image: "https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?w=800&q=80",
    category: "Classic",
    flavor: "Sweet",
    origin: "USA",
    inStock: false
  },
  {
    id: "7",
    name: "Golden Delicious",
    price: 1.69,
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80",
    category: "Classic",
    flavor: "Sweet",
    origin: "USA",
    inStock: true
  },
  {
    id: "8",
    name: "Ambrosia Apple",
    price: 2.79,
    image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
    category: "Premium",
    flavor: "Sweet",
    origin: "Canada",
    inStock: true
  },
  {
    id: "9",
    name: "Cosmic Crisp",
    price: 3.29,
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=80",
    category: "Specialty",
    flavor: "Sweet-Tart",
    origin: "USA",
    inStock: true
  },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState(allProducts);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFlavor, setSelectedFlavor] = useState<string | null>(null);
  const [selectedOrigin, setSelectedOrigin] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("name");
  
  // Filter categories
  const categories = [...new Set(allProducts.map(product => product.category))];
  const flavors = [...new Set(allProducts.map(product => product.flavor))];
  const origins = [...new Set(allProducts.map(product => product.origin))];

  // Filter and search products
  useEffect(() => {
    let filteredProducts = [...allProducts];

    // Apply search query
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(
        product => product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filteredProducts = filteredProducts.filter(
        product => product.category === selectedCategory
      );
    }

    // Apply flavor filter
    if (selectedFlavor) {
      filteredProducts = filteredProducts.filter(
        product => product.flavor === selectedFlavor
      );
    }

    // Apply origin filter
    if (selectedOrigin) {
      filteredProducts = filteredProducts.filter(
        product => product.origin === selectedOrigin
      );
    }

    // Apply sorting
    if (sortBy === "name") {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price-low") {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filteredProducts.sort((a, b) => b.price - a.price);
    }

    setProducts(filteredProducts);
  }, [searchQuery, selectedCategory, selectedFlavor, selectedOrigin, sortBy]);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({ search: searchQuery });
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedFlavor(null);
    setSelectedOrigin(null);
    setSearchQuery("");
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            Apple Varieties
          </h1>
          
          <form onSubmit={handleSearch} className="relative w-full md:w-64">
            <Input
              type="search"
              placeholder="Search apples..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-3 text-gray-500"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>
        
        {/* Filter and Sort Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex space-x-2 mb-4 md:mb-0">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              {(selectedCategory || selectedFlavor || selectedOrigin) && (
                <Button variant="ghost" onClick={clearFilters} size="sm">
                  Clear Filters
                </Button>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium text-sm mb-2">Category</h3>
                <div className="space-y-1">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="mr-2"
                      />
                      {category}
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-sm mb-2">Flavor Profile</h3>
                <div className="space-y-1">
                  {flavors.map((flavor) => (
                    <label key={flavor} className="flex items-center">
                      <input
                        type="radio"
                        checked={selectedFlavor === flavor}
                        onChange={() => setSelectedFlavor(flavor)}
                        className="mr-2"
                      />
                      {flavor}
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-sm mb-2">Origin</h3>
                <div className="space-y-1">
                  {origins.map((origin) => (
                    <label key={origin} className="flex items-center">
                      <input
                        type="radio"
                        checked={selectedOrigin === origin}
                        onChange={() => setSelectedOrigin(origin)}
                        className="mr-2"
                      />
                      {origin}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Results count */}
        <p className="mb-6 text-gray-600">
          Showing {products.length} {products.length === 1 ? 'variety' : 'varieties'}
        </p>
        
        {/* Products grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              No matching products found
            </h2>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <Button onClick={clearFilters}>
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
