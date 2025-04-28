import React, { useState, useEffect } from 'react';  // Додати імпорти
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalItems } = useCart();
  const [error, setError] = useState("");

  useEffect(() => {
    if (totalItems > 10) {
      setError("Не можна мати більше 10 товарів у кошику!");
    } else {
      setError("");
    }
  }, [totalItems]);

  if (cart.length === 0) {
    return <h1>Кошик порожній</h1>;
  }

  return (
    <div>
      <h1>Ваш кошик</h1>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Виводимо помилку, якщо вона є */}
      {cart.map(item => (
        <div key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '1rem 0' }}>
          <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
          <strong>{item.title}</strong>
          <p>Ціна: ${item.price}</p>
          <input
            type="number"
            min="1"
            max="10"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
            style={{ width: '50px', marginRight: '1rem' }}
          />
          <button onClick={() => removeFromCart(item.id)}>Видалити</button>
        </div>
      ))}
    </div>
  );
}
