// src/components/Header.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("user"));
  const { totalItems } = useCart();

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(localStorage.getItem("user"));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Очищаємо кошик при виході
    localStorage.removeItem(`cart_${user}`);
    setUser(null);
    navigate("/");
    // Примусово оновлюємо сторінку
    window.location.reload();
  };

  const showAuthDialog = () => {
    const event = new CustomEvent('showAuthDialog');
    window.dispatchEvent(event);
  };

  return (
    <header style={styles.header}>
      <Link to="/" style={styles.logo}>🛒 FakeStore</Link>

      <nav style={styles.nav}>
        {user ? (
          <>
            <span style={styles.username}>👤 {user}</span>
            <button onClick={logout} style={styles.button}>Вийти</button>
            <Link to="/cart" style={styles.cart}>
              🛍️
              {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
            </Link>
          </>
        ) : (
          <button onClick={showAuthDialog} style={styles.button}>
            Увійти
          </button>
        )}
      </nav>
    </header>
  );
}

// ... (стилі залишаються незмінними)
const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#ff6347",
    color: "white",
    alignItems: "center",
  },
  logo: {
    textDecoration: "none",
    color: "white",
    fontSize: "24px",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
    gap: "15px",
    alignItems: "center",
  },
  button: {
    background: "white",
    color: "#ff6347",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  username: {
    fontWeight: "bold",
  },
  cart: {
    position: "relative",
    fontSize: "24px",
    textDecoration: "none",
    color: "white",
  },
  badge: {
    position: "absolute",
    top: "-5px",
    right: "-10px",
    backgroundColor: "yellow",
    color: "black",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: "12px",
    fontWeight: "bold",
  },
};