import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";

export default function Orders() {
  const { user, isAuthenticated } = useAuth();
  const { getOrdersForUser } = useOrders();
  const location = useLocation();
  const justPlaced = location.state?.justPlaced;

  if (!isAuthenticated) {
    return (
      <main className="mx-auto max-w-[900px] px-5 py-20 text-center">
        <h1 className="text-5xl font-black">MY ORDERS</h1>
        <p className="mt-8 text-[var(--muted)]">Login to view your order history.</p>
        <Link to="/login" className="mt-6 inline-block bg-[var(--gold)] px-7 py-4 font-black text-black">
          LOGIN
        </Link>
      </main>
    );
  }

  const orders = getOrdersForUser(user.email);

  return (
    <main className="mx-auto max-w-[900px] px-5 py-20">
      <h1 className="text-5xl font-black">MY ORDERS</h1>

      {justPlaced && (
        <p className="mt-6 border border-[var(--gold)] bg-[var(--gold)]/10 px-4 py-3 text-sm font-bold text-[var(--gold)]">
          ✓ Order {justPlaced} placed successfully!
        </p>
      )}

      {orders.length === 0 ? (
        <div className="mt-8 border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-[var(--muted)]">
          No orders yet.
          <Link to="/shop" className="mt-4 block text-[var(--gold)]">Start Shopping →</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {orders.map((order) => (
            <div key={order.id} className="border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-black">ORDER {order.id}</p>
                  <p className="text-xs text-[var(--muted)]">
                    {new Date(order.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <span className="bg-[var(--gold)] px-3 py-1 text-xs font-black text-black">{order.status}</span>
              </div>
              <div className="mt-4 grid gap-1 border-t border-[var(--border)] pt-4">
                {order.items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex justify-between text-sm text-[var(--muted)]">
                    <span>{item.name} × {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex justify-between border-t border-[var(--border)] pt-3 font-black">
                <span>Total</span>
                <span className="text-[var(--gold)]">₹{order.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
