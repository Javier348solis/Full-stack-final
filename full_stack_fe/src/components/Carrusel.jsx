import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Imagen from './Imagen';
import '../styles/Carrusel.css';
import { useCarrito } from './Carrito';

function Carrusel() {
  const { agregarProductoAlCarrito } = useCarrito(); // Asegúrate de que esta función esté correctamente definida en el hook useCarrito

  // Productos definidos (puedes cargarlos desde una API si lo deseas)
  const productos = [
    {
      uniqueId: 1,
      nombre_producto: 'Versace eros Energy (2024)',
      precio: 50000,
      imagen_url: 'src/Images/versace-eros.jpg',  // Asegúrate de que esta ruta sea correcta
    },
    {
      uniqueId: 2,
      nombre_producto: 'Polo Green',
      precio: 46000,
      imagen_url: 'src/Images/POLO PERFUME.JPG',  // Ruta corregida (sin espacios)
    },
    {
      uniqueId: 3,
      nombre_producto: 'Versace eros EDT',
      precio: 44000,
      imagen_url: 'src/Images/versace eros.jpg',  // Ruta corregida (sin espacios)
    },
  ];

  return (
    <Carousel interval={5000} className="custom-carousel">
      {productos.map((producto) => (
        <Carousel.Item key={producto.uniqueId}>
          <Imagen text={producto.nombre_producto} url={producto.imagen_url} />
          <div className="carousel-caption">
            <h3>{producto.nombre_producto}</h3>
            <p>Oferta: ₡{producto.precio.toLocaleString()}</p>
            <button
              className="btn btn-primary"
              onClick={() => agregarProductoAlCarrito(producto)} // Asegúrate de que esta función esté disponible
            >
              Comprar
            </button>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carrusel;
