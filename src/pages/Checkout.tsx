
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { CheckIcon, CreditCard, ArrowLeft, ShoppingCart, LockIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

enum CheckoutStep {
  SHIPPING = "shipping",
  PAYMENT = "payment",
  REVIEW = "review",
}

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>(CheckoutStep.SHIPPING);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Shipping form state
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    phone: "",
  });

  // Payment form state
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  });

  // Sample order items
  const orderItems = [
    {
      id: "1",
      name: "Honeycrisp Apple",
      price: 2.99,
      quantity: 2,
      total: 5.98,
      image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
    },
    {
      id: "2",
      name: "Fuji Apple",
      price: 1.99,
      quantity: 3,
      total: 5.97,
      image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80",
    },
    {
      id: "3",
      name: "Pink Lady",
      price: 2.49,
      quantity: 1,
      total: 2.49,
      image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
    },
  ];

  // Calculate order summary values
  const subtotal = orderItems.reduce((sum, item) => sum + item.total, 0);
  const shipping = 5.99;
  const discount = 0;
  const tax = subtotal * 0.08; // 8% sales tax
  const total = subtotal + shipping + tax - discount;

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutStep.PAYMENT);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(CheckoutStep.REVIEW);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // This would be an actual API call to process the payment and create the order in a real implementation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      toast.success("Order placed successfully!");
      navigate("/order-confirmation");
    } catch (error) {
      toast.error("Failed to process payment. Please try again.");
      setIsProcessing(false);
    }
  };

  const updateShippingInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const updatePaymentInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-gray-600">
            <Link to="/cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-800 mt-4">Checkout</h1>
        </div>
        
        {/* Checkout Steps */}
        <div className="mb-10">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep === CheckoutStep.SHIPPING || currentStep === CheckoutStep.PAYMENT || currentStep === CheckoutStep.REVIEW
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600"
              }`}>
                {currentStep === CheckoutStep.PAYMENT || currentStep === CheckoutStep.REVIEW ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <span>1</span>
                )}
              </div>
              <span className="ml-2 text-sm font-medium">Shipping</span>
            </div>
            
            <div className="w-16 h-1 mx-4 bg-gray-200">
              <div className={`h-full ${
                currentStep === CheckoutStep.PAYMENT || currentStep === CheckoutStep.REVIEW ? "bg-primary" : ""
              }`}></div>
            </div>
            
            <div className="flex items-center">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep === CheckoutStep.PAYMENT || currentStep === CheckoutStep.REVIEW
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600"
              }`}>
                {currentStep === CheckoutStep.REVIEW ? (
                  <CheckIcon className="h-5 w-5" />
                ) : (
                  <span>2</span>
                )}
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
            
            <div className="w-16 h-1 mx-4 bg-gray-200">
              <div className={`h-full ${
                currentStep === CheckoutStep.REVIEW ? "bg-primary" : ""
              }`}></div>
            </div>
            
            <div className="flex items-center">
              <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                currentStep === CheckoutStep.REVIEW
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-600"
              }`}>
                <span>3</span>
              </div>
              <span className="ml-2 text-sm font-medium">Review</span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Shipping Step */}
              {currentStep === CheckoutStep.SHIPPING && (
                <form onSubmit={handleShippingSubmit}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Shipping Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={shippingInfo.firstName}
                        onChange={updateShippingInfo}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={shippingInfo.lastName}
                        onChange={updateShippingInfo}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={shippingInfo.address}
                        onChange={updateShippingInfo}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={updateShippingInfo}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={shippingInfo.state}
                          onChange={updateShippingInfo}
                          className="mt-1"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input
                          id="zip"
                          name="zip"
                          value={shippingInfo.zip}
                          onChange={updateShippingInfo}
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={shippingInfo.email}
                        onChange={updateShippingInfo}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={updateShippingInfo}
                        className="mt-1"
                        required
                      />
                    </div>
                  </div>

                  <div className="mt-8">
                    <Button type="submit" className="w-full">
                      Continue to Payment
                    </Button>
                  </div>
                </form>
              )}
              
              {/* Payment Step */}
              {currentStep === CheckoutStep.PAYMENT && (
                <form onSubmit={handlePaymentSubmit}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Payment Method
                  </h2>
                  
                  <div className="border p-4 rounded-lg mb-6">
                    <div className="flex items-center">
                      <CreditCard className="h-6 w-6 text-gray-500 mr-2" />
                      <span className="font-medium">Credit or Debit Card</span>
                    </div>
                    
                    <div className="mt-6 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={paymentInfo.cardNumber}
                          onChange={updatePaymentInfo}
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input
                          id="cardName"
                          name="cardName"
                          placeholder="John Doe"
                          value={paymentInfo.cardName}
                          onChange={updatePaymentInfo}
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry">Expiration Date</Label>
                          <Input
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={paymentInfo.expiry}
                            onChange={updatePaymentInfo}
                            className="mt-1"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input
                            id="cvc"
                            name="cvc"
                            placeholder="123"
                            value={paymentInfo.cvc}
                            onChange={updatePaymentInfo}
                            className="mt-1"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-4 text-sm text-gray-600">
                      <LockIcon className="h-4 w-4 mr-1" />
                      <span>Your payment information is secure</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <input
                      id="saveCard"
                      name="saveCard"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <Label htmlFor="saveCard" className="ml-2 block text-sm text-gray-900">
                      Save this card for future purchases
                    </Label>
                  </div>
                  
                  <div className="mt-8 flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(CheckoutStep.SHIPPING)}
                    >
                      Back to Shipping
                    </Button>
                    <Button type="submit" className="flex-1">
                      Continue to Review
                    </Button>
                  </div>
                </form>
              )}
              
              {/* Review Step */}
              {currentStep === CheckoutStep.REVIEW && (
                <form onSubmit={handleOrderSubmit}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Review Your Order
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <h3 className="font-medium text-gray-800 mb-3">Shipping Information</h3>
                      <div className="text-gray-600">
                        <p>{shippingInfo.firstName} {shippingInfo.lastName}</p>
                        <p>{shippingInfo.address}</p>
                        <p>{shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}</p>
                        <p className="mt-2">{shippingInfo.email}</p>
                        <p>{shippingInfo.phone}</p>
                      </div>
                      <button
                        type="button"
                        className="text-primary hover:underline text-sm mt-2"
                        onClick={() => setCurrentStep(CheckoutStep.SHIPPING)}
                      >
                        Edit
                      </button>
                    </div>
                    
                    <div className="border-b pb-6">
                      <h3 className="font-medium text-gray-800 mb-3">Payment Method</h3>
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-gray-600">
                          •••• •••• •••• {paymentInfo.cardNumber.slice(-4)}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="text-primary hover:underline text-sm mt-2"
                        onClick={() => setCurrentStep(CheckoutStep.PAYMENT)}
                      >
                        Edit
                      </button>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-800 mb-3">Items</h3>
                      <div className="space-y-4">
                        {orderItems.map((item) => (
                          <div key={item.id} className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex-1">
                              <h4 className="font-medium text-gray-800">{item.name}</h4>
                              <p className="text-gray-600 text-sm">
                                {item.quantity} x ${item.price.toFixed(2)}
                              </p>
                            </div>
                            <p className="text-gray-800 font-medium">
                              ${item.total.toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(CheckoutStep.PAYMENT)}
                    >
                      Back to Payment
                    </Button>
                    <Button type="submit" className="flex-1" disabled={isProcessing}>
                      {isProcessing ? "Processing..." : "Place Order"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-20">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Order Summary</h2>
                <ShoppingCart className="h-5 w-5 text-gray-500" />
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="border-t pt-4 mt-4 flex justify-between">
                  <span className="text-lg font-semibold text-gray-800">Total</span>
                  <span className="text-lg font-semibold text-primary">${total.toFixed(2)}</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-500 mt-4">
                By placing your order, you agree to our{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
