// src/pages/Cart.jsx
import { useCart } from "../context/CartContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  if (cart.length === 0) {
    return <h1>Кошик порожній</h1>;
  }

  return (
    <div>
      <h1>Ваш кошик ({totalItems} товарів)</h1>
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
            onChange={(e) => {
              const newQuantity = Math.min(Math.max(1, Number(e.target.value)), 10);
              updateQuantity(item.id, newQuantity);
            }}
            style={{ width: '50px', marginRight: '1rem' }}
          />
          <button onClick={() => removeFromCart(item.id)}>Видалити</button>
        </div>
      ))}
    </div>
  );
}