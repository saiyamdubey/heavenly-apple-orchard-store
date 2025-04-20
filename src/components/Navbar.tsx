
import { ShoppingCart, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/9904f552-8589-4804-a70f-09bb2bb51fbe.png" 
              alt="Heavenly Apple" 
              className="w-48"
            />
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/products" className="text-foreground hover:text-primary transition-colors">
              Shop
            </Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="text-foreground hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Link to="/cart" className="text-foreground hover:text-primary transition-colors">
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <Link to="/account" className="text-foreground hover:text-primary transition-colors">
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
