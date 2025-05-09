import { useEffect, useState } from "react";

export default function CartIcon() {
  const [itemCount, setItemCount] = useState(0);

  const updateCount = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setItemCount(0);
      return;
    }

    const cart = JSON.parse(localStorage.getItem(`cart_${user}`)) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    setItemCount(totalQuantity);
  };

  useEffect(() => {
    updateCount();

    // Оновлення при зміні локального сховища (наприклад, в іншій вкладці)
    const handleStorageChange = () => updateCount();
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <span role="img" aria-label="cart">🛒</span>
      {itemCount > 0 && (
        <span style={{
          position: "absolute",
          top: -5,
          right: -5,
          background: "red",
          borderRadius: "50%",
          color: "white",
          padding: "2px 6px",
          fontSize: "0.8rem"
        }}>
          {itemCount}
        </span>
      )}
    </div>
  );
}
