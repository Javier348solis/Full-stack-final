import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useCarrito } from "../components/Carrito";
import FormEditar from "../components/FormEditar";
import '../styles/Paginahombre.css';
import { useNavigate } from "react-router-dom";
import { actualizaDatos } from "../services/fetch";

const PerfuHombres = () => {
  const { agregarProductoAlCarrito } = useCarrito();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);
  const navigate = useNavigate();

  // Simulamos la función isAdmin
  const isAdmin = localStorage.getItem('admin'); // Cambia esto según tu lógica de autenticación
  console.log(isAdmin)
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/crear-producto/");
        if (!response.ok) throw new Error("Error al cargar los productos");
        const data = await response.json();
        const productosHombre = data.filter((producto) => producto.genero === "Hombre");
        setProductos(productosHombre);
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

  const manejarAgregarProducto = (producto) => {
    agregarProductoAlCarrito(producto);
  };

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
                onClick={() => manejarAgregarProducto(producto)}
              >
                Añadir al carrito
              </button>
              {localStorage.getItem('admin') === 'true' ? (
                <button
                  className="edit-button"
                  onClick={() => openModal(producto)}
                >
                  Editar
                </button>
              ):null}
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

export default PerfuHombres;
