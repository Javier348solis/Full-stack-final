import { Button, Typography, Box } from '@mui/material';
import { useCarrito } from './Carrito';
import { useAuth } from './Authprovider';
import Imagen from './Imagen';
import '../styles/Carrusel.css';
import { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

const Carrusel = () => {
  const { agregarProductoAlCarrito } = useCarrito();
  const { isAuthenticated, login } = useAuth();
  const [listaProductos, setListaProductos] = useState([]);
  const [startIndex, setStartIndex] = useState(0); // Controlar el índice de los productos visibles
  const carouselRef = useRef(null); // Referencia para el carrusel

  useEffect(() => {
    const traerProductos = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/crear-producto/");
      const data = await response.json();
      const oferta = data.filter(producto => producto.oferta === true);
      setListaProductos(oferta);
    };
    traerProductos();
  }, [isAuthenticated]);

  // Desplazamiento automático cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % listaProductos.length);
    }, 5000); // 5000ms = 5 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, [listaProductos.length]);

  const handleAddToCart = (producto) => {
    if (!localStorage.getItem('login')) {
      Swal.fire({
        title: 'Inicia sesión',
        text: 'Debes estar registrado para añadir productos al carrito.',
        icon: 'warning',
        confirmButtonText: 'Ir al registro',
      }).then(() => {
        window.location.href = '/registro'; // Redirige al registro
      });
    } else {
      agregarProductoAlCarrito(producto);
      Swal.fire({
        title: '¡Producto añadido!',
        text: `${producto.nombre_producto} se añadió al carrito con éxito.`,
        icon: 'success',
        timer: 3000, // Se cierra automáticamente en 2 segundos
        showConfirmButton: false, // Oculta el botón de confirmación
      });
    }
  };

  const handleArrowClick = (direction) => {
    if (direction === 'left') {
      setStartIndex((prevIndex) => (prevIndex - 1 + listaProductos.length) % listaProductos.length);
    } else if (direction === 'right') {
      setStartIndex((prevIndex) => (prevIndex + 1) % listaProductos.length);
    }
  };

  return (
    <Box className="custom-carousel-container" ref={carouselRef}>
      <button className="arrow-button arrow-left" onClick={() => handleArrowClick('left')}>
        &lt;
      </button>
      {listaProductos.length > 0 ? (
        // Solo mostramos tres productos a la vez, ciclando
        listaProductos.slice(startIndex, startIndex + 3).map((producto) => (
          <Box key={producto.uniqueId} className="custom-carousel-item">
            <Imagen text={producto.nombre_producto} url={producto.imagen} />
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
        ))
      ) : (
        <Typography variant="h6" color="white">
          No hay productos en oferta en este momento.
        </Typography>
      )}
      <button className="arrow-button arrow-right" onClick={() => handleArrowClick('right')}>
        &gt;
      </button>
    </Box>
  );
};

export default Carrusel;
