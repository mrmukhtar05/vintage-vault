import { useAuth } from "../../context/AuthContext";
import SectionTitle from "../components/SectionTitle";

export default function Customers() {
  const { getUserCount } = useAuth();

  return (
    <div className="admin-page">
      <SectionTitle
        eyebrow="CUSTOMERS"
        title="Customers"
        description={`${getUserCount()} registered accounts in your store.`}
      />
      <section className="admin-panel">
        <div className="admin-coming">
          <div className="admin-coming-icon">♙</div>
          <h3>Customer Management</h3>
          <p>
            Your current AuthContext provides the customer count and authentication.
            A full customer table can be connected here when you add customer profile management.
          </p>
          <strong>{getUserCount()} registered users</strong>
        </div>
      </section>
    </div>
  );
}
