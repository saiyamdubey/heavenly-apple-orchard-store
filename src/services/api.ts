
import { toast } from "@/components/ui/sonner";

// This would be your MongoDB connection URI in a real implementation
const API_URL = "https://api.heavenlyapple.com";

// Types for our MongoDB models
export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  createdAt?: Date;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
  category: string;
  description: string;
  flavor: string;
  origin: string;
  nutritionalFacts: {
    calories: number;
    carbs: string;
    fiber: string;
    sugar: string;
    protein: string;
  };
  inStock: boolean;
  isOrganic: boolean;
  harvestSeason: string;
  relatedProducts: string[];
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface Order {
  _id?: string;
  userId: string;
  items: {
    productId: string;
    name: string;
    price: number;
    quantity: number;
  }[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    email: string;
    phone: string;
  };
  paymentInfo: {
    method: string;
    cardLast4?: string;
  };
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  createdAt?: Date;
}

// API service functions
export const api = {
  // Auth methods
  auth: {
    login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
      try {
        // In a real app, this would be a fetch to your MongoDB backend
        const response = await mockFetch(`${API_URL}/auth/login`, {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    
    register: async (userData: Omit<User, "_id" | "createdAt">): Promise<{ user: User; token: string }> => {
      try {
        const response = await mockFetch(`${API_URL}/auth/register`, {
          method: "POST",
          body: JSON.stringify(userData),
        });
        
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    
    getProfile: async (): Promise<User> => {
      try {
        // This would check the user's token and return their profile
        const response = await mockFetch(`${API_URL}/auth/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
  },
  
  // Product methods
  products: {
    getAll: async (filters?: any): Promise<Product[]> => {
      try {
        // In a real app, this would query your MongoDB database
        const response = await mockFetch(`${API_URL}/products`, {
          method: "GET",
          params: filters,
        });
        
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    
    getById: async (id: string): Promise<Product> => {
      try {
        const response = await mockFetch(`${API_URL}/products/${id}`, {
          method: "GET",
        });
        
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    
    search: async (query: string): Promise<Product[]> => {
      try {
        const response = await mockFetch(`${API_URL}/products/search`, {
          method: "GET",
          params: { query },
        });
        
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
  },
  
  // Cart methods
  cart: {
    getItems: async (): Promise<CartItem[]> => {
      try {
        // This would retrieve the user's cart from MongoDB
        const response = await mockFetch(`${API_URL}/cart`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    
    addItem: async (productId: string, quantity: number): Promise<CartItem[]> => {
      try {
        const response = await mockFetch(`${API_URL}/cart/items`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: JSON.stringify({ productId, quantity }),
        });
        
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    
    updateItem: async (productId: string, quantity: number): Promise<CartItem[]> => {
      try {
        const response = await mockFetch(`${API_URL}/cart/items/${productId}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: JSON.stringify({ quantity }),
        });
        
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    
    removeItem: async (productId: string): Promise<CartItem[]> => {
      try {
        const response = await mockFetch(`${API_URL}/cart/items/${productId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    
    clearCart: async (): Promise<void> => {
      try {
        await mockFetch(`${API_URL}/cart`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
  },
  
  // Order methods
  orders: {
    placeOrder: async (orderData: Omit<Order, "_id" | "createdAt">): Promise<Order> => {
      try {
        const response = await mockFetch(`${API_URL}/orders`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
          body: JSON.stringify(orderData),
        });
        
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    
    getUserOrders: async (): Promise<Order[]> => {
      try {
        const response = await mockFetch(`${API_URL}/orders/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
    
    getOrderById: async (orderId: string): Promise<Order> => {
      try {
        const response = await mockFetch(`${API_URL}/orders/${orderId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        });
        
        return response;
      } catch (error) {
        handleApiError(error);
        throw error;
      }
    },
  },
};

// Helper function to handle API errors
const handleApiError = (error: any) => {
  console.error("API Error:", error);
  const message = error.message || "An unexpected error occurred";
  toast.error(message);
};

// Mock fetch implementation for demo purposes
// In a real app, this would be replaced with actual fetch calls to a MongoDB backend
const mockFetch = async (
  url: string,
  options?: {
    method?: string;
    headers?: Record<string, string>;
    body?: string;
    params?: Record<string, any>;
  }
): Promise<any> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Parse the URL to get the endpoint
  const endpoint = url.replace(API_URL, "");
  
  // Mock responses for various endpoints
  if (endpoint === "/auth/login") {
    const { email, password } = JSON.parse(options?.body || "{}");
    if (email === "user@example.com" && password === "password") {
      return {
        user: {
          _id: "user123",
          firstName: "John",
          lastName: "Doe",
          email: "user@example.com",
        },
        token: "mock_token_12345",
      };
    }
    throw new Error("Invalid email or password");
  }
  
  if (endpoint === "/auth/register") {
    const userData = JSON.parse(options?.body || "{}");
    return {
      user: {
        _id: "new_user_123",
        ...userData,
        createdAt: new Date(),
      },
      token: "mock_token_12345",
    };
  }
  
  if (endpoint === "/auth/profile") {
    return {
      _id: "user123",
      firstName: "John",
      lastName: "Doe",
      email: "user@example.com",
    };
  }
  
  if (endpoint === "/products") {
    // Return mock product data
    return [
      {
        _id: "1",
        name: "Honeycrisp Apple",
        price: 2.99,
        images: [
          "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
          "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80",
          "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=80",
        ],
        category: "Premium",
        description: "The Honeycrisp apple is exceptionally crisp and juicy with a balanced flavor that's both sweet and tart. Developed at the University of Minnesota, this apple has rapidly become a favorite due to its fantastic eating quality.",
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
      // ... more products would be here
    ];
  }
  
  if (endpoint.startsWith("/products/")) {
    const productId = endpoint.split("/").pop();
    return {
      _id: productId,
      name: "Honeycrisp Apple",
      price: 2.99,
      images: [
        "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
        "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80",
        "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800&q=80",
      ],
      category: "Premium",
      description: "The Honeycrisp apple is exceptionally crisp and juicy with a balanced flavor that's both sweet and tart. Developed at the University of Minnesota, this apple has rapidly become a favorite due to its fantastic eating quality.",
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
    };
  }
  
  if (endpoint === "/products/search") {
    return [
      {
        _id: "1",
        name: "Honeycrisp Apple",
        price: 2.99,
        images: ["https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80"],
        category: "Premium",
        description: "A crisp, juicy apple with a sweet-tart flavor.",
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
      // More search results would go here
    ];
  }
  
  if (endpoint === "/cart") {
    if (options?.method === "GET") {
      return [
        {
          productId: "1",
          name: "Honeycrisp Apple",
          price: 2.99,
          image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
          quantity: 2,
        },
        {
          productId: "2",
          name: "Fuji Apple",
          price: 1.99,
          image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80",
          quantity: 3,
        },
      ];
    } else if (options?.method === "DELETE") {
      return null;
    }
  }
  
  if (endpoint === "/cart/items" && options?.method === "POST") {
    // Add item to cart
    const { productId, quantity } = JSON.parse(options.body || "{}");
    return [
      // Return updated cart with new item
      {
        productId: "1",
        name: "Honeycrisp Apple",
        price: 2.99,
        image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
        quantity: 2,
      },
      {
        productId,
        name: "New Product",
        price: 2.49,
        image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80",
        quantity,
      },
    ];
  }
  
  if (endpoint.startsWith("/cart/items/") && options?.method === "PUT") {
    // Update item quantity
    return [
      {
        productId: "1",
        name: "Honeycrisp Apple",
        price: 2.99,
        image: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=800&q=80",
        quantity: 2,
      },
      {
        productId: "2",
        name: "Fuji Apple",
        price: 1.99,
        image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80",
        quantity: 3,
      },
    ];
  }
  
  if (endpoint.startsWith("/cart/items/") && options?.method === "DELETE") {
    // Remove item from cart
    return [
      {
        productId: "2",
        name: "Fuji Apple",
        price: 1.99,
        image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?w=800&q=80",
        quantity: 3,
      },
    ];
  }
  
  if (endpoint === "/orders" && options?.method === "POST") {
    // Place new order
    const orderData = JSON.parse(options.body || "{}");
    return {
      _id: "order123",
      ...orderData,
      status: "pending",
      createdAt: new Date(),
    };
  }
  
  if (endpoint === "/orders/user") {
    // Get user orders
    return [
      {
        _id: "order123",
        userId: "user123",
        items: [
          {
            productId: "1",
            name: "Honeycrisp Apple",
            price: 2.99,
            quantity: 2,
          },
          {
            productId: "2",
            name: "Fuji Apple",
            price: 1.99,
            quantity: 3,
          },
        ],
        shippingAddress: {
          name: "John Doe",
          address: "123 Main St",
          city: "Apple Valley",
          state: "CA",
          zip: "92307",
          email: "user@example.com",
          phone: "123-456-7890",
        },
        paymentInfo: {
          method: "Credit Card",
          cardLast4: "4321",
        },
        subtotal: 11.95,
        shipping: 5.99,
        tax: 0.96,
        discount: 0,
        total: 18.90,
        status: "pending",
        createdAt: new Date(),
      },
      // More orders would go here
    ];
  }
  
  if (endpoint.startsWith("/orders/") && options?.method === "GET") {
    // Get order by ID
    const orderId = endpoint.split("/").pop();
    return {
      _id: orderId,
      userId: "user123",
      items: [
        {
          productId: "1",
          name: "Honeycrisp Apple",
          price: 2.99,
          quantity: 2,
        },
        {
          productId: "2",
          name: "Fuji Apple",
          price: 1.99,
          quantity: 3,
        },
      ],
      shippingAddress: {
        name: "John Doe",
        address: "123 Main St",
        city: "Apple Valley",
        state: "CA",
        zip: "92307",
        email: "user@example.com",
        phone: "123-456-7890",
      },
      paymentInfo: {
        method: "Credit Card",
        cardLast4: "4321",
      },
      subtotal: 11.95,
      shipping: 5.99,
      tax: 0.96,
      discount: 0,
      total: 18.90,
      status: "pending",
      createdAt: new Date(),
    };
  }
  
  // Default response if no matching endpoint
  return { message: "Not implemented in mock API" };
};

export default api;
