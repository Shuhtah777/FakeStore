import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <input
        type="number"
        min="1"
        max="10"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
        style={{ width: '50px', marginRight: '1rem' }}
      />
      <button onClick={handleAdd}>
        Додати до кошика
      </button>
    </div>
  );
}
