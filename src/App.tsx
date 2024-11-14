// App.tsx
import React from 'react';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext.tsx';
import Shop from './pages/shoppingpage/ShoppingPage.tsx';
import CartPage from '../src/pages/cartpage/Cartpage.tsx';
import Header from './components/Header/Header.tsx';

const HeaderWithCartCount = () => {
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
  return <Header cartCount={totalQuantity} />;
};

function App() {
  return (
    <Router>
      <CartProvider>
        <HeaderWithCartCount />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;