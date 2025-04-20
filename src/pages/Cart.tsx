
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon, Trash2Icon, RefreshCwIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "@/components/ui/sonner";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Honeycrisp Apple",
      price: 2.99,
      image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
      quantity: 2,
    },
    {
      id: "2",
      name: "Fuji Apple",
      price: 1.99,
      image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80",
      quantity: 3,
    },
    {
      id: "3",
      name: "Pink Lady",
      price: 2.49,
      image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
      quantity: 1,
    },
  ]);
  
  const [promoCode, setPromoCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [discount, setDiscount] = useState(0);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const applyPromoCode = () => {
    setIsApplying(true);
    // Simulate API call
    setTimeout(() => {
      if (promoCode.toLowerCase() === "apple10") {
        setDiscount(10);
        toast.success("Promo code applied successfully!");
      } else {
        toast.error("Invalid promo code");
      }
      setIsApplying(false);
    }, 1000);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal + shipping - discount;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Cart</h1>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}
                  </h2>
                </div>
                
                <div className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center p-6">
                      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      
                      <div className="ml-4 flex flex-1 flex-col">
                        <div className="flex justify-between text-base font-medium text-gray-800">
                          <h3>
                            <Link to={`/products/${item.id}`} className="hover:text-primary">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              <MinusIcon className="h-4 w-4" />
                            </button>
                            <span className="px-4 py-1">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                            >
                              <PlusIcon className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 flex items-center"
                          >
                            <Trash2Icon className="h-4 w-4 mr-1" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">You might also like</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Recommended products */}
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <img
                      src="https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=800&q=80"
                      alt="Gala Apple"
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h4 className="font-medium text-gray-800">Gala Apple</h4>
                    <p className="text-primary font-medium mt-2">$1.89</p>
                    <Button className="w-full mt-3">Add to Cart</Button>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <img
                      src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=80"
                      alt="Granny Smith"
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h4 className="font-medium text-gray-800">Granny Smith</h4>
                    <p className="text-primary font-medium mt-2">$2.19</p>
                    <Button className="w-full mt-3">Add to Cart</Button>
                  </div>
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <img
                      src="https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?w=800&q=80"
                      alt="Red Delicious"
                      className="w-full h-40 object-cover rounded-md mb-4"
                    />
                    <h4 className="font-medium text-gray-800">Red Delicious</h4>
                    <p className="text-primary font-medium mt-2">$1.79</p>
                    <Button className="w-full mt-3">Add to Cart</Button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
                <h2 className="text-lg font-semibold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium">${subtotal.toFixed(2)}</p>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <p>Discount</p>
                      <p>-${discount.toFixed(2)}</p>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <p className="text-gray-600">Shipping</p>
                    <p className="font-medium">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </p>
                  </div>
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between">
                      <p className="text-lg font-semibold text-gray-800">Total</p>
                      <p className="text-lg font-semibold text-primary">${total.toFixed(2)}</p>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Including taxes and fees
                    </p>
                  </div>
                </div>
                
                {/* Promo Code */}
                <div className="mt-6 border-t pt-6">
                  <label htmlFor="promo-code" className="text-sm font-medium text-gray-700">
                    Promo Code
                  </label>
                  <div className="mt-2 flex space-x-2">
                    <input
                      type="text"
                      id="promo-code"
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <Button
                      onClick={applyPromoCode}
                      disabled={!promoCode || isApplying}
                      className="relative"
                    >
                      {isApplying ? (
                        <RefreshCwIcon className="h-4 w-4 animate-spin" />
                      ) : (
                        "Apply"
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Try "APPLE10" for 10% off
                  </p>
                </div>
                
                {/* Checkout Button */}
                <div className="mt-6">
                  <Button asChild className="w-full py-6 text-lg">
                    <Link to="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Link
                    to="/products"
                    className="block text-center mt-4 text-primary hover:underline"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <img
              src="/empty-cart.svg"
              alt="Empty Cart"
              className="w-32 h-32 mx-auto mb-6 opacity-50"
            />
            <h2 className="text-2xl font-medium text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any apples to your cart yet.
            </p>
            <Button asChild size="lg">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
