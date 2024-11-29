import React, { createContext, useState, useContext } from 'react';

// Crear el contexto del carrito
const CarritoContext = createContext();

// Crear el proveedor del contexto
export const CarritoProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar los productos en el carrito desde la API
  const cargarCarrito = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/');
      if (!response.ok) throw new Error('Error al cargar el carrito');
      const data = await response.json();
      setProductos(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar el carrito:', error);
      setLoading(false);
    }
  };

  // Eliminar un producto del carrito
  const eliminarProducto = async (uniqueId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/productos/delete/${uniqueId}/`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar el producto');
      setProductos(productos.filter(producto => producto.uniqueId !== uniqueId));
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
    }
  };

  // Editar la cantidad de un producto en el carrito
  const editarCantidad = async (uniqueId, cantidad) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/productos/update/${uniqueId}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cantidad }),
      });
      if (!response.ok) throw new Error('Error al editar la cantidad');
      const updatedProducto = await response.json();
      setProductos(productos.map(producto =>
        producto.uniqueId === uniqueId ? { ...producto, cantidad: updatedProducto.cantidad } : producto
      ));
    } catch (error) {
      console.error('Error al editar la cantidad:', error);
    }
  };

  // Función para agregar un producto al carrito
  const agregarProductoAlCarrito = (producto) => {
    setProductos((prevProductos) => [...prevProductos, producto]);
  };

  return (
    <CarritoContext.Provider value={{ productos, loading, cargarCarrito, eliminarProducto, editarCantidad, agregarProductoAlCarrito }}>
      {children}
    </CarritoContext.Provider>
  );
};

// Hook para acceder al contexto en cualquier componente
export const useCarrito = () => useContext(CarritoContext);

