import { createContext, useContext, useEffect, useState } from "react";

const OrdersContext = createContext(null);
const STORAGE_KEY = "vv_orders";

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function OrdersProvider({ children }) {
  const [orders, setOrders] = useState(loadOrders);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (order) => {
    const newOrder = {
      id: `VV${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString(),
      status: "Placed",
      ...order,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const getOrdersForUser = (email) =>
    orders.filter((o) => o.email?.toLowerCase() === email?.toLowerCase());

  return (
    <OrdersContext.Provider value={{ orders, placeOrder, getOrdersForUser }}>
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used inside OrdersProvider");
  return ctx;
}
