import { useSearchParams } from 'react-router-dom';

export default function CategoryFilter({ products }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const categories = [...new Set(products.map(p => p.category))];

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    if (value) {
      setSearchParams({ category: value });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label>Категорія: </label>
      <select onChange={handleCategoryChange} value={searchParams.get('category') || ''}>
        <option value="">Всі категорії</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
}
