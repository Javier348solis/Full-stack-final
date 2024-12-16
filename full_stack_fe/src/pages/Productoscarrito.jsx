import React from 'react';
import { useCarrito } from '../components/Carrito';

const ProductosCarrito = () => {
  const { productos, eliminarProducto } = useCarrito();

  return (
    <div style={{ padding: '20px' }}>
      <h2>Carrito de Compras</h2>
      {productos.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {productos.map((producto) => (
            <li
              key={producto.uniqueId}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
                borderBottom: '1px solid #ccc',
                paddingBottom: '10px',
              }}
            >
              {/* Imagen del producto */}
              <img
                src={producto.imagen || "imagen_url"}
                alt={producto.nombre}
                style={{
                  width: '200px',
                  height: '200px',
                  objectFit: 'cover',
                  marginRight: '15px',
                  borderRadius: '10px',
                }}
              />

              {/* Detalles del producto */}
              <div style={{ flex: 1 }}>
                <p>
                  <strong>{producto.nombre}</strong>
                </p>
                <p>Cantidad: {producto.cantidad}</p>
                <p>Precio: ${producto.precio}</p>
              </div>

              {/* Botón para eliminar */}
              <button
                onClick={() => eliminarProducto(producto.uniqueId)}
                style={{
                  padding: '10px 15px',
                  backgroundColor: 'red',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductosCarrito;
