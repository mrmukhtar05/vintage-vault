import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        VINTAGE VAULT
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/about">About</Link>
      </nav>

      <div className="nav-actions">
        <button>⌕</button>
        <button>♡</button>
        <button>🛒</button>
      </div>
    </header>
  );
}

export default Navbar;