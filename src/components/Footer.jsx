import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t-2 border-[var(--gold)] bg-[var(--blue)] px-6 py-12">
      <div className="mx-auto grid w-full gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div><h2 className="text-2xl font-black text-[var(--gold)]">VINTAGE VAULT</h2><p className="mt-4 text-sm leading-6 text-[var(--muted)]">Curated vintage pieces, rare streetwear and timeless grails.</p></div>
        <div><h3 className="font-black">SHOP</h3><div className="mt-4 grid gap-2 text-sm text-[var(--muted)]"><Link to="/shop">All Products</Link><Link to="/categories">Categories</Link><Link to="/wishlist">Wishlist</Link></div></div>
        <div><h3 className="font-black">ACCOUNT</h3><div className="mt-4 grid gap-2 text-sm text-[var(--muted)]"><Link to="/login">Login</Link><Link to="/register">Register</Link><Link to="/orders">Orders</Link></div></div>
        <div><h3 className="font-black">CONTACT</h3><p className="mt-4 text-sm text-[var(--muted)]">support@vintagevault.com</p><p className="mt-2 text-sm text-[var(--muted)]">India</p></div>
      </div>
      <div className="mx-auto mt-10 max-w-[1400px] border-t border-white/10 pt-5 text-xs text-[var(--muted)]">© 2026 Vintage Vault. All rights reserved.</div>
    </footer>
  );
}