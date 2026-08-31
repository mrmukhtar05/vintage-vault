import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import api from "../api/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/categories");

        if (response.data?.success) {
          setCategories(response.data.categories || []);
        } else {
          setCategories([]);
        }
      } catch (err) {
        console.error("Fetch categories error:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load categories."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <PageHeader
        title="Categories"
        subtitle="Explore our vintage collections."
      />

      <main className="mx-auto w-full px-5 py-12">

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center font-black">
            LOADING CATEGORIES...
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="py-20 text-center text-red-500">
            {error}
          </div>
        )}

        {/* Empty */}
        {!loading &&
          !error &&
          categories.length === 0 && (
            <div className="py-20 text-center">
              <h2 className="text-2xl font-black">
                NO CATEGORIES FOUND
              </h2>
            </div>
          )}

        {/* Categories */}
        {!loading &&
          !error &&
          categories.length > 0 && (
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
              {categories.map((category, index) => (
                <Link
                  to={`/shop?category=${category._id}`}
                  key={category._id}
                  className="group flex h-52 items-end border border-[var(--border)] bg-[var(--blue)] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--blue-light)] hover:shadow-[6px_6px_0_var(--gold)]"
                >
                  <div>
                    <p className="text-xs text-[var(--gold)]">
                      COLLECTION{" "}
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    <h2 className="mt-2 text-3xl font-black">
                      {category.name}
                    </h2>

                    {category.slug && (
                      <p className="mt-2 text-xs uppercase tracking-widest text-[var(--muted)]">
                        {category.slug}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
      </main>
    </>
  );
}