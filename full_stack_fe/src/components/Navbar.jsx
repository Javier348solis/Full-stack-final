import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {AppBar,Toolbar,Typography,Button,InputBase,IconButton,Menu,MenuItem,List,ListItem,ListItemText,Paper,
} from "@mui/material";
import {ShoppingCart as ShoppingCartIcon,Search as SearchIcon,Logout as LogoutIcon,} from "@mui/icons-material";
import { useCarrito } from "./Carrito";
import { useAuth } from "./Authprovider";

const Navbar = () => {
  const navigate = useNavigate();
  const { listaProductos } = useCarrito();
  const { logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState(""); // Término de búsqueda
  const [searchResults, setSearchResults] = useState([]); // Resultados de búsqueda

  // Manejo del menú de categorías
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleCarritoClick = () => navigate("/carrito");

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate("/login");
  };

  // Función para manejar la búsqueda
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/productos/search/?search=${query}`
      );
      if (!response.ok) {
        throw new Error("Error al buscar productos");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.log("Error al buscar productos:", error);
      setSearchResults([]);
    }
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Logo */}
        <IconButton edge="start" color="inherit" onClick={() => navigate("/")}>
          <img
            src="/src/Images/Logo.gif"
            alt="Logo"
            style={{ height: 40 }}
          />
        </IconButton>

        {/* Enlaces de navegación */}
        <div style={{ flexGrow: 1 }}>
          <Button color="inherit" onClick={() => navigate("/ofertas")}>
            Ofertas
          </Button>
          <Button color="inherit" onClick={handleMenuOpen}>
            Categorías
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
            <MenuItem onClick={() => navigate("/hombres")}>
              Perfumería Hombre
            </MenuItem>
            <MenuItem onClick={() => navigate("/mujeres")}>
              Perfumería Mujer
            </MenuItem>
          </Menu>
          <Button color="inherit" onClick={() => navigate("/otros")}>
            Otros
          </Button>
        </div>

        {/* Barra de búsqueda */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          <InputBase
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
           
            style={{
              color: "white",
              paddingRight: "10px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              borderRadius: "4px",
              padding: "5px",
            }}
          />
          {/* Mostrar resultados de búsqueda */}
          {searchResults.length > 0 && (
            <Paper
              style={{
                position: "absolute",
                top: "40px",
                left: 0,
                right: 0,
                zIndex: 1000,
                maxHeight: "300px",
                overflowY: "auto",
              }}
            >
              <List>
                {searchResults.map((producto) => (
                  <ListItem
                    key={producto.uniqueId}
                    button
                    onClick={() => navigate(`/producto/${producto.uniqueId}`)}
                  >
                    <ListItemText
                      primary={producto.nombre_producto}
                      secondary={`$${producto.precio}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </div>

        {/* Carrito de compras */}
        <IconButton color="inherit" onClick={handleCarritoClick}>
          <ShoppingCartIcon />
          {listaProductos.length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "0",
                right: "20",
                backgroundColor: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
              }}
            >
              {listaProductos.length}
            </span>
          )}
        </IconButton>

        {/* Botón de logout */}
        <IconButton color="inherit" onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
