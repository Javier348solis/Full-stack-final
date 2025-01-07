import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCarrito } from "../components/Carrito";
import FormEditar from "../components/FormEditar";
import '../styles/Paginahombre.css';
import { useNavigate } from "react-router-dom";
import { actualizaDatos } from "../services/fetch";



const PerfuHombres = () => {
  const { agregarProductoAlCarrito } = useCarrito(); // Hook para agregar productos al carrito
  const [productos, setProductos] = useState([]); // Estado para los productos filtrados
  const [loading, setLoading] = useState(true); // Estado para mostrar un indicador de carga
  const [modalOpen, setModalOpen] = useState(false); // Estado para controlar la apertura del modal
  const [selectedProducto, setSelectedProducto] = useState(null); // Producto seleccionado para editar
  const navigate = useNavigate(); // Hook para redirigir a otras paginas

  // Simulamos la funcion isAdmin
  const isAdmin = localStorage.getItem('admin'); // Verifica si el usuario es administrador
  console.log(isAdmin);

  // Carga los productos al montar el componente
  useEffect(() => {
    const fetchProductos = async () => {
      try {
        // Peticion a la API para obtener los productos
        const response = await fetch("http://127.0.0.1:8000/api/crear-producto/");
        if (!response.ok) throw new Error("Error al cargar los productos");
        const data = await response.json();

        // Filtra los productos para mostrar solo los del genero "Hombre"
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

  // Abre el modal para editar un producto
  const openModal = (producto) => {
    setSelectedProducto(producto); // Establece el producto seleccionado
    setModalOpen(true); // Abre el modal
  };

  // Cierra el modal
  const closeModal = () => {
    setSelectedProducto(null); // Reinicia el producto seleccionado
    setModalOpen(false); // Cierra el modal
  };

  // Agrega un producto al carrito
  const manejarAgregarProducto = (producto) => {
    agregarProductoAlCarrito(producto);
  };

  // Actualiza un producto en la lista
  const manejarActualizarProducto = async (id, datosActualizados) => {
    try {
      // Actualiza los datos del producto en la API
      const datos = await actualizaDatos(id, datosActualizados);
      // Actualiza el estado con el producto editado
      setProductos((prevProductos) =>
        prevProductos.map((producto) =>
          producto.id === id ? { ...producto, ...datos } : producto
        )
      );
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  // Muestra un mensaje de carga si los productos aun no estan disponibles
  if (loading) {
    return <p>Cargando productos...</p>;
  }

  return (
    <>
      <Navbar />

      {/* Contenedor de productos */}
      <div className="product-container">
        {productos.map((producto) => (
          <div key={producto.uniqueId} className="product-card">
            <img
              src={producto.imagen} // Imagen del producto
              alt={producto.nombre_producto}
              className="product-image"
              onClick={() => openModal(producto)} // Abre el modal al hacer clic en la imagen
            />
            <div className="product-card-body">
              <h3>{producto.nombre_producto}</h3>
              <p>Precio: ₡{producto.precio}</p>
              <button
                className="add-to-cart-button"
                onClick={() => manejarAgregarProducto(producto)} // Agrega el producto al carrito
              >
                Añadir al carrito
              </button>
              {localStorage.getItem('admin') === 'true' ? (
                // Muestra el boton "Editar" solo si el usuario es administrador
                <button
                  className="edit-button"
                  onClick={() => openModal(producto)} // Abre el modal para editar
                >
                  Editar
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Modal para editar un producto */}
      {modalOpen && selectedProducto && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>
              &times; {/* Boton para cerrar el modal */}
            </button>
            <FormEditar
              producto={selectedProducto} // Pasa el producto seleccionado al formulario
              onClose={closeModal} // Maneja el cierre del modal
              onActualizar={manejarActualizarProducto} // Maneja la actualizacion del producto
            />
          </div>
        </div>
      )}
     <Footer/>
    </>
  );
};

export default PerfuHombres;
