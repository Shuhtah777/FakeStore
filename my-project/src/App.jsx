import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import Cart from "./pages/Cart";
import Help from "./pages/Help";
import Header from "./components/Header";
import AuthDialog from "./components/AuthDialog";
import ProtectedRoute from "./components/ProtectRoute";

export default function App() {
  return (
    <div>
      <Header />
      <AuthDialog />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductPage />} />
        
        {/* Захищені маршрути */}
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        
        <Route path="/help" element={
          <ProtectedRoute>
            <Help />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}