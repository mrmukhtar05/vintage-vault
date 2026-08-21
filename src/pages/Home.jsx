const categories = [
  {
    name: "JORTS",
    color: "bg-[#b72f2f]",
    emoji: "🩳",
  },
  {
    name: "GRAILS",
    color: "bg-[#063c5c]",
    emoji: "🧥",
  },
  {
    name: "BOTTOMS",
    color: "bg-[#c28a18]",
    emoji: "👖",
  },
  {
    name: "JERSEYS",
    color: "bg-[#0b4265]",
    emoji: "🏀",
  },
];

const products = [
  {
    name: "Eminem Vintage Tee",
    price: "₹1,799",
    emoji: "👕",
  },
  {
    name: "Vintage Racing Jacket",
    price: "₹4,499",
    emoji: "🧥",
  },
  {
    name: "Lakers Champion Hoodie",
    price: "₹2,999",
    emoji: "👕",
  },
  {
    name: "2PAC Vintage Tee",
    price: "₹1,999",
    emoji: "👕",
  },
  {
    name: "Vintage Varsity Jacket",
    price: "₹3,499",
    emoji: "🧥",
  },
];

export default function Home() {
  return (
    <main className="overflow-hidden">

      {/* ================= HERO ================= */}

      <section className="relative min-h-[590px] overflow-hidden bg-[var(--black)] sm:min-h-[650px] lg:min-h-[690px]">

        {/* BACKGROUND STAR */}
        <div className="absolute right-[5%] top-[8%] hidden h-[500px] w-[650px] rotate-6 rounded-[45%] bg-[var(--blue)] opacity-80 lg:block" />

        <div className="absolute right-[25%] top-[10%] hidden h-[400px] w-[400px] rotate-12 bg-[var(--red)] opacity-80 [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_95%,50%_72%,21%_95%,32%_57%,2%_35%,39%_35%)] lg:block" />

        <div className="relative mx-auto grid min-h-[590px] max-w-[1500px] items-center px-6 py-16 sm:px-10 lg:min-h-[690px] lg:grid-cols-2 lg:px-20">

          {/* LEFT */}
          <div className="relative z-10 max-w-[600px]">

            <p className="mb-5 text-xs font-black tracking-[0.25em] text-[var(--gold)] sm:text-sm">
              VINTAGE • STREETWEAR • GRAILS
            </p>

            <h1 className="text-6xl font-black uppercase leading-[0.85] tracking-[-0.05em] text-[var(--cream)] sm:text-8xl lg:text-[92px] xl:text-[110px]">

              WEAR THE

              <br />

              <span className="text-[var(--gold)]">
                PAST.
              </span>

            </h1>

            <p className="mt-7 max-w-[430px] text-sm leading-6 text-[#d2c9b6] sm:text-base">
              Curated vintage pieces for people who wear their own story.
            </p>

            <button className="group relative mt-8 border-2 border-black bg-[var(--red)] px-8 py-4 font-black uppercase tracking-wide text-black shadow-[4px_4px_0_var(--gold)] transition hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
              SHOP NOW
              <span className="ml-5 text-xl transition group-hover:ml-7">
                →
              </span>
            </button>

          </div>

          {/* RIGHT PRODUCT VISUAL */}
          <div className="relative mt-10 hidden h-[500px] lg:block">

            {/* Blue oval */}
            <div className="absolute right-0 top-20 h-[280px] w-[520px] rotate-[-8deg] rounded-[50%] border-4 border-[var(--gold)] bg-[#145273]" />

            {/* Red star */}
            <div className="absolute right-40 top-0 h-[420px] w-[420px] rotate-12 bg-[var(--red)] [clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_95%,50%_72%,21%_95%,32%_57%,2%_35%,39%_35%)]" />

            {/* T-shirt */}
            <div className="absolute right-[220px] top-[60px] z-10 flex h-[330px] w-[250px] rotate-[-7deg] items-center justify-center rounded-t-[35%] bg-[#191919] text-5xl font-black text-[var(--gold)] shadow-2xl">
              NIRVANA
            </div>

            {/* Jersey */}
            <div className="absolute right-0 top-[100px] z-20 flex h-[350px] w-[240px] rotate-[7deg] items-center justify-center rounded-t-[25%] border-4 border-black bg-[#151515] text-6xl font-black text-[#d52d2d] shadow-2xl">
              91
            </div>

            {/* Shoes */}
            <div className="absolute bottom-5 right-[100px] z-30 text-[130px]">
              👟
            </div>

          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}

      <section className="border-t-2 border-[var(--gold)] bg-[var(--blue)] px-5 py-12 sm:px-8 lg:px-12">

        <div className="mx-auto max-w-[1400px]">

          <p className="text-xs font-black tracking-[0.25em] text-[var(--gold)]">
            EXPLORE
          </p>

          <div className="mb-8 flex items-end justify-between">

            <h2 className="text-4xl font-black uppercase tracking-tight text-[var(--cream)] sm:text-5xl">
              SHOP BY CATEGORY
            </h2>

            <div className="hidden gap-3 sm:flex">
              <button className="h-10 w-10 rounded-full border border-[var(--gold)] text-xl hover:bg-[var(--gold)] hover:text-black">
                ←
              </button>

              <button className="h-10 w-10 rounded-full border border-[var(--gold)] text-xl hover:bg-[var(--gold)] hover:text-black">
                →
              </button>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-5">

            {categories.map((category) => (
              <div
                key={category.name}
                className={`group relative flex h-[180px] cursor-pointer items-end overflow-hidden rounded-md border-2 border-[var(--gold)] ${category.color} p-4 transition hover:-translate-y-1 sm:h-[230px] lg:h-[250px]`}
              >

                <div className="absolute inset-0 flex items-center justify-center text-[90px] opacity-70 transition group-hover:scale-110">
                  {category.emoji}
                </div>

                <h3 className="relative z-10 text-3xl font-black uppercase italic tracking-tight text-[var(--cream)] drop-shadow-[3px_3px_0_#000] sm:text-4xl">
                  {category.name}
                </h3>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= PRODUCTS ================= */}

      <section className="bg-[var(--black)] px-5 py-14 sm:px-8 lg:px-12">

        <div className="mx-auto max-w-[1400px]">

          <div className="flex items-end justify-between">

            <div>
              <p className="text-xs font-black tracking-[0.25em] text-[var(--gold)]">
                CURATED FOR YOU
              </p>

              <h2 className="mt-2 text-4xl font-black uppercase text-[var(--cream)] sm:text-5xl">
                TRENDING GRAILS
              </h2>
            </div>

            <button className="hidden font-bold text-[var(--gold)] sm:block">
              VIEW ALL →
            </button>

          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">

            {products.map((product) => (
              <div
                key={product.name}
                className="group overflow-hidden rounded-md bg-[#eee6d5] text-black"
              >

                <div className="relative flex h-[230px] items-center justify-center overflow-hidden bg-[#e9e1d1] sm:h-[280px]">

                  <button className="absolute right-3 top-3 z-10 text-2xl text-black">
                    ♡
                  </button>

                  <span className="text-[90px] transition duration-300 group-hover:scale-110">
                    {product.emoji}
                  </span>

                </div>

                <div className="p-3 sm:p-4">

                  <h3 className="truncate text-xs font-bold sm:text-sm">
                    {product.name}
                  </h3>

                  <p className="mt-1 text-sm font-black text-[#d08c0b]">
                    {product.price}
                  </p>

                </div>

              </div>
            ))}

          </div>
        </div>
      </section>

    </main>
  );
}