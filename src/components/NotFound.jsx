import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'; 

function NotFound() {
  return (
    <div className="not-found-container">
      <h2>404 - Página no encontrada</h2>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/" className="not-found-link">Volver a la página principal</Link>
    </div>
  );
}

export default NotFound;
