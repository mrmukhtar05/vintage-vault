import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";

export default function Profile() {
  const { user, isAuthenticated, logout } = useAuth();
  const { getOrdersForUser } = useOrders();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <main className="mx-auto max-w-[900px] px-5 py-20 text-center">
        <h1 className="text-5xl font-black">MY PROFILE</h1>
        <p className="mt-8 text-[var(--muted)]">Login to view your profile.</p>
        <Link to="/login" className="mt-6 inline-block bg-[var(--gold)] px-7 py-4 font-black text-black">
          LOGIN
        </Link>
      </main>
    );
  }

  const orderCount = getOrdersForUser(user.email).length;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <main className="mx-auto max-w-[900px] px-5 py-20">
      <h1 className="text-5xl font-black">MY PROFILE</h1>
      <div className="mt-8 border border-[var(--border)] bg-[var(--surface)] p-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--gold)] text-3xl font-black text-black">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="mt-6 grid gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Full Name</p>
            <p className="mt-1 text-lg font-black">{user.name}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Email</p>
            <p className="mt-1 text-lg font-black">{user.email}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Total Orders</p>
            <p className="mt-1 text-lg font-black">{orderCount}</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/orders" className="bg-[var(--gold)] px-6 py-3 text-sm font-black text-black hover:opacity-90">
            VIEW ORDERS →
          </Link>
          <button
            onClick={handleLogout}
            className="border border-[var(--red)] px-6 py-3 text-sm font-black text-[var(--red)] hover:bg-[var(--red)] hover:text-white"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </main>
  );
}
