import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FormAdministrador from "../components/FormAdministrador";
import Ventas from "../components/Ventas";
import '../styles/Administrador.css';

const PaginaAdministrador = () => {
  const [productos, setProductos] = useState([]);
  const [genero, setGenero] = useState(""); // Estado para el filtro de género

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
            />
            <div className="product-card-body">
              <h3>{producto.nombre_producto}</h3>
              <p className="letra-color">Precio: ₡{producto.precio}</p>
            </div>
          </div>
        
        ))}
      </div>
      <Ventas />
      <Footer />
    </>
  );
};

export default PaginaAdministrador;
