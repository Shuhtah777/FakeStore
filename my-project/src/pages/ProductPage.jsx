import React, { useState, useEffect } from 'react'; // Імпортуємо useState, useEffect
import { useParams } from 'react-router-dom'; // Імпортуємо useParams
import { useCart } from "../context/CartContext"; // Додаємо імпорт useCart

export default function ProductPage() {
  const { addToCart } = useCart(); // Отримуємо функцію додавання товару
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error(error));
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product); // Викликаємо addToCart, щоб додати товар
    }
  };

  if (!product) return <p>Завантаження...</p>;

  return (
    <div>
      <h1>{product.title}</h1>
      <img src={product.image} alt={product.title} style={{ width: '300px' }} />
      <p>Ціна: ${product.price}</p>
      <p>{product.description}</p>

      <button onClick={handleAddToCart}>Додати в кошик</button>
    </div>
  );
}
