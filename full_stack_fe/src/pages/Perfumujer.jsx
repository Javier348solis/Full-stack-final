import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useCarrito } from "../components/Carrito";
import '../styles/Paginahombre.css';
import { useNavigate } from "react-router-dom";
import FormEditar from "../components/FormEditar";
import { actualizaDatos } from "../services/fetch";

const Perfumujer = () => {
  const { agregarProductoAlCarrito } = useCarrito();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const navigate = useNavigate(); // Hook para navegar a otras páginas
  
  // Cargar productos desde la API
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/crear-producto/");
        if (!response.ok) throw new Error("Error al cargar los productos");
        const data = await response.json();
        console.log(data)
        const productosMujer = data.filter((producto)=> producto.genero === "Mujer");
        setProductos(productosMujer);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const manejarActualizarProducto = async (id, datosActualizados) => {
    try {
      const datos = await actualizaDatos(id, datosActualizados);
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.id === id ? { ...producto, ...datos } : producto
        )
      );
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };


  const openModal = (producto) => {
    setSelectedProducto(producto);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProducto(null);
    setModalOpen(false);
  };

  const manejarAgregarProducto = (producto) => {
    agregarProductoAlCarrito(producto);
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
              <h3 style={{color:"#000"}}>{producto.nombre_producto}</h3>
              <p style={{color:"#000"}}>Precio: ₡{producto.precio}</p>
              <button
                className="add-to-cart-button"
                onClick={() => manejarAgregarProducto(producto)}
              >
                Añadir al carrito
              </button>
              <button
                className="add-to-cart-button"
                onClick={() => openModal(producto)}
              >
                Editar
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && selectedProducto && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <FormEditar
              producto={selectedProducto}
              onClose={closeModal}
              onActualizar={manejarActualizarProducto}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Perfumujer;
