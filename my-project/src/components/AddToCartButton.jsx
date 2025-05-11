// src/components/AddToCartButton.jsx (updated)
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    const success = addToCart(product, quantity);
    if (success) {
      setQuantity(1); // Reset quantity after successful add
    }
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <input
        type="number"
        min="1"
        max="10"
        value={quantity}
        onChange={(e) => {
          const value = Math.min(Math.max(1, Number(e.target.value)), 10);
          setQuantity(value);
        }}
        style={{ width: '50px', marginRight: '1rem' }}
      />
      <button onClick={handleAdd}>
        Додати до кошика
      </button>
    </div>
  );
}