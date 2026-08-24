import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");

  const shipping = cartTotal >= 1999 || cartTotal === 0 ? 0 : 99;
  const total = cartTotal + shipping;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    if (!form.name || !form.email || !form.phone || !form.address) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ""))) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    const order = placeOrder({
      name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      items: cart,
      total,
    });

    clearCart();
    navigate("/orders", { state: { justPlaced: order.id } });
  };

  if (cart.length === 0) {
    return (
      <main className="mx-auto max-w-[1000px] px-5 py-20 text-center">
        <h1 className="text-5xl font-black">CHECKOUT</h1>
        <p className="mt-8 text-[var(--muted)]">Your cart is empty. Add something before checking out.</p>
        <Link to="/shop" className="mt-6 inline-block bg-[var(--gold)] px-7 py-4 font-black text-black">
          START SHOPPING
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1100px] px-5 py-14">
      <h1 className="text-5xl font-black">CHECKOUT</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="grid gap-4 lg:col-span-2">
          {error && (
            <p className="border border-[var(--red)] bg-[var(--red)]/10 px-4 py-3 text-sm text-[var(--red)]">
              {error}
            </p>
          )}
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="bg-[var(--surface)] p-4 outline-none"
            placeholder="Full Name"
          />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="bg-[var(--surface)] p-4 outline-none"
            placeholder="Email"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="bg-[var(--surface)] p-4 outline-none"
            placeholder="Phone"
          />
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="bg-[var(--surface)] p-4 outline-none"
            rows="4"
            placeholder="Delivery Address"
          />
          <button type="submit" className="bg-[var(--gold)] p-4 font-black text-black hover:opacity-90">
            PLACE ORDER — ₹{total}
          </button>
        </form>

        <div className="h-fit border border-[var(--border)] bg-[var(--surface)] p-6">
          <h2 className="text-xl font-black">ORDER SUMMARY</h2>
          <div className="mt-5 grid gap-3">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm">
                <span className="text-[var(--muted)]">{item.name} × {item.qty}</span>
                <span className="font-bold">₹{item.price * item.qty}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-2 border-t border-[var(--border)] pt-4 text-sm">
            <div className="flex justify-between text-[var(--muted)]">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between text-[var(--muted)]">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>
          </div>
          <div className="mt-3 flex justify-between border-t border-[var(--border)] pt-3 text-lg font-black">
            <span>Total</span>
            <span className="text-[var(--gold)]">₹{total}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
