import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import CartIcon from "./components/CartIcon";
import Navigation from "./components/Navigation";

export default function App() {
  return (
    <div>
      <Navigation />
      <CartIcon />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />  {/* Маршрут для кошика */}
      </Routes>
    </div>
  );
}
