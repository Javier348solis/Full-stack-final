import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  InputBase,
  IconButton,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Search as SearchIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useCarrito } from '../components/Carrito';
import { useAuth } from './Authprovider';

const Navbar = () => {
  const navigate = useNavigate();
  const { listaProductos, productos } = useCarrito(); // `productos` es la lista completa
  const { logout } = useAuth();

  // Manejo de menú de categorías
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchText, setSearchText] = useState(''); // Estado para el texto de búsqueda
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCarritoClick = () => {
    navigate('/carrito');
  };

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate('/login'); // Redirige al login
  };

  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearchText(query);

    if (query.trim() === '') {
      setFilteredProducts([]); // Si no hay texto, no mostrar resultados
    } else {
      // Filtrar productos que coincidan con el texto ingresado
      const results = productos.filter((product) =>
        product.nombre.toLowerCase().includes(query)
      );
      setFilteredProducts(results);
    }
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {/* Logo */}
          <IconButton edge="start" color="inherit" onClick={() => navigate('/')}>
            <img src="\src\Images\Logo.gif" alt="Logo" style={{ height: 40 }} />
          </IconButton>

          {/* Enlaces de navegación */}
          <div style={{ flexGrow: 1 }}>
            <Button color="inherit" onClick={() => navigate('/ofertas')}>
              Ofertas
            </Button>
            <Button
              color="inherit"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
            >
              Categorías
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
              <MenuItem onClick={() => navigate('/hombres')}>Perfumería Hombre</MenuItem>
              <MenuItem onClick={() => navigate('/mujeres')}>Perfumería Mujer</MenuItem>
            </Menu>
            <Button color="inherit" onClick={() => navigate('/otros')}>
              Otros
            </Button>
          </div>

          {/* Barra de búsqueda */}
          <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
            <InputBase
              placeholder="Buscar productos..."
              value={searchText}
              onChange={handleSearchChange}
              style={{
                color: 'white',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '5px',
                padding: '5px 10px',
                width: '300px',
              }}
            />
           
          </div>

          {/* Carrito de compras */}
          <IconButton color="inherit" onClick={handleCarritoClick}>
            <ShoppingCartIcon />
            {listaProductos.length > 0 && (
              <span
                style={{
                
                  top: '0',
                 
                  backgroundColor: 'red',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '4px 8px',
                  fontSize: '12px',
                }}
              >
                {listaProductos.length}
              </span>
            )}
          </IconButton>

          {/* Botón de Logout */}
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Resultados de búsqueda */}
      {filteredProducts.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '70px',
            left: '20px',
            backgroundColor: 'white',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '5px',
            zIndex: 1000,
            width: '300px',
          }}
        >
          <List>
            {filteredProducts.map((product) => (
              <ListItem
                key={product.id}
                button
                onClick={() => navigate(`/producto/${product.id}`)}
              >
                <ListItemText primary={product.nombre} />
              </ListItem>
            ))}
          </List>
        </div>
      )}
    </>
  );
};

export default Navbar;
