import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import { useCarrito } from './Carrito';
import { useAuth } from './Authprovider';
import Imagen from './Imagen';
import '../styles/Carrusel.css';

const Carrusel = () => {
  const { agregarProductoAlCarrito } = useCarrito();
  const { isAuthenticated, login } = useAuth();

  const productos = [
    {
      uniqueId: 1,
      nombre_producto: 'Versace eros Energy (2024)',
      precio: 50000,
      imagen_url: 'src/Images/versace-eros.jpg',
    },
    {
      uniqueId: 2,
      nombre_producto: 'Polo Green',
      precio: 46000,
      imagen_url: 'src/Images/POLO PERFUME.JPG',
    },
    {
      uniqueId: 3,
      nombre_producto: 'Versace eros EDT',
      precio: 44000,
      imagen_url: 'src/Images/versace eros.jpg',
    },
  ];

  const handleAddToCart = (producto) => {
    if (!isAuthenticated) {
      alert('Debes estar registrado para añadir productos al carrito.');
      window.location.href = '/registro'; // Redirige al registro
    } else {
      agregarProductoAlCarrito(producto);
      alert('Producto añadido al carrito con éxito.');
    }
  };

  return (
    <Box className="custom-carousel-container">
      {productos.map((producto) => (
        <Box key={producto.uniqueId} className="custom-carousel-item">
          <Imagen text={producto.nombre_producto} url={producto.imagen_url} />
          <Box className="carousel-caption" textAlign="center" mt={2}>
            <Typography variant="h6">{producto.nombre_producto}</Typography>
            <Typography variant="body1">Oferta: ₡{producto.precio.toLocaleString()}</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddToCart(producto)}
              sx={{ marginTop: '10px' }}
            >
              Añadir al carrito
            </Button>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Carrusel;
