import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useCarrito } from "../components/Carrito";
import '../styles/Paginahombre.css'
import FormAdministrador from "../components/FormAdministrador";

const PerfuHombres = () => {
  const { agregarProductoAlCarrito } = useCarrito();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);

  // Cargar productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/crear-producto/");
        if (!response.ok) throw new Error("Error al cargar los productos");
        const data = await response.json();
        setProductos(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const openModal = (producto) => {
    setSelectedProducto(producto);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProducto(null);
    setModalOpen(false);
  };

  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <>
    <Navbar />
<div className="product-container">
  {productos.map((producto) => (
    <div key={producto.uniqueId} className="product-card">
      <img
        src={producto.imagen}
        alt={producto.nombre_producto}
        className="product-image"
        onClick={() => openModal(producto)} 
      />
      <div className="product-card-body">
        <h3>{producto.nombre_producto}</h3>
        <p>Precio: ${producto.precio}</p>
        <button
          className="add-to-cart-button"
          onClick={() => agregarProductoAlCarrito(producto)}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  ))}
</div>

<FormAdministrador /> 
       

      {modalOpen && selectedProducto && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <img
              src={selectedProducto.imagen}
              alt={selectedProducto.nombre_producto}
              className="modal-image"
            />
            <h2>{selectedProducto.nombre_producto}</h2>
            <p>Marca: {selectedProducto.marca}</p>
            <p>Precio: ${selectedProducto.precio}</p>
            <p>Cantidad: {selectedProducto.cantidad_ml} ml</p>
            <p>Descripción: Este perfume tiene una fragancia increíble...</p>
            <button
              className="add-to-cart-button"
              onClick={() => {
                agregarProductoAlCarrito(selectedProducto);
                closeModal();
              }}
            >
              Añadir al carrito
            </button>
            
          </div>
          
        </div>
      )}
    </>
  );
};

export default PerfuHombres;
