import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./admin.css";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: "▦", end: true },
  { to: "/admin/products", label: "Products", icon: "□" },
  { to: "/admin/orders", label: "Orders", icon: "⌑" },
  { to: "/admin/customers", label: "Customers", icon: "♙" },
  { to: "/admin/settings", label: "Settings", icon: "⚙" },
];

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const current =
    location.pathname === "/admin"
      ? "Dashboard"
      : location.pathname.includes("/products")
      ? "Products"
      : location.pathname.includes("/orders")
      ? "Orders"
      : location.pathname.includes("/customers")
      ? "Customers"
      : "Settings";

  return (
    <div className="admin-app">
      <button
        aria-label="Close admin sidebar"
        className={`admin-overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="admin-brand">
          <div>
            <span className="admin-eyebrow">VINTAGE VAULT</span>
            <h2>ADMIN</h2>
          </div>
          <button className="admin-close" onClick={() => setSidebarOpen(false)}>×</button>
        </div>

        <div className="admin-store-card">
          <span>CONTROL CENTER</span>
          <strong>Store Management</strong>
        </div>

        <nav className="admin-nav">
          <p className="admin-nav-title">MAIN MENU</p>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `admin-nav-link ${isActive ? "active" : ""}`
              }
            >
              <span className="admin-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <Link to="/" className="admin-store-link">
            <span>←</span> View Store
          </Link>
          <button onClick={logout} className="admin-logout">
            <span>↪</span> Logout
          </button>
        </div>
      </aside>

      <section className="admin-main">
        <header className="admin-topbar">
          <div className="admin-top-left">
            <button
              className="admin-menu-button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open admin menu"
            >
              ☰
            </button>
            <div>
              <span className="admin-top-eyebrow">ADMIN PANEL</span>
              <h1>{current}</h1>
            </div>
          </div>

          <div className="admin-user">
            <div className="admin-avatar">
              {(user?.name || "A").charAt(0).toUpperCase()}
            </div>
            <div className="admin-user-info">
              <strong>{user?.name || "Admin"}</strong>
              <span>{user?.email || "Admin account"}</span>
            </div>
            <button onClick={logout} className="admin-top-logout">Logout</button>
          </div>
        </header>

        <main className="admin-content">{children}</main>
      </section>
    </div>
  );
}
