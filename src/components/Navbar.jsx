import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-black tracking-[0.2em] text-[var(--text)]"
        >
          VINTAGE VAULT
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="text-sm text-[var(--muted)] transition hover:text-[var(--primary)]"
          >
            Home
          </Link>

          <Link
            to="/shop"
            className="text-sm text-[var(--muted)] transition hover:text-[var(--primary)]"
          >
            Shop
          </Link>

          <Link
            to="/categories"
            className="text-sm text-[var(--muted)] transition hover:text-[var(--primary)]"
          >
            Categories
          </Link>

          <Link
            to="/about"
            className="text-sm text-[var(--muted)] transition hover:text-[var(--primary)]"
          >
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button className="text-xl text-[var(--text)] hover:text-[var(--primary)]">
            ⌕
          </button>

          <button className="text-xl text-[var(--text)] hover:text-[var(--primary)]">
            ♡
          </button>

          <button className="text-xl text-[var(--text)] hover:text-[var(--primary)]">
            🛒
          </button>
        </div>
      </div>
    </header>
  );
}