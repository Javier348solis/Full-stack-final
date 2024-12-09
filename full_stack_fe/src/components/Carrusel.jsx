import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Imagen from './Imagen';
import '../styles/Carrusel.css';
import { useCarrito } from './Carrito';

function Carrusel() {
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
    <Carousel
      interval={5000}
      className="custom-carousel"
      nextLabel="Siguiente"
      prevLabel="Anterior"
    >
      {productos.map((producto) => (
        <Carousel.Item key={producto.uniqueId}>
          <Imagen text={producto.nombre_producto} url={producto.imagen_url} />
          <div className="carousel-caption">
            <h3>{producto.nombre_producto}</h3>
            <p>Oferta: ₡{producto.precio.toLocaleString()}</p>
            <button
              className="btn btn-primary"
              onClick={() => agregarProductoAlCarrito(producto)}
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
