"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { menuCategories, MenuItem, MenuCategory } from "@/data/menuData";

export type { MenuItem, MenuCategory };

// Type definitions
export interface CartItem {
  item: MenuItem;
  quantity: number;
}

export interface ServiceRequest {
  id: string;
  tableId: number;
  type: string;
  timestamp: string;
  status: "pending" | "resolved";
}

export interface DineInOrder {
  id: string;
  tableId: number;
  items: CartItem[];
  timestamp: string;
  status: "received" | "preparing" | "served" | "paid";
  total: number;
}

export interface DeliveryOrder {
  id: string;
  name: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  status: "placed" | "preparing" | "out-for-delivery" | "delivered";
  timestamp: string;
  eta: string; // E.g., "35 mins"
  paymentMethod: string;
  couponCode?: string;
}

export interface ScratchCard {
  id: string;
  reward: string;
  scratched: boolean;
  code: string;
}

interface AppContextType {
  // Theme
  theme: "dark" | "light";
  toggleTheme: () => void;
  
  // Menu Manager
  menu: MenuCategory[];
  updateMenuItemPrice: (categoryId: string, itemId: string, newPrice: string | number) => void;
  
  // Dine-In State
  activeTable: number | null;
  scanTableQR: (tableId: number) => void;
  clearTableSession: () => void;
  dineInCart: CartItem[];
  addDineInCart: (item: MenuItem) => void;
  removeDineInCart: (itemId: string) => void;
  clearDineInCart: () => void;
  updateDineInQty: (itemId: string, qty: number) => void;
  placeDineInOrder: () => void;
  dineInOrders: DineInOrder[];
  payDineInBill: (paymentMethod: string) => void;
  
  // Table Service Requests
  serviceRequests: ServiceRequest[];
  callWaiter: () => void;
  requestService: (type: string) => void;
  adminResolveRequest: (requestId: string) => void;
  
  // Delivery State
  deliveryCart: CartItem[];
  addDeliveryCart: (item: MenuItem) => void;
  removeDeliveryCart: (itemId: string) => void;
  clearDeliveryCart: () => void;
  updateDeliveryQty: (itemId: string, qty: number) => void;
  placeDeliveryOrder: (details: { name: string; phone: string; address: string; paymentMethod: string; couponCode?: string }) => void;
  deliveryOrders: DeliveryOrder[];
  adminUpdateDeliveryStatus: (orderId: string, status: DeliveryOrder["status"]) => void;
  
  // Loyalty & Gamification
  loyaltyPoints: number;
  membershipTier: "Bronze" | "Silver" | "Gold" | "Platinum";
  scratchCards: ScratchCard[];
  scratchCardComplete: (id: string) => void;
  addRewardPoints: (points: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // --- Theme State ---
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", theme);
  }, [theme]);

  // --- Menu State ---
  const [menu, setMenu] = useState<MenuCategory[]>(menuCategories);

  const updateMenuItemPrice = (categoryId: string, itemId: string, newPrice: string | number) => {
    setMenu((prevMenu) =>
      prevMenu.map((cat) => {
        if (cat.id === categoryId) {
          return {
            ...cat,
            items: cat.items.map((item) =>
              item.id === itemId ? { ...item, price: newPrice } : item
            )
          };
        }
        return cat;
      })
    );
  };

  // --- Dine-In State ---
  const [activeTable, setActiveTable] = useState<number | null>(null);
  const [dineInCart, setDineInCart] = useState<CartItem[]>([]);
  const [dineInOrders, setDineInOrders] = useState<DineInOrder[]>([]);
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);

  const scanTableQR = (tableId: number) => {
    setActiveTable(tableId);
    setDineInCart([]);
  };

  const clearTableSession = () => {
    setActiveTable(null);
    setDineInCart([]);
  };

  const addDineInCart = (item: MenuItem) => {
    setDineInCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) => (ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci));
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeDineInCart = (itemId: string) => {
    setDineInCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const clearDineInCart = () => setDineInCart([]);

  const updateDineInQty = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeDineInCart(itemId);
      return;
    }
    setDineInCart((prev) => prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity: qty } : ci)));
  };

  const getCartTotal = (cart: CartItem[]) => {
    return cart.reduce((total, ci) => {
      let price = 0;
      if (typeof ci.item.price === "number") {
        price = ci.item.price;
      } else {
        // Handle dual prices like "355/375" or Half/Full by taking the first price
        const parsed = parseInt(String(ci.item.price).split("/")[0]);
        price = isNaN(parsed) ? 0 : parsed;
      }
      return total + price * ci.quantity;
    }, 0);
  };

  const placeDineInOrder = () => {
    if (activeTable === null || dineInCart.length === 0) return;
    const orderTotal = getCartTotal(dineInCart);
    const newOrder: DineInOrder = {
      id: "DIO-" + Math.floor(100 + Math.random() * 900),
      tableId: activeTable,
      items: [...dineInCart],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "received",
      total: orderTotal
    };

    setDineInOrders((prev) => [...prev, newOrder]);
    setDineInCart([]); // Clear cart after placing order
  };

  const payDineInBill = (paymentMethod: string) => {
    if (activeTable === null) return;
    
    // Mark all orders for the current table as paid
    setDineInOrders((prev) =>
      prev.map((order) =>
        order.tableId === activeTable && order.status !== "paid"
          ? { ...order, status: "paid" }
          : order
      )
    );

    // Calculate total paid to award points
    const unpaidTotal = dineInOrders
      .filter((o) => o.tableId === activeTable && o.status !== "paid")
      .reduce((sum, o) => sum + o.total, 0);

    // Award loyalty points: 10% of total spent
    if (unpaidTotal > 0) {
      addRewardPoints(Math.floor(unpaidTotal * 0.1));
    }
  };

  // --- Table Service Requests ---
  const callWaiter = () => {
    if (activeTable === null) return;
    const newReq: ServiceRequest = {
      id: "SR-" + Math.random().toString(36).substr(2, 9),
      tableId: activeTable,
      type: "Waiter Called",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "pending"
    };
    setServiceRequests((prev) => [newReq, ...prev]);
  };

  const requestService = (type: string) => {
    if (activeTable === null) return;
    const newReq: ServiceRequest = {
      id: "SR-" + Math.random().toString(36).substr(2, 9),
      tableId: activeTable,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "pending"
    };
    setServiceRequests((prev) => [newReq, ...prev]);
  };

  const adminResolveRequest = (requestId: string) => {
    setServiceRequests((prev) =>
      prev.map((req) => (req.id === requestId ? { ...req, status: "resolved" } : req))
    );
  };

  // --- Delivery State ---
  const [deliveryCart, setDeliveryCart] = useState<CartItem[]>([]);
  const [deliveryOrders, setDeliveryOrders] = useState<DeliveryOrder[]>([]);

  const addDeliveryCart = (item: MenuItem) => {
    setDeliveryCart((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id);
      if (existing) {
        return prev.map((ci) => (ci.item.id === item.id ? { ...ci, quantity: ci.quantity + 1 } : ci));
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeDeliveryCart = (itemId: string) => {
    setDeliveryCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const clearDeliveryCart = () => setDeliveryCart([]);

  const updateDeliveryQty = (itemId: string, qty: number) => {
    if (qty <= 0) {
      removeDeliveryCart(itemId);
      return;
    }
    setDeliveryCart((prev) => prev.map((ci) => (ci.item.id === itemId ? { ...ci, quantity: qty } : ci)));
  };

  const placeDeliveryOrder = (details: { name: string; phone: string; address: string; paymentMethod: string; couponCode?: string }) => {
    if (deliveryCart.length === 0) return;
    let orderTotal = getCartTotal(deliveryCart);
    
    // Simple 15% discount for coupon code "FREEHIT" or "STADIUM15"
    if (details.couponCode && (details.couponCode.toUpperCase() === "FREEHIT" || details.couponCode.toUpperCase() === "STADIUM15")) {
      orderTotal = Math.floor(orderTotal * 0.85);
    }

    const newOrder: DeliveryOrder = {
      id: "DEL-" + Math.floor(1000 + Math.random() * 9000),
      name: details.name,
      phone: details.phone,
      address: details.address,
      items: [...deliveryCart],
      total: orderTotal + 40, // ₹40 delivery charge
      status: "placed",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      eta: "35-45 mins",
      paymentMethod: details.paymentMethod,
      couponCode: details.couponCode
    };

    setDeliveryOrders((prev) => [newOrder, ...prev]);
    setDeliveryCart([]);

    // Add reward points for delivery: 5% of order total
    addRewardPoints(Math.floor(orderTotal * 0.05));
    
    // Randomly award a scratch card for orders > 500
    if (orderTotal > 500) {
      const newCard: ScratchCard = {
        id: "SC-" + Math.floor(1000 + Math.random() * 9000),
        reward: Math.random() > 0.5 ? "Free Dessert on Dine-In" : "₹100 Cashback Coupon",
        code: "LBW" + Math.floor(100 + Math.random() * 900),
        scratched: false
      };
      setScratchCards((prev) => [newCard, ...prev]);
    }
  };

  const adminUpdateDeliveryStatus = (orderId: string, status: DeliveryOrder["status"]) => {
    setDeliveryOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
  };

  // --- Loyalty & Gamification State ---
  const [loyaltyPoints, setLoyaltyPoints] = useState(380); // Start with some default points for simulation
  const [membershipTier, setMembershipTier] = useState<"Bronze" | "Silver" | "Gold" | "Platinum">("Bronze");
  const [scratchCards, setScratchCards] = useState<ScratchCard[]>([
    { id: "sc-1", reward: "Free Mango Shake on next Table Dine-In", scratched: false, code: "LBWMANGO" },
    { id: "sc-2", reward: "15% off coupon on Delivery order", scratched: false, code: "STADIUM15" }
  ]);

  const addRewardPoints = (points: number) => {
    setLoyaltyPoints((prev) => prev + points);
  };

  const scratchCardComplete = (id: string) => {
    setScratchCards((prev) =>
      prev.map((sc) => (sc.id === id ? { ...sc, scratched: true } : sc))
    );
  };

  useEffect(() => {
    // Recalculate membership tier based on points
    if (loyaltyPoints >= 2500) {
      setMembershipTier("Platinum");
    } else if (loyaltyPoints >= 1000) {
      setMembershipTier("Gold");
    } else if (loyaltyPoints >= 500) {
      setMembershipTier("Silver");
    } else {
      setMembershipTier("Bronze");
    }
  }, [loyaltyPoints]);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        menu,
        updateMenuItemPrice,
        activeTable,
        scanTableQR,
        clearTableSession,
        dineInCart,
        addDineInCart,
        removeDineInCart,
        clearDineInCart,
        updateDineInQty,
        placeDineInOrder,
        dineInOrders,
        payDineInBill,
        serviceRequests,
        callWaiter,
        requestService,
        adminResolveRequest,
        deliveryCart,
        addDeliveryCart,
        removeDeliveryCart,
        clearDeliveryCart,
        updateDeliveryQty,
        placeDeliveryOrder,
        deliveryOrders,
        adminUpdateDeliveryStatus,
        loyaltyPoints,
        membershipTier,
        scratchCards,
        scratchCardComplete,
        addRewardPoints
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
