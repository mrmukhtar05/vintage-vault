import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "vv_cart";

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return [];

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch (error) {
    console.error("Cart load error:", error);
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  // Save cart
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = (product, qty = 1, size = product?.size || "One Size") => {
    if (!product?._id) {
      console.error("Product ID missing:", product);
      return;
    }

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          String(item._id) === String(product._id) &&
          (item.size || "One Size") === size
      );

      if (existing) {
        return prev.map((item) =>
          String(item._id) === String(product._id) &&
          (item.size || "One Size") === size
            ? {
                ...item,
                qty: item.qty + qty,
              }
            : item
        );
      }

      return [
        ...prev,
        {
          ...product,
          _id: product._id,
          size,
          qty,
        },
      ];
    });
  };

  // =========================
  // REMOVE FROM CART
  // =========================
  const removeFromCart = (id, size) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            String(item._id) === String(id) &&
            (item.size || "One Size") === (size || "One Size")
          )
      )
    );
  };

  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQty = (id, size, qty) => {
    if (qty < 1) return;

    setCart((prev) =>
      prev.map((item) =>
        String(item._id) === String(id) &&
        (item.size || "One Size") === (size || "One Size")
          ? {
              ...item,
              qty,
            }
          : item
      )
    );
  };

  // =========================
  // CLEAR CART
  // =========================
  const clearCart = () => {
    setCart([]);
  };

  // =========================
  // CART COUNT
  // =========================
  const cartCount = cart.reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0
  );

  // =========================
  // CURRENT TOTAL
  // =========================
  const cartTotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.qty || 0),
    0
  );

  // =========================
  // OLD TOTAL
  // =========================
  const cartOldTotal = cart.reduce(
    (sum, item) =>
      sum +
      Number(item.oldPrice ?? item.price ?? 0) *
        Number(item.qty || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        cartCount,
        cartTotal,
        cartOldTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return ctx;
}