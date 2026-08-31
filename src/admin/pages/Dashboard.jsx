import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useProducts } from "../../context/ProductsContext";
import { useOrders } from "../../context/OrdersContext";
import OrderTable from "../components/OrderTable";
import StatCard from "../components/StatCard";
import SectionTitle from "../components/SectionTitle";

export default function Dashboard() {
  const { products } = useProducts();
  const { orders } = useOrders();
  const { getUserCount } = useAuth();

  const revenue = orders.reduce((sum, order) => sum + Number(order.total || 0), 0);

  return (
    <div className="admin-page">
      <SectionTitle
        eyebrow="OVERVIEW"
        title="Store Dashboard"
        description="Manage your Vintage Vault store from one place."
      />

      <div className="admin-stat-grid">
        <StatCard label="PRODUCTS" value={products.length} note="Products in store" icon="□" />
        <StatCard label="ORDERS" value={orders.length} note="Orders received" icon="⌑" />
        <StatCard label="REVENUE" value={`₹${revenue.toLocaleString("en-IN")}`} note="Gross sales" icon="₹" />
        <StatCard label="CUSTOMERS" value={getUserCount()} note="Registered users" icon="♙" />
      </div>

      <div className="admin-dashboard-grid">
        <section className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <span className="admin-eyebrow">SALES</span>
              <h3>Recent Orders</h3>
            </div>
            <Link to="/admin/orders" className="admin-text-link">VIEW ALL →</Link>
          </div>
          <OrderTable orders={orders.slice(0, 6)} />
        </section>

        <section className="admin-panel">
          <div className="admin-panel-head">
            <div>
              <span className="admin-eyebrow">SHORTCUTS</span>
              <h3>Quick Actions</h3>
            </div>
          </div>

          <div className="admin-actions">
            <Link to="/admin/products?new=1" className="admin-action">
              <span>＋</span>
              <div><strong>Add Product</strong><small>Create a new store item</small></div>
              <b>→</b>
            </Link>
            <Link to="/admin/products" className="admin-action">
              <span>□</span>
              <div><strong>Manage Products</strong><small>Edit your inventory</small></div>
              <b>→</b>
            </Link>
            <Link to="/admin/orders" className="admin-action">
              <span>⌑</span>
              <div><strong>Review Orders</strong><small>Check customer orders</small></div>
              <b>→</b>
            </Link>
            <Link to="/admin/customers" className="admin-action">
              <span>♙</span>
              <div><strong>Customers</strong><small>View registered users</small></div>
              <b>→</b>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
