import { useState } from "react";
import { useOrders } from "../../context/OrdersContext";
import OrderTable from "../components/OrderTable";
import SectionTitle from "../components/SectionTitle";

export default function Orders() {
  const { orders } = useOrders();
  const [query, setQuery] = useState("");

  const filtered = orders.filter((order) =>
    `${order.id} ${order.name || ""} ${order.email || ""} ${order.status || ""}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <div className="admin-page">
      <SectionTitle
        eyebrow="SALES"
        title="Orders"
        description={`${orders.length} orders received from customers.`}
        action={
          <input
            className="admin-search admin-orders-search"
            placeholder="Search order or customer..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        }
      />
      <section className="admin-panel">
        <OrderTable orders={filtered} />
      </section>
    </div>
  );
}
