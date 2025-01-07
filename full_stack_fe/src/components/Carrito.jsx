// Archivo: CarritoProvider.js

import React, { createContext, useState, useContext } from 'react';
import Swal from 'sweetalert2';

// Crear el contexto del carrito
const CarritoContext = createContext();

// Crear el proveedor del contexto
export const CarritoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const listaProductos = JSON.parse(localStorage.getItem("productos")) || []

  // Función para agregar un producto al carrito
  const agregarProductoAlCarrito = (producto) => {
    setProductos((prevProductos) => [...prevProductos, producto]);
    localStorage.setItem('productos', JSON.stringify([...productos, producto]));
  };

  // Función para eliminar un producto del carrito (solo en el estado local)
  const eliminarProducto = (uniqueId) => {
    const newProductos = listaProductos.filter(
      (producto) => producto.uniqueId !== uniqueId
    );
    setProductos(newProductos);
    localStorage.setItem('productos', JSON.stringify(newProductos));
    Swal.fire({
      title: 'Producto eliminado',
      text: 'El producto se eliminó correctamente del carrito.',
      icon: 'success',
      timer: 4000, // Se cierra automáticamente en 2 segundos
      showConfirmButton: false, // Oculta el botón de confirmación
    });
  };

  return (
    <CarritoContext.Provider
      value={{
        productos,
        listaProductos,
        agregarProductoAlCarrito,
        eliminarProducto,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};

// Hook para acceder al contexto en cualquier componente
export const useCarrito = () => useContext(CarritoContext);
