import { useState } from "react";
import PageHeader from "../components/PageHeader";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductsContext";

export default function Shop() {
  const { products, loading, error } = useProducts();
  const [category, setCategory] = useState("All");

  const categories = [
    "All",
    "T-Shirts",
    "Jackets",
    "Jerseys",
    "Bottoms",
    "Jorts",
    "Hoodies",
  ];

  const filtered =
    category === "All"
      ? products
      : products.filter(
          (p) =>
            p.category?.name?.toLowerCase() ===
            category.toLowerCase()
        );

  return (
    <>
      <PageHeader
        title="Shop"
        subtitle="Find your next vintage grail."
      />

      <main className="mx-auto w-full px-5 py-10">
        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 text-xs font-black ${
                category === c
                  ? "bg-[var(--gold)] text-black"
                  : "border border-[var(--border)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center font-black">
            LOADING PRODUCTS...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="py-20 text-center text-red-500">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-black">
              NO PRODUCTS FOUND
            </h2>
          </div>
        )}

        {/* Products */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}