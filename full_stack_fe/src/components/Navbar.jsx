import React from 'react';
import '../styles/Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="\src\Images\Logo.gif" alt="Logo" />
      </div>

      {/* Secciones de navegación */}
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
      <div className="cart">
       <img src="\src\Images\verificar (1).png" alt="" />
      </div>
    </nav>
  );
}

export default Navbar;

