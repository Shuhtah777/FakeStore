// src/context/CartContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);

  // Додаємо ефект для завантаження кошика при старті
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const cartKey = `cart_${user}`;
      const savedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
      setCart(savedCart);
      // Правильно рахуємо загальну кількість товарів
      setTotalItems(savedCart.reduce((total, item) => total + item.quantity, 0));
    }
  }, []);

  // Додаємо функцію для оновлення загальної кількості
  const updateTotalItems = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const addToCart = (product, quantity = 1) => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Будь ласка, увійдіть, щоб додати товар до кошика.");
      return false;
    }

    const cartKey = `cart_${user}`;
    const currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    const existingItem = currentCart.find(item => item.id === product.id);
    
    const newTotal = updateTotalItems(currentCart) + quantity;
    
    if (newTotal > 10) {
      alert('В кошику не може бути більше 10 товарів!');
      return false;
    }

    let newCart;
    if (existingItem) {
      newCart = currentCart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newCart = [...currentCart, { ...product, quantity }];
    }

    localStorage.setItem(cartKey, JSON.stringify(newCart));
    setCart(newCart);
    setTotalItems(updateTotalItems(newCart));
    return true;
  };

  const updateQuantity = (id, newQuantity) => {
    const user = localStorage.getItem("user");
    if (!user) return;

    const cartKey = `cart_${user}`;
    const currentCart = JSON.parse(localStorage.getItem(cartKey)) || [];
    
    if (newQuantity < 1 || newQuantity > 10) return;

    const newCart = currentCart.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    const updatedTotal = updateTotalItems(newCart);
    if (updatedTotal > 10) {
      alert('В кошику не може бути більше 10 товарів!');
      return;
    }

    localStorage.setItem(cartKey, JSON.stringify(newCart));
    setCart(newCart);
    setTotalItems(updatedTotal);
  };

  const removeFromCart = (id) => {
    const user = localStorage.getItem("user");
    if (!user) return;

    const cartKey = `cart_${user}`;
    const newCart = cart.filter(item => item.id !== id);
    
    localStorage.setItem(cartKey, JSON.stringify(newCart));
    setCart(newCart);
    setTotalItems(updateTotalItems(newCart));
  };

  // Слухаємо зміни в localStorage між вкладками
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key?.startsWith('cart_')) {
        const user = localStorage.getItem("user");
        if (user) {
          const newCart = JSON.parse(localStorage.getItem(`cart_${user}`)) || [];
          setCart(newCart);
          setTotalItems(updateTotalItems(newCart));
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      totalItems 
    }}>
      {children}
    </CartContext.Provider>
  );
}