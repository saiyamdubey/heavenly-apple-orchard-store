
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, name, price, image, category }: ProductCardProps) => {
  return (
    <div className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
      <Link to={`/products/${id}`} className="block relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1">{category}</p>
          <h3 className="font-semibold text-gray-800 mb-2">{name}</h3>
          <p className="text-primary font-medium">${price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <Button className="w-full bg-primary hover:bg-primary-hover text-white">
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
