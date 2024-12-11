import React, { useState } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, InputBase, IconButton, Menu, MenuItem } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, Search as SearchIcon } from '@mui/icons-material';
import { useCarrito } from '../components/Carrito';

const Navbar = () => {
  const navigate = useNavigate();
  const [showCarrito, setShowCarrito] = useState(false);  // Estado local para controlar el carrito emergente
  const { productos, eliminarProducto } = useCarrito();  // Usamos el hook 'useCarrito' para acceder al carrito

  const handleCarritoClick = () => {
    setShowCarrito(!showCarrito);  // Alternar la visibilidad del carrito
  };

  // Manejo de menú de categorías
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Logo */}
        <IconButton edge="start" color="inherit" onClick={() => navigate("/")}>
          <img src="\src\Images\Logo.gif" alt="Logo" style={{ height: 40 }} />
        </IconButton>

        {/* Enlaces de navegación */}
        <div style={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate("/ofertas")}>Ofertas</Button>
          <Button
            color="inherit"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            Categorías
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => navigate("/hombres")}>Perfumería Hombre</MenuItem>
            <MenuItem onClick={() => navigate("/mujeres")}>Perfumería Mujer</MenuItem>
          </Menu>
          <Button color="inherit" onClick={() => navigate("/otros")}>Otros</Button>
        </div>

        {/* Barra de búsqueda */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <InputBase
            placeholder="Buscar productos..."
            startAdornment={<SearchIcon />}
            style={{ color: 'white', paddingLeft: '10px' }}
          />
        </div>

        {/* Carrito de compras */}
        <IconButton color="inherit" onClick={handleCarritoClick}>
          <ShoppingCartIcon />
          {productos.length > 0 && (
            <span style={{
              position: 'absolute',
              top: '0',
              right: '0',
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '50%',
              padding: '4px 8px',
              fontSize: '12px'
            }}>
              {productos.length}
            </span>
          )}
        </IconButton>
      </Toolbar>

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
          <Button onClick={() => navigate('/carrito')} variant="contained">Ver Carrito Completo</Button>
        </div>
      )}
    </AppBar>
  );
};

export default Navbar;
