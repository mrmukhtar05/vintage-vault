import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* TOP BAR */}
      <div className="hidden h-9 items-center justify-between border-b border-[var(--gold)] bg-black px-5 text-[11px] text-[var(--cream)] md:flex lg:px-10">
        <div>
          🚚 Free shipping on orders above ₹1999
        </div>

        <div className="flex gap-8">
          <span className="cursor-pointer hover:text-[var(--gold)]">
            Track Order
          </span>

          <span className="cursor-pointer hover:text-[var(--gold)]">
            Help
          </span>

          <span className="cursor-pointer hover:text-[var(--gold)]">
            Wishlist (0)
          </span>

          <span>◎</span>
          <span>♥</span>
          <span>●</span>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <header className="sticky top-0 z-50 border-b-2 border-[var(--gold)] bg-[var(--blue)]">
        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-10">

          {/* LOGO */}
          <Link to="/" className="relative z-50 shrink-0">
            <img
              src={logo}
              alt="Vintage Vault"
              className="h-[70px] w-[125px] object-contain sm:h-[82px] sm:w-[145px] lg:h-[100px] lg:w-[180px]"
            />
          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden items-center gap-8 lg:flex xl:gap-12">

            <NavLink to="/" active>
              HOME
            </NavLink>

            <NavLink to="/shop">
              SHOP
            </NavLink>

            <NavLink to="/categories">
              CATEGORIES
            </NavLink>

            <NavLink to="/about">
              ABOUT
            </NavLink>

            <NavLink to="/contact">
              CONTACT
            </NavLink>

          </nav>

          {/* ACTIONS */}
          <div className="hidden items-center gap-6 lg:flex">

            <button
              className="text-3xl text-[var(--cream)] transition hover:text-[var(--gold)]"
              aria-label="Search"
            >
              ⌕
            </button>

            <button
              className="text-3xl text-[var(--cream)] transition hover:text-[var(--gold)]"
              aria-label="Wishlist"
            >
              ♡
            </button>

            <button
              className="relative text-3xl text-[var(--cream)] transition hover:text-[var(--gold)]"
              aria-label="Cart"
            >
              ♧

              <span className="absolute -right-2 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--gold)] text-[10px] font-bold text-black">
                0
              </span>
            </button>

          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center border border-[var(--gold)] text-2xl lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="border-t border-[var(--gold)] bg-[var(--blue)] px-5 py-6 lg:hidden">

            <nav className="flex flex-col">

              <MobileLink
                to="/"
                text="HOME"
                closeMenu={() => setMenuOpen(false)}
              />

              <MobileLink
                to="/shop"
                text="SHOP"
                closeMenu={() => setMenuOpen(false)}
              />

              <MobileLink
                to="/categories"
                text="CATEGORIES"
                closeMenu={() => setMenuOpen(false)}
              />

              <MobileLink
                to="/about"
                text="ABOUT"
                closeMenu={() => setMenuOpen(false)}
              />

              <MobileLink
                to="/contact"
                text="CONTACT"
                closeMenu={() => setMenuOpen(false)}
              />

            </nav>

            <div className="mt-5 flex gap-5 border-t border-white/10 pt-5">
              <button className="text-2xl">⌕</button>
              <button className="text-2xl">♡</button>
              <button className="text-2xl">♧</button>
            </div>

          </div>
        )}
      </header>
    </>
  );
}

function NavLink({ to, children, active }) {
  return (
    <Link
      to={to}
      className={`relative py-7 text-sm font-black tracking-wider transition xl:text-base ${
        active
          ? "text-[var(--gold)]"
          : "text-[var(--cream)] hover:text-[var(--gold)]"
      }`}
    >
      {children}

      {active && (
        <span className="absolute bottom-3 left-0 h-[2px] w-full bg-[var(--gold)]" />
      )}
    </Link>
  );
}

function MobileLink({ to, text, closeMenu }) {
  return (
    <Link
      to={to}
      onClick={closeMenu}
      className="border-b border-white/10 py-4 text-sm font-black tracking-widest text-[var(--cream)] transition hover:text-[var(--gold)]"
    >
      {text}
    </Link>
  );
} 