import { Link } from "react-router-dom";

export default function ProductCard({ product, onWishlist }) {
  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    onWishlist?.(product);
  };

  return (
    <div
      className="
        group
        w-full
        overflow-hidden
        rounded-sm
        bg-[#eee6d5]
        text-black
        shadow-lg
        transition-all
        duration-500
        hover:-translate-y-3
        hover:shadow-[8px_8px_0_#e9a91a]
      "
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Product Image */}
        <div
          className={`
            relative
            flex
            h-[340px]
            items-center
            justify-center
            overflow-hidden
            ${product.color}
          `}
        >
          {/* Shine Animation */}
          <div
            className="
              absolute
              -left-[100%]
              top-0
              h-full
              w-[60%]
              rotate-12
              bg-white/10
              transition-all
              duration-700
              group-hover:left-[120%]
            "
          />

          {/* Wishlist */}
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={`Add ${product.name} to wishlist`}
            className="
              absolute
              right-4
              top-4
              z-20
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-black/50
              text-2xl
              text-white
              transition-all
              duration-300
              hover:scale-110
              hover:bg-[var(--red)]
            "
          >
            ♡
          </button>

          {/* Product */}
          <span
            className="
              relative
              z-10
              text-[130px]
              drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)]
              transition-all
              duration-700
              ease-out
              group-hover:scale-125
              group-hover:-rotate-3
            "
          >
            {product.emoji}
          </span>

          {/* Quick View */}
          <div
            className="
              absolute
              bottom-5
              left-1/2
              z-20
              -translate-x-1/2
              translate-y-12
              whitespace-nowrap
              bg-[var(--gold)]
              px-6
              py-3
              text-sm
              font-black
              text-black
              opacity-0
              transition-all
              duration-500
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            QUICK VIEW
          </div>
        </div>

        {/* Product Info */}
        <div className="p-6">
          {/* Category */}
          <p
            className="
              text-[11px]
              font-black
              uppercase
              tracking-[0.15em]
              text-gray-500
            "
          >
            {product.category}
          </p>

          {/* Product Name */}
          <h3
            className="
              mt-2
              truncate
              text-xl
              font-black
              transition-colors
              duration-300
              group-hover:text-[#c88b12]
            "
          >
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-3 flex items-center gap-3">
            <span className="text-lg font-black text-[#d08c0b]">
              ₹{product.price}
            </span>

            <span className="text-sm text-gray-400 line-through">
              ₹{product.oldPrice}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}