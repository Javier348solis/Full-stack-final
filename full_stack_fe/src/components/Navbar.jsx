import React, { useState } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../components/Carrito';

const Navbar = () => {
  const navigate = useNavigate();
  const [showCarrito, setShowCarrito] = useState(false);  // Estado local para controlar el carrito emergente
  const { productos, eliminarProducto } = useCarrito();  // Usamos el hook 'useCarrito' para acceder al carrito

  const handleCarritoClick = () => {
    setShowCarrito(!showCarrito);  // Alternar la visibilidad del carrito
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img onClick={() => navigate("/")} src="\src\Images\Logo.gif" alt="Logo" />
      </div>

      {/* Secciones de navegacioon */}
      <div className="nav-links">
        <a href="/ofertas">Ofertas</a>
        <div className="dropdown">
          <a href="#categorias" className="dropdown-toggle">Categorías</a>
          <div className="dropdown-menu">
            <a href="/hombres">Perfumería Hombre</a>
            <a href="/mujeres">Perfumería Mujer</a>
          </div>
        </div>
        <a href="#otros">Otros</a>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input type="text" placeholder="Buscar productos..." />
      </div>

      {/* Carrito de compras */}
      <div className="cart" onClick={handleCarritoClick}>
        <img src="\src\Images\verificar (1).png" alt="Carrito" />
        {productos.length > 0 && <span className="cart-count">{productos.length}</span>} {/* Muestra el número de productos en el carrito */}
      </div>

      {/* Popup del carrito */}
      {showCarrito && (
        <div className="carrito-popup">
          <h3>Carrito de Compras</h3>
          <ul>
            {productos.map((producto) => (
              <li key={producto.uniqueId}>
                <img src={producto.imagen} alt={producto.nombre} />
                <p>{producto.nombre} - {producto.cantidad} x ${producto.precio}</p>
                <button onClick={() => eliminarProducto(producto.uniqueId)}>Eliminar</button>
              </li>
            ))}
          </ul>
          {productos.length === 0 && <p>No hay productos en el carrito.</p>}
          <button onClick={() => navigate('/carrito')}>Ver Carrito Completo</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
