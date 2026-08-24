import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import ImageSlider from "../components/ImageSlider";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <main className="mx-auto max-w-[1000px] px-5 py-20">
        <h1 className="text-5xl font-black">WISHLIST</h1>
        <div className="mt-10 border border-[var(--border)] bg-[var(--surface)] p-8 text-center">
          <p className="text-[var(--muted)]">No saved products yet.</p>
          <Link to="/shop" className="mt-6 inline-block bg-[var(--gold)] px-7 py-4 font-black text-black">
            EXPLORE SHOP
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1100px] px-5 py-14">
      <h1 className="text-5xl font-black">WISHLIST</h1>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="flex items-center gap-4 border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <Link
              to={`/product/${product.id}`}
              className="h-24 w-24 shrink-0 overflow-hidden"
            >
              <ImageSlider images={product.images} emojiSize="text-5xl" showArrows={false} showDots={false} />
            </Link>
            <div className="flex-1">
              <p className="text-xs font-bold text-[var(--gold)]">{product.category}</p>
              <Link to={`/product/${product.id}`} className="font-black hover:text-[var(--gold)]">
                {product.name}
              </Link>
              <p className="mt-1 font-black text-[var(--gold)]">₹{product.price}</p>
              <div className="mt-2 flex gap-3">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-[var(--gold)] px-4 py-2 text-xs font-black text-black hover:opacity-90"
                >
                  ADD TO CART
                </button>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="border border-[var(--border)] px-4 py-2 text-xs font-black hover:border-[var(--red)] hover:text-[var(--red)]"
                >
                  REMOVE
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
