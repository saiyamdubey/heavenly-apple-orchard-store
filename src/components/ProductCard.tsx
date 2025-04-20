
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "@/components/ui/sonner";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock?: boolean;
  flavor?: string;
  origin?: string;
}

const ProductCard = ({ id, name, price, image, category, inStock = true, flavor, origin }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!inStock) {
      toast.error("Sorry, this item is out of stock");
      return;
    }
    
    toast.success(`${name} added to cart`);
    // In a real app, this would call an API to add the item to the cart
  };

  return (
    <div 
      className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/products/${id}`} className="block relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          {!inStock && (
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center">
              <span className="bg-white bg-opacity-90 text-red-600 font-medium px-3 py-1 rounded-md">
                Out of Stock
              </span>
            </div>
          )}
          {isHovered && inStock && (
            <Button
              className="absolute top-4 right-4 rounded-full w-10 h-10 p-0 bg-white text-primary hover:bg-primary hover:text-white"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500 mb-1">{category}</p>
              <h3 className="font-semibold text-gray-800 mb-1">{name}</h3>
              <p className="text-primary font-medium">${price.toFixed(2)}</p>
            </div>
            {flavor && origin && (
              <div className="text-right text-xs text-gray-500">
                <p>{flavor}</p>
                <p>{origin}</p>
              </div>
            )}
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <Button 
          className="w-full bg-primary hover:bg-primary-hover text-white"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          {inStock ? 'Add to Cart' : 'Sold Out'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
