import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <div style={{ position: 'fixed', top: '1rem', right: '1rem' }}>
      <Link to="/cart" style={{ textDecoration: 'none', color: 'black' }}>
        🛒 ({totalItems})
      </Link>
    </div>
  );
}
