import React, { useEffect, useState } from 'react';
import './Products.css'; 

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.sampleapis.com/coffee/hot');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const productsWithPrice = data.map((product) => ({
          ...product,
          price: parseFloat((Math.random() * (300 - 100) + 100).toFixed(2)),
          quantityDesired: 1, 
        }));
        setProducts(productsWithPrice);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Cargando productos...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const handleQuantityChange = (id, e) => {
    const newQuantity = parseInt(e.target.value, 10);
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, quantityDesired: newQuantity > 0 ? newQuantity : 1 } : product
      )
    );
  };

  return (
    <div className="products-container">
      <h2>Nuestros Cafés</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">Precio: ${product.price.toFixed(2)}</p>
            <div className="product-quantity-add">
              <label htmlFor={`quantity-${product.id}`}>Cantidad:</label>
              <input
                type="number"
                id={`quantity-${product.id}`}
                min="1"
                value={product.quantityDesired}
                onChange={(e) => handleQuantityChange(product.id, e)}
              />
              <button
                onClick={() =>
                  addToCart({ ...product, quantity: product.quantityDesired })
                }
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;