import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FormAdministrador from "../components/FormAdministrador";
import Ventas from "../components/Ventas";
import { deleteProduct, actualizaDatos } from "../services/fetch";
import FormEditar from "../components/FormEditar";
import "../styles/Administrador.css";
import Swal from 'sweetalert2'

const PaginaAdministrador = () => {
  const [productos, setProductos] = useState([]);
  const [genero, setGenero] = useState(""); // Estado para el filtro de género
  const [modalOpen, setModalOpen] = useState(false); // Estado para abrir/cerrar el modal
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Producto seleccionado para editar

  // Función para obtener productos, con o sin filtro de género
  const fetchProductos = async (genero) => {
    try {
      const endpoint = genero
        ? `http://127.0.0.1:8000/api/crear-producto/?genero=${genero}`
        : `http://127.0.0.1:8000/api/crear-producto/`;

      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Error al cargar los productos");
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  // Llama a la función fetchProductos cuando el componente se monta o cambia el género
  useEffect(() => {
    fetchProductos(genero);
  }, [genero]);

  // Función para manejar la eliminación de un producto
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProductos((prev) => prev.filter((producto) => producto.uniqueId !== id));
      console.log("Producto eliminado correctamente");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto eliminado",
        showConfirmButton: false,
        timer: 3000
      });
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "El producto no se pudo",
        showConfirmButton: false,
        timer: 3000
      });
    }
  };

  // Función para manejar la actualización de un producto
  const handleUpdate = async (id) => {
    const nuevosDatos = {
      nombre_producto: prompt("Ingrese el nuevo nombre del producto:"),
      precio: prompt("Ingrese el nuevo precio del producto:"),
    };

    try {
      const productoActualizado = await actualizaDatos(id, nuevosDatos);
      setProductos((prev) =>
        prev.map((producto) =>
          producto.uniqueId === id ? { ...producto, ...productoActualizado } : producto
        )
      );
      console.log("Producto actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  // Función para abrir el modal y pasar el producto a editar
  const openModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalOpen(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setProductoSeleccionado(null);
    setModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <h1>Administrador</h1>
      <FormAdministrador />

      {/* Select para filtrar por género */}
      <div style={{ margin: "20px" }}>
        <label htmlFor="genero-select">Filtrar por género: </label>
        <select
          id="genero-select"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        >
          <option value="">Todos</option>
          <option value="Hombre">Hombre</option>
          <option value="Mujer">Mujer</option>
        </select>
      </div>

      {/* Contenedor de productos */}
      <div className="product-container">
        {productos.map((producto) => (
          <div key={producto.uniqueId} className="product-card">
            <img
              src={producto.imagen}
              alt={producto.nombre_producto}
              className="product-image"
              onClick={() => openModal(producto)} // Abre el modal al hacer clic en la imagen
            />
            <div className="product-card-body">
              <h3>{producto.nombre_producto}</h3>
              <p className="letra-color">Precio: ₡{producto.precio}</p>
              <button onClick={() => handleDelete(producto.uniqueId)}>Eliminar</button>
              <button onClick={() => openModal(producto)}>Actualizar</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para editar el producto */}
      {modalOpen && productoSeleccionado && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times;
            </button>
            <FormEditar
              producto={productoSeleccionado}
              onClose={closeModal}
              onActualizar={setProductos} // Actualizar los productos después de la edición
            />
          </div>
        </div>
      )}

      <Ventas />
      <Footer />
    </>
  );
};

export default PaginaAdministrador;
