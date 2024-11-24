import React from 'react';
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">
        <img src="full_stack_fe/src/images/Your" alt="Logo" />
      </div>

      {/* Secciones de navegación */}
      <div className="nav-links">
        <a href="#ofertas">Ofertas</a>
        <a href="#categorias">Categorías</a>
        <a href="#otros">Otros</a>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input type="text" placeholder="Buscar productos..." />
      </div>

      {/* Carrito de compras */}
      <div className="cart">
       <img src="" alt="" />
      </div>
    </nav>
  );
}

export default Navbar;

