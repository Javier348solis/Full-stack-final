// Archivo: CarritoProvider.js

import React, { createContext, useState, useContext } from 'react';

// Crear el contexto del carrito
const CarritoContext = createContext();

// Crear el proveedor del contexto
export const CarritoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);

  // Función para agregar un producto al carrito
  const agregarProductoAlCarrito = (producto) => {
    setProductos((prevProductos) => [...prevProductos, producto]);
  };

  // Función para eliminar un producto del carrito (solo en el estado local)
  const eliminarProducto = (uniqueId) => {
    setProductos((prevProductos) => prevProductos.filter((producto) => producto.uniqueId !== uniqueId));
  };

  return (
    <CarritoContext.Provider
      value={{
        productos,
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
