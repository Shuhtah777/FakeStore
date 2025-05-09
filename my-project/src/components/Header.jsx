import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useState(localStorage.getItem("user"));
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (user) {
      const cartKey = `cart_${user}`;
      const cart = JSON.parse(localStorage.getItem(cartKey)) || [];
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    }
  }, [user]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
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
              {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
            </Link>
          </>
        ) : (
          <button onClick={() => navigate("/")} style={styles.button}>
            Увійти
          </button>
        )}
      </nav>
    </header>
  );
}

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
