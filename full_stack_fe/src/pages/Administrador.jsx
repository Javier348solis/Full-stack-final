import React from "react";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import FormAdministrador from "../components/FormAdministrador"
import Ventas from "../components/Ventas"
import { useState,useEffect } from "react";
const PaginaAdministrador = () =>{
    const [productos, setProductos] = useState([]);
    useEffect(() => {
        const fetchProductos = async () => {
          try {
            const response = await fetch("http://127.0.0.1:8000/api/crear-producto/");
            if (!response.ok) throw new Error("Error al cargar los productos");
            const data = await response.json();
            setProductos(data);
          } catch (error) {
            console.error("Error al cargar los productos:", error);
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
    
    return(
        <>
        <Navbar/>
        <h1>Administrador</h1>
        <FormAdministrador/>
        <Footer/>
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
            </div>
            </div>
        ))}
        <Ventas/>
        </div>
        </>
    );
}

export default PaginaAdministrador;