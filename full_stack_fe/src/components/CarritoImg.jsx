import React from "react";
import { useEffect } from "react";
import { useCarrito } from "./Carrito";

const CarritoImg = () =>{
  const { productos, eliminarProductos, editarProductos} = useCarrito();

  const handleEliminar = (uniqueId) => {
    eliminarProductos(uniqueId);
  };

  const handleEditarCantidad = (uniqueId) =>{
    editarProductos(uniqueId);
  };

  return (
    <div>
      <h2>Mi Carrito</h2>
      {productos.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul>
          {productos.map((producto) => (
            <li key={producto.uniqueId}>
              <img src={producto.imagen_url} alt={producto.nombre_producto} width="100" />
              <h3>{producto.nombre_producto}</h3>
              <p>{producto.marca}</p>
              <p>{producto.precio} €</p>
              <p>Cantidad: {producto.cantidad}</p>
              <button onClick={() => handleEditarCantidad(producto.uniqueId, producto.cantidad + 1)}>Añadir más</button>
              <button onClick={() => handleEliminar(producto.uniqueId)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};