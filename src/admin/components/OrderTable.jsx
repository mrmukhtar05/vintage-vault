export default function OrderTable({ orders = [] }) {
  if (!orders.length) {
    return <div className="admin-empty">No orders have been placed yet.</div>;
  }

  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            <th>ORDER</th>
            <th>CUSTOMER</th>
            <th>ITEMS</th>
            <th>TOTAL</th>
            <th>DATE</th>
            <th>STATUS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td><strong>{order.id}</strong></td>
              <td>
                <strong>{order.name || "Customer"}</strong>
                <small>{order.email || "—"}</small>
              </td>
              <td>{order.items?.reduce((sum, item) => sum + Number(item.qty || 0), 0) || 0}</td>
              <td className="gold">₹{Number(order.total || 0).toLocaleString("en-IN")}</td>
              <td>{order.date ? new Date(order.date).toLocaleDateString("en-IN") : "—"}</td>
              <td><span className="admin-status">{order.status || "Placed"}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
