import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);

const STORAGE_KEY = "vv_wishlist";

function loadWishlist() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) return [];

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Wishlist load error:", error);
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(loadWishlist);

  // Save wishlist
  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // =========================
  // CHECK WISHLIST
  // =========================
  const isWishlisted = (id) => {
    return wishlist.some(
      (product) =>
        String(product._id) === String(id)
    );
  };

  // =========================
  // ADD / REMOVE
  // =========================
  const toggleWishlist = (product) => {
    if (!product?._id) {
      console.error(
        "Product ID missing:",
        product
      );
      return;
    }

    setWishlist((prev) => {
      const exists = prev.some(
        (item) =>
          String(item._id) ===
          String(product._id)
      );

      if (exists) {
        return prev.filter(
          (item) =>
            String(item._id) !==
            String(product._id)
        );
      }

      return [...prev, product];
    });
  };

  // =========================
  // REMOVE
  // =========================
  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter(
        (product) =>
          String(product._id) !== String(id)
      )
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isWishlisted,
        removeFromWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);

  if (!ctx) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider"
    );
  }

  return ctx;
}