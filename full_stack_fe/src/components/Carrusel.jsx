import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Button, Typography, Box } from '@mui/material';
import { useCarrito } from './Carrito';
import Imagen from './Imagen';
import '../styles/Carrusel.css';

const Carrusel = () => {
  const { agregarProductoAlCarrito } = useCarrito();

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

  return (
    <Box className="custom-carousel-container">
      <Carousel
        autoPlay={true}
        interval={5000}
        indicators={true}
        animation="slide"
        navButtonsAlwaysVisible={true}
        navButtonsProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#ffffff',
          },
        }}
      >
        {productos.map((producto) => (
          <Box key={producto.uniqueId} className="custom-carousel-item">
            <Imagen text={producto.nombre_producto} url={producto.imagen_url} />
            <Box className="carousel-caption" textAlign="center" mt={2}>
              <Typography variant="h6">{producto.nombre_producto}</Typography>
              <Typography variant="body1">Oferta: ₡{producto.precio.toLocaleString()}</Typography>
              <Button
                variant="contained"
                color="primary"
                onClick={() => agregarProductoAlCarrito(producto)}
                sx={{ marginTop: '10px' }}
              >
                Añadir al carrito
              </Button>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default Carrusel;
