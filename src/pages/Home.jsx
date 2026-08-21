import { useRef } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const categories = [
  ["JORTS", "🩳", "bg-[#b72f2f]"],
  ["GRAILS", "🧥", "bg-[#063c5c]"],
  ["BOTTOMS", "👖", "bg-[#c28a18]"],
  ["JERSEYS", "🏀", "bg-[#0b4265]"],
];

export default function Home() {
  const trackRef = useRef(null);

  const scrollProducts = (dir) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  };

  return (
    <main>
      {/* local keyframes for the marquee + fade edges */}
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll 22s linear infinite;
        }
        .marquee-wrap:hover .marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        @keyframes border-spin {
          to { --angle: 360deg; }
        }
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }
        .cat-card {
          position: relative;
          z-index: 0;
        }
        .cat-card::before {
          content: "";
          position: absolute;
          inset: -2px;
          z-index: -1;
          border-radius: inherit;
          padding: 2px;
          background: conic-gradient(from var(--angle), #e9a91a, #d83b32, #063c5c, #e9a91a);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: border-spin 3s linear infinite;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .cat-card:hover::before {
          opacity: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .cat-card::before { animation: none; }
        }
      `}</style>

      <section className="relative overflow-hidden border-b-2 border-[var(--gold)] bg-[#080a0b]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,#063c5c_0%,#080a0b_50%,#080a0b_100%)]" />
        <div className="absolute right-[-180px] top-[80px] hidden h-[420px] w-[760px] rotate-[-12deg] rounded-[50%] border-[14px] border-[#0b4265] lg:block" />
        <div className="absolute right-[-170px] top-[72px] hidden h-[430px] w-[770px] rotate-[-12deg] rounded-[50%] border-2 border-[#e9a91a] lg:block" />
        <div className="relative z-10 mx-auto grid min-h-[650px] max-w-[1500px] items-center px-6 py-16 sm:px-10 lg:grid-cols-2 lg:px-16">
          <div className="max-w-[620px]">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-[2px] w-10 bg-[#e9a91a]" />
              <p className="text-xs font-black tracking-[0.3em] text-[#e9a91a]">VINTAGE • STREETWEAR • GRAILS</p>
            </div>
            <h1 className="text-6xl font-black uppercase leading-[0.82] tracking-[-0.05em] sm:text-8xl lg:text-[88px] xl:text-[105px]">
              WEAR THE<br /><span className="text-[#e9a91a]">PAST.</span>
            </h1>
            <p className="mt-8 max-w-[450px] text-sm leading-7 text-[#d5cbb9] sm:text-base">
              Curated vintage pieces, rare streetwear and timeless grails for people who wear their own story.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/shop" className="border-2 border-black bg-[#d83b32] px-7 py-4 font-black text-black shadow-[5px_5px_0_#e9a91a] hover:translate-x-1 hover:translate-y-1 hover:shadow-none">SHOP NOW →</Link>
              <Link to="/categories" className="border-2 border-[#e9a91a] px-7 py-4 font-black text-[#e9a91a] hover:bg-[#e9a91a] hover:text-black">EXPLORE</Link>
            </div>
            <div className="mt-10 flex gap-7 border-t border-white/10 pt-6">
              <div><b className="text-xl text-[#e9a91a]">3K+</b><p className="text-[10px] text-[#aaa69b]">PIECES</p></div>
              <div><b className="text-xl text-[#e9a91a]">100%</b><p className="text-[10px] text-[#aaa69b]">CURATED</p></div>
              <div><b className="text-xl text-[#e9a91a]">2021</b><p className="text-[10px] text-[#aaa69b]">EST.</p></div>
            </div>
          </div>
          <div className="relative hidden h-[500px] items-center justify-center lg:flex">
            <div className="absolute h-[400px] w-[500px] rounded-full bg-[#063c5c] opacity-40 blur-3xl" />
            <img src={logo} alt="Vintage Vault" className="relative z-10 w-[520px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,.8)] hover:scale-105 transition-transform" />
          </div>
          <div className="mt-12 flex justify-center lg:hidden">
            <img src={logo} alt="Vintage Vault" className="w-[280px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,.8)]" />
          </div>
        </div>
      </section>

      {/* CATEGORY MARQUEE */}
    {/* ================= CATEGORIES ================= */}
<section className="overflow-hidden bg-[var(--blue)] py-16">

  <div className="mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-12">

    <p className="text-xs font-black tracking-[0.3em] text-[var(--gold)]">
      EXPLORE COLLECTIONS
    </p>

    <div className="flex items-end justify-between gap-4">
      <h2 className="mt-2 text-4xl font-black uppercase sm:text-5xl">
        SHOP BY CATEGORY
      </h2>
    </div>

  </div>

  {/* Moving Categories */}
  <div className="relative mt-10 overflow-hidden">

    <div className="category-track flex w-max gap-5">

      {[
        ["JORTS", "bg-[#8f2828]"],
        ["GRAILS", "bg-[#073b59]"],
        ["BOTTOMS", "bg-[#a87313]"],
        ["JERSEYS", "bg-[#0a496e]"],
        ["HOODIES", "bg-[#352719]"],
        ["TEES", "bg-[#242424]"],
        ["JACKETS", "bg-[#173b50]"],
        ["DENIM", "bg-[#293b4b]"],

        // Duplicate for seamless animation
        ["JORTS", "bg-[#8f2828]"],
        ["GRAILS", "bg-[#073b59]"],
        ["BOTTOMS", "bg-[#a87313]"],
        ["JERSEYS", "bg-[#0a496e]"],
        ["HOODIES", "bg-[#352719]"],
        ["TEES", "bg-[#242424]"],
        ["JACKETS", "bg-[#173b50]"],
        ["DENIM", "bg-[#293b4b]"],
      ].map(([name, bg], index) => (

        <Link
          to="/shop"
          key={`${name}-${index}`}
          className={`
            group
            relative
            h-[220px]
            w-[280px]
            shrink-0
            overflow-hidden
            border-2
            border-[var(--gold)]
            ${bg}
            transition-all
            duration-500
            hover:-translate-y-3
            hover:shadow-[8px_8px_0_#000]
          `}
        >

          {/* Logo */}
          <div className="absolute inset-0 flex items-center justify-center">

            <img
              src={logo}
              alt="Vintage Vault"
              className="
                w-[170px]
                object-contain
                opacity-25
                transition-all
                duration-700
                group-hover:scale-125
                group-hover:rotate-6
                group-hover:opacity-50
              "
            />

          </div>

          {/* Overlay */}
          <div
            className="
              absolute
              inset-0
              bg-black/30
              transition-all
              duration-500
              group-hover:bg-black/10
            "
          />

          {/* Text */}
          <div className="absolute bottom-0 left-0 right-0 p-5">

            <p className="text-[10px] font-bold tracking-[0.3em] text-white/70">
              VINTAGE VAULT
            </p>

            <h3
              className="
                mt-1
                text-3xl
                font-black
                italic
                tracking-tight
                text-white
                transition-transform
                duration-500
                group-hover:translate-x-3
              "
            >
              {name}
            </h3>

            <span
              className="
                mt-2
                inline-block
                text-xs
                font-black
                text-[var(--gold)]
                opacity-0
                transition-all
                duration-500
                group-hover:translate-x-3
                group-hover:opacity-100
              "
            >
              SHOP NOW →
            </span>

          </div>

        </Link>

      ))}

    </div>

  </div>

</section>

      {/* PRODUCT CAROUSEL */}
      <section className="bg-[var(--black)] px-5 py-14 sm:px-8 lg:px-12">
  <div className="mx-auto max-w-[1400px]">

    {/* Heading */}
    <div>
      <p className="text-xs font-black tracking-[0.25em] text-[var(--gold)]">
        CURATED FOR YOU
      </p>

      <h2 className="mt-2 text-4xl font-black uppercase sm:text-5xl">
        TRENDING GRAILS
      </h2>
    </div>

    {/* Products */}
    <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.slice(0, 8).map((p) => (
        <ProductCard
          key={p.id}
          product={p}
        />
      ))}
    </div>

  </div>
</section>
    </main>
  );
}