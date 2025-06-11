import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css'; 

function Cart({ cartItems, updateCartItemQuantity, removeFromCart }) {
  const calculateSubtotal = (item) => {
    return (item.quantity * item.price).toFixed(2);
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Tu carrito está vacío.</h2>
        <Link to="/" className="back-to-shop">Volver a la tienda</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Resumen de tu compra</h2>
      <div className="cart-items-list">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item-card">
            <img src={item.image} alt={item.title} className="cart-item-image" />
            <div className="cart-item-details">
              <h3>{item.title}</h3>
              <p>Precio unitario: ${item.price.toFixed(2)}</p>
              <div className="cart-item-quantity-control">
                <label htmlFor={`cart-quantity-${item.id}`}>Cantidad:</label>
                <input
                  type="number"
                  id={`cart-quantity-${item.id}`}
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateCartItemQuantity(item.id, parseInt(e.target.value, 10) > 0 ? parseInt(e.target.value, 10) : 1)
                  }
                />
                <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </div>
              <p className="cart-item-subtotal">Subtotal: ${calculateSubtotal(item)}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Total a pagar: ${calculateTotal()}</h3>
        <button className="pay-now-button" disabled>Pagar ahora</button> { }
      </div>
      <Link to="/" className="back-to-shop-summary">Seguir comprando</Link>
    </div>
  );
}

export default Cart;