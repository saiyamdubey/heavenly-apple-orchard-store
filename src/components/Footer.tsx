
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/9904f552-8589-4804-a70f-09bb2bb51fbe.png" 
              alt="Heavenly Apple" 
              className="w-48"
            />
            <p className="text-muted-foreground">
              Delivering the finest apples from our orchards to your doorstep since 1950.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-muted-foreground hover:text-primary transition-colors">Shop</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-muted-foreground hover:text-primary transition-colors">Returns Policy</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground">123 Apple Orchard Lane</p>
              <p className="text-muted-foreground">Fruitville, CA 95123</p>
              <p className="text-muted-foreground">Tel: (555) 123-4567</p>
              <p className="text-muted-foreground">Email: info@heavenlyapple.com</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Heavenly Apple. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
