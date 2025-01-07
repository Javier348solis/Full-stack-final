import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FormAdministrador from "../components/FormAdministrador";
import Ventas from "../components/Ventas";
import { deleteProduct, actualizaDatos } from "../services/fetch";
import FormEditar from "../components/FormEditar";
import "../styles/Administrador.css";
import Swal from 'sweetalert2';

const PaginaAdministrador = () => {
  // Estados para manejar los datos, filtro por genero, y modal
  const [productos, setProductos] = useState([]);
  const [genero, setGenero] = useState(""); // Estado para el filtro de genero
  const [modalOpen, setModalOpen] = useState(false); // Estado para abrir/cerrar el modal
  const [productoSeleccionado, setProductoSeleccionado] = useState(null); // Producto seleccionado para editar

  // Llamada para obtener los productos, con o sin filtro de genero
  useEffect(() => {
    fetchProductos(genero);
  }, [genero]);

  const fetchProductos = async (genero) => {
    try {
      // Determina el endpoint basado en si hay un filtro de genero
      const endpoint = genero
        ? `http://127.0.0.1:8000/api/crear-producto/?genero=${genero}`
        : `http://127.0.0.1:8000/api/crear-producto/`;

      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Error al cargar los productos");
      const data = await response.json();

      // Mapea los productos para actualizar el estado
      setProductos(
        data.map((producto) => ({
          uniqueId: producto.uniqueId,
          nombre_producto: producto.nombre_producto,
          cantidad_ml: producto.cantidad_ml,
          precio: producto.precio,
          marca: producto.marca,
          imagen: producto.imagen,
          oferta: producto.oferta,
          genero: producto.genero,
        }))
      );
    } catch (error) {
      console.error("Error al cargar los productos:", error);
    }
  };

  // Filtrar productos con oferta para el carrusel
  const productosEnOferta = productos.filter((producto) => producto.oferta);

  // Filtrar productos por genero
  const productosPorGenero = productos.filter((producto) => producto.genero === genero);

  // Manejo de la eliminacion de un producto
  const handleDelete = async (uniqueId) => {
    console.log("Intentando eliminar el producto con ID:", uniqueId); // Verificar que el ID es correcto
    try {
      await deleteProduct(uniqueId);
      setProductos((prev) => prev.filter((producto) => producto.uniqueId !== uniqueId));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Producto eliminado correctamente",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: error.message || "No se pudo eliminar el producto",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  // Manejo de la actualizacion de un producto
  const handleUpdate = async (producto) => {
    // Mostrar SweetAlert para confirmar la actualizacion
    const { value: confirm } = await Swal.fire({
      title: "Estas seguro?",
      text: "Estas a punto de editar este producto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, editar",
      cancelButtonText: "Cancelar",
    });

    if (!confirm) {
      Swal.fire("Cancelado", "La edicion ha sido cancelada.", "info");
      return; // Salir si el usuario cancela
    }

    // Abrir el modal para editar
    openModal(producto);
  };

  const handleSaveUpdate = async (id, nuevosDatos) => {
    try {
      const productoActualizado = await actualizaDatos(id, nuevosDatos);

      setProductos((prev) =>
        prev.map((producto) =>
          producto.uniqueId === id ? { ...producto, ...productoActualizado } : producto
        )
      );

      Swal.fire("Actualizado", "El producto se ha actualizado correctamente.", "success");
      closeModal(); // Cerrar el modal al terminar
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      Swal.fire("Error", "No se pudo actualizar el producto.", "error");
    }
  };

  // Abre el modal y pasa el producto a editar
  const openModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalOpen(true);
  };

  // Cierra el modal
  const closeModal = () => {
    setProductoSeleccionado(null);
    setModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <h1>Administrador</h1>
      <FormAdministrador />

      {/* Select para filtrar por genero */}
      <div style={{ margin: "20px" }}>
        <label htmlFor="genero-select">Filtrar por genero: </label>
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

      {/* Carrusel de productos en oferta */}
      <h2>Productos en Oferta</h2>
      <div className="carousel">
        {productosEnOferta.map((producto) => (
          <div key={producto.uniqueId} className="product-card">
            <img src={producto.imagen} alt={producto.nombre_producto} />
            <h3>{producto.nombre_producto}</h3>
            <p>Precio: ₡{producto.precio}</p>
          </div>
        ))}
      </div>

      {/* Contenedor de productos por genero */}
      <div className="product-container">
        {productosPorGenero.map((producto) => (
          <div key={producto.uniqueId} className="product-card">
            <img
              src={producto.imagen}
              alt={producto.nombre_producto}
              className="product-image"
              onClick={() => openModal(producto)} // Abre el modal al hacer clic en la imagen
            />
            <div className="product-card-body">
              <h3>{producto.nombre_producto}</h3>
              <p>Precio: ₡{producto.precio}</p>
              <button onClick={() => handleDelete(producto.uniqueId)}>Eliminar</button>
              <button onClick={() => handleUpdate(producto)}>Actualizar</button>
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
              onActualizar={(nuevosDatos) => handleSaveUpdate(productoSeleccionado.uniqueId, nuevosDatos)} // Guardar cambios
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
