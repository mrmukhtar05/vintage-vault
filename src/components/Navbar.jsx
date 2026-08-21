import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [["HOME","/"],["SHOP","/shop"],["CATEGORIES","/categories"],["ABOUT","/"],["CONTACT","/"]];

  return (
    <>
      <div className="hidden overflow-hidden border-b border-[var(--border)] bg-black px-6 py-2 text-xs md:block">
      <style>{`
        @keyframes marquee-move {
          from { transform: translateX(10); }
          to { transform: translateX(50%); }
        }
        .animate-marquee {
          animation: marquee-move 10s linear infinite;
        }
        div:has(> .animate-marquee):hover .animate-marquee {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee { animation: none; }
        }
      `}</style>

      <div className="flex w-full animate-marquee items-center gap-100">
       
       
        {/* Repeat for continuous movement */}
        <span className="font-black whitespace-nowrap">
          🚚 FREE SHIPPING ABOVE ₹1999
        </span>
        <div className="flex gap-6 whitespace-nowrap text-[var(--muted)]">
          <span>Track Order</span>
          <span>Help</span>
          <span>Wishlist</span>
        </div>
      </div>
    </div>
      <header className="sticky top-0 z-50 border-b-2 border-[var(--gold)] bg-[var(--blue)]">
        <div className="mx-auto flex h-[78px] max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-10">
          <Link to="/">
            <img src={logo} alt="Vintage Vault" className="h-[68px] w-[120px] object-contain sm:h-[78px] sm:w-[140px]" />
          </Link>
          <nav className="hidden items-center gap-8 lg:flex">
            {links.map(([name,path],i)=><Link key={name} to={path} className={`text-sm font-black tracking-wider transition hover:text-[var(--gold)] ${i===0?"text-[var(--gold)]":"text-[var(--cream)]"}`}>{name}</Link>)}
          </nav>
          <div className="hidden items-center gap-5 lg:flex">
            <Link to="/shop" className="text-2xl hover:text-[var(--gold)]">⌕</Link>
            <Link to="/wishlist" className="text-2xl hover:text-[var(--gold)]">♡</Link>
            <Link to="/cart" className="relative text-2xl hover:text-[var(--gold)]">🛒<span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--gold)] text-[10px] text-black">0</span></Link>
            <Link to="/login" className="border border-[var(--gold)] px-4 py-2 text-xs font-bold hover:bg-[var(--gold)] hover:text-black">LOGIN</Link>
          </div>
          <button onClick={()=>setOpen(!open)} className="flex h-10 w-10 items-center justify-center border border-[var(--gold)] text-xl lg:hidden">{open?"×":"☰"}</button>
        </div>
        {open && <div className="border-t border-[var(--gold)] bg-[var(--blue)] px-5 py-4 lg:hidden">
          {links.map(([name,path])=><Link key={name} onClick={()=>setOpen(false)} to={path} className="block border-b border-white/10 py-4 text-sm font-black tracking-widest">{name}</Link>)}
          <div className="flex gap-6 pt-5"><Link to="/shop">⌕</Link><Link to="/wishlist">♡</Link><Link to="/cart">🛒</Link></div>
        </div>}
      </header>
    </>
  );
}