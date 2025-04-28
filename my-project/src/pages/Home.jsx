import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Помилка при завантаженні товарів:', err);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (category) {
      setFilteredProducts(products.filter(p => p.category === category));
    } else {
      setFilteredProducts(products);
    }
  }, [products, category]);

  return (
    <div>
      <h1>Список товарів</h1>
      <CategoryFilter products={products} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
