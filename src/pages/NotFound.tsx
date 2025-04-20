
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="flex flex-col items-center space-y-4">
          <img 
            src="/lovable-uploads/9904f552-8589-4804-a70f-09bb2bb51fbe.png" 
            alt="Heavenly Apple" 
            className="h-24 w-72"
          />
          {/* <h1 className="text-4xl font-bold text-red-600 mb-4">Heavenly Apple</h1> */}
        </div>
        <h2 className="text-4xl font-bold mb-4">404</h2>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <Link to="/" className="text-red-500 hover:text-red-700 underline text-lg">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

