import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.title} style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
        <h3>{product.title}</h3>
      </Link>
      <p><strong>Ціна:</strong> ${product.price}</p>
    </div>
  );
}
