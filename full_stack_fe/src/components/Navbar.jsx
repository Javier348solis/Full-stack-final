import React, { useState } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, InputBase, IconButton, Menu, MenuItem } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon, Search as SearchIcon } from '@mui/icons-material';
import { useCarrito } from '../components/Carrito';

const Navbar = () => {
    const navigate = useNavigate();
    const { productos } = useCarrito(); // Usamos el hook 'useCarrito' para acceder al carrito

    // Manejo de menú de categorías
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleCarritoClick = () => {
        navigate('/carrito'); // Redirige a la página del carrito
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
                    <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
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
                        <span
                            style={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                backgroundColor: 'red',
                                color: 'white',
                                borderRadius: '50%',
                                padding: '4px 8px',
                                fontSize: '12px',
                            }}
                        >
                            {productos.length}
                        </span>
                    )}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
