import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="admin-screen">
        <div className="admin-message">
          <span className="admin-eyebrow">VINTAGE VAULT</span>
          <h1>ADMIN LOGIN REQUIRED</h1>
          <p>Please login with your admin account to access the control panel.</p>
          <Link to="/login" className="admin-primary-btn">LOGIN</Link>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-screen">
        <div className="admin-message">
          <span className="admin-eyebrow">VINTAGE VAULT</span>
          <h1>ACCESS DENIED</h1>
          <p>Your account does not have admin permissions.</p>
          <Link to="/" className="admin-primary-btn">GO TO STORE</Link>
        </div>
      </div>
    );
  }

  return children;
}
