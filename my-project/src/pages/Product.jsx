import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  const addToCart = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Будь ласка, увійдіть, щоб додати товар до кошика.");
      return;
    }

    const cartKey = `cart_${user}`;
    const cart = JSON.parse(localStorage.getItem(cartKey)) || [];

    const index = cart.findIndex(item => item.id === product.id);
    if (index >= 0) {
      cart[index].quantity += 1;
    } else {
      cart.push({ id: product.id, title: product.title, quantity: 1 });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert("Товар додано до кошика!");
  };

  if (!product) return <p>Завантаження...</p>;

  return (
    <div style={styles.container}>
      <img src={product.image} alt={product.title} style={styles.image} />
      <div>
        <h2>{product.title}</h2>
        <p>{product.description}</p>
        <p><b>${product.price}</b></p>
        <button onClick={addToCart}>Додати до кошика</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "20px",
    padding: "20px",
  },
  image: {
    width: "200px",
    height: "auto",
    objectFit: "contain",
  },
};
