import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import LoginDialog from "./components/LoginDialog";
import Header from "./components/Header";

export default function App() {
  return (
    <div>
      <Header /> {/* Вставляємо ОДИН компонент */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}
