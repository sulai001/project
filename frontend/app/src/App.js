import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import ProductPage from './page/ProductPage';
import Products from './page/Prouducts';
import CheckoutPage from './page/CheckoutPage';
import OrderPage from './page/OrderPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<ProductPage />} />
      <Route path="/shop/:id" element={<Products />} />
      <Route path="/shop/check/:id" element={<CheckoutPage />} />
      <Route path="/orders" element={<OrderPage />} />
      <Route path="/products" element={<ProductPage />} /> {/* Add this line */}
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;