const categories = ["JORTS", "GRAILS", "BOTTOMS", "JERSEYS"];

const products = [
  {
    name: "Vintage Graphic Tee",
    price: "₹1,999",
  },
  {
    name: "Vintage Denim",
    price: "₹2,499",
  },
  {
    name: "Retro Jersey",
    price: "₹2,999",
  },
];

export default function Home() {
  return (
    <main>

      {/* HERO */}
      <section className="relative flex min-h-[650px] items-center overflow-hidden px-6 lg:px-16">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-5 text-xs font-bold tracking-[0.3em] text-[var(--primary)]">
            VINTAGE • STREETWEAR • GRAILS
          </p>

          <h1 className="max-w-4xl text-7xl font-black leading-[0.85] tracking-[-0.06em] sm:text-8xl lg:text-[140px]">
            WEAR THE
            <br />
            <span className="text-[var(--primary)]">PAST.</span>
          </h1>

          <p className="mt-8 max-w-md leading-7 text-[var(--muted)]">
            Curated vintage pieces for people who wear their own story.
          </p>

          <button className="mt-8 border border-[var(--primary)] bg-[var(--primary)] px-7 py-4 font-bold text-[var(--background)] transition hover:opacity-80">
            SHOP NOW →
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <p className="text-xs font-bold tracking-[0.3em] text-[var(--primary)]">
          EXPLORE
        </p>

        <h2 className="mt-3 mb-10 text-4xl font-black tracking-tight">
          SHOP BY CATEGORY
        </h2>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {categories.map((category) => (
            <div
              key={category}
              className="group flex h-64 cursor-pointer items-end border border-[var(--border)] bg-[var(--surface)] p-6 transition hover:border-[var(--primary)]"
            >
              <h3 className="text-2xl font-black group-hover:text-[var(--primary)]">
                {category}
              </h3>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <p className="text-xs font-bold tracking-[0.3em] text-[var(--primary)]">
          CURATED FOR YOU
        </p>

        <h2 className="mt-3 mb-10 text-4xl font-black">
          TRENDING GRAILS
        </h2>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div
              key={product.name}
              className="overflow-hidden bg-[var(--surface)]"
            >
              <div className="flex h-96 items-center justify-center bg-[#20242a] text-sm text-[var(--muted)]">
                PRODUCT IMAGE
              </div>

              <div className="p-5">
                <h3 className="font-bold">{product.name}</h3>

                <p className="mt-2 font-bold text-[var(--primary)]">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
}