
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle, PackageIcon, TruckIcon, MailIcon } from "lucide-react";
import Navbar from "@/components/Navbar";

const OrderConfirmation = () => {
  // In a real app, this would be retrieved from the backend/database
  const orderInfo = {
    id: "ORD-29384",
    date: new Date().toLocaleDateString(),
    total: 14.44,
    items: [
      {
        id: "1",
        name: "Honeycrisp Apple",
        price: 2.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
      },
      {
        id: "2",
        name: "Fuji Apple",
        price: 1.99,
        quantity: 3,
        image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80",
      },
      {
        id: "3",
        name: "Pink Lady",
        price: 2.49,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St",
      city: "Apple Valley",
      state: "CA",
      zip: "92307",
    },
    shippingMethod: "Standard Shipping (3-5 business days)",
    paymentMethod: "Credit Card ending in 4321",
    estimatedDelivery: "May 15-18, 2025",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-8">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Thank You for Your Order!
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Your order has been received and is being processed.
            </p>
            
            <div className="bg-gray-50 rounded-md p-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-semibold text-gray-800">{orderInfo.id}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">Order Date:</span>
                <span className="text-gray-800">{orderInfo.date}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold text-primary">${orderInfo.total.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild>
                <Link to="/account/orders">View Order Details</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/products">Continue Shopping</Link>
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Details</h2>
            
            <div className="mb-8">
              <h3 className="font-medium text-gray-800 mb-3">Items Ordered</h3>
              <div className="divide-y divide-gray-200">
                {orderInfo.items.map((item) => (
                  <div key={item.id} className="py-4 flex items-center">
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
                      ${(item.quantity * item.price).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-medium text-gray-800 mb-3">Shipping Information</h3>
                <div className="text-gray-600">
                  <p>{orderInfo.shippingAddress.name}</p>
                  <p>{orderInfo.shippingAddress.address}</p>
                  <p>
                    {orderInfo.shippingAddress.city}, {orderInfo.shippingAddress.state}{" "}
                    {orderInfo.shippingAddress.zip}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-gray-800 font-medium">Shipping Method</p>
                  <p className="text-gray-600">{orderInfo.shippingMethod}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-3">Payment Information</h3>
                <p className="text-gray-600">{orderInfo.paymentMethod}</p>
                <div className="mt-4">
                  <p className="text-gray-800 font-medium">Estimated Delivery</p>
                  <p className="text-gray-600">{orderInfo.estimatedDelivery}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">What's Next?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-50 rounded-full p-3 mb-4">
                  <MailIcon className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Order Confirmation</h3>
                <p className="text-gray-600 text-sm">
                  We've sent a confirmation email to your inbox with your order details.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-amber-50 rounded-full p-3 mb-4">
                  <PackageIcon className="h-6 w-6 text-amber-500" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Processing & Picking</h3>
                <p className="text-gray-600 text-sm">
                  We're preparing your order and will notify you when it's ready to ship.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-50 rounded-full p-3 mb-4">
                  <TruckIcon className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">Shipping</h3>
                <p className="text-gray-600 text-sm">
                  You'll receive an email with tracking information when your order ships.
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                Questions about your order? Contact our customer support team.
              </p>
              <Button asChild variant="outline">
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
