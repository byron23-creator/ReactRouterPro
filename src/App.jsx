import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Products from './components/Products';
import Cart from './components/Cart';
import NotFound from './components/NotFound';
import './App.css'; 

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartItemQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalCartItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/"><h1>CoolCoffeShop</h1></Link>
          <div className="cart-icon-container">
            <Link to="/finish-shop" className="cart-icon">
              🛒 {totalCartItems > 0 && <span className="cart-count">{totalCartItems}</span>}
            </Link>
          </div>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<Products addToCart={addToCart} />}
          />
          <Route
            path="/finish-shop"
            element={
              <Cart
                cartItems={cartItems}
                updateCartItemQuantity={updateCartItemQuantity}
                removeFromCart={removeFromCart}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;