import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav style={{ padding: "1rem", backgroundColor: "#f4f4f4", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>Головна</Link>
      <Link to="/cart" style={{ marginRight: "1rem" }}>Кошик</Link>
    </nav>
  );
}
