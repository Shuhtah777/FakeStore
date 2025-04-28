import { createContext, useState, useEffect, useContext } from 'react';
const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [totalItems, setTotalItems] = useState(cart.reduce((total, item) => total + item.quantity, 0));

  const addToCart = (product) => {
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
    
    if (totalQuantity >= 10) {
      alert('В кошику не може бути більше 10 товарів!');
      return; // Не додаємо товар, якщо кількість більше 10
    }
  
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      updateQuantity(product.id, existingProduct.quantity + 1);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  
    // Оновлюємо загальну кількість товарів у кошику після додавання
    setTotalItems(cart.reduce((total, item) => total + item.quantity, 0));
  };
  

  const updateQuantity = (id, quantity) => {
    if (quantity <= 10) {
      const newCart = cart.map(item => item.id === id ? { ...item, quantity } : item);
      setCart(newCart);
      setTotalItems(newCart.reduce((total, item) => total + item.quantity, 0));
    }
  };

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
    setTotalItems(newCart.reduce((total, item) => total + item.quantity, 0));
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}
