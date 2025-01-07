import React from "react";
import { useEffect } from "react";
import { useCarrito } from "./Carrito";

// Componente para mostrar y gestionar el carrito de compras
const CarritoImg = () => {
  // Obtener los productos, y las funciones para eliminar y editar productos desde el contexto del carrito
  const { productos, eliminarProductos, editarProductos } = useCarrito();

  // Funcion para manejar la eliminacion de un producto del carrito
  const handleEliminar = (uniqueId) => {
    eliminarProductos(uniqueId); // Llamada a la funcion eliminarProductos con el uniqueId del producto
  };

  // Funcion para manejar la edicion de la cantidad de un producto en el carrito
  const handleEditarCantidad = (uniqueId) => {
    editarProductos(uniqueId); // Llamada a la funcion editarProductos con el uniqueId del producto
  };

  return (
    <div>
      <h2>Mi Carrito</h2>
      {/* Verificar si el carrito esta vacio */}
      {productos.length === 0 ? (
        <p>No hay productos en el carrito.</p> // Mensaje cuando no hay productos
      ) : (
        <ul>
          {/* Iterar sobre los productos y mostrarlos */}
          {productos.map((producto) => (
            <li key={producto.uniqueId}>
              {/* Mostrar la imagen del producto */}
              <img src={producto.imagen_url} alt={producto.nombre_producto} width="100" />
              <h3>{producto.nombre_producto}</h3> 
              <p>{producto.marca}</p> 
              <p>{producto.precio} €</p> 
              <p>Cantidad: {producto.cantidad}</p> {/* Cantidad de ese producto en el carrito */}
              
              <button onClick={() => handleEditarCantidad(producto.uniqueId, producto.cantidad + 1)}>Añadir más</button>
              {/* Boton para eliminar el producto del carrito */}
              <button onClick={() => handleEliminar(producto.uniqueId)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CarritoImg;
