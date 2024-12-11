import React from "react";
import '../styles/FormAdmin.css';
import { useState } from "react";
import { guardarImagenes, guardarUsuario } from "../services/fetch";

const FormAdministrador = () => {
    const [file, setFile] = useState(null);
    const [nombre, setNombre] = useState();
    const [cantidad, setCantidad] = useState();
    const [precio, setPrecio] = useState();
    const [marca, setMarca] = useState();
    const [descripcion, setDescripcion] = useState();
    const [genero, setGenero] = useState("Hombre"); // Estado para el género

    const subirImagen = async () => {
        try {
            if (file) {
                const subir = await guardarImagenes(file, 'subir-imagen');
                console.log(subir.url);
                return subir.url;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const subirProducto = async () => {
        const Url = await subirImagen();
        const datosProductos = {
            nombre_producto: nombre,
            cantidad_ml: cantidad,
            precio: precio,
            marca: marca,
            imagen: Url,
            genero: genero, 
        };
        const peticion = await guardarUsuario(datosProductos, 'crear-producto/');
        console.log(peticion);
    };

    return (
        <>
            <div className="contenedor-form-container">
                <div className="contenedor-form-add">
                    <input
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        placeholder="Nombre Producto"
                    />
                    <input
                        onChange={(e) => setCantidad(e.target.value)}
                        type="number"
                        placeholder="Cantidad ML"
                    />
                    <input
                        onChange={(e) => setPrecio(e.target.value)}
                        type="text"
                        placeholder="Precio"
                    />
                    <input
                        onChange={(e) => setMarca(e.target.value)}
                        type="text"
                        placeholder="Marca"
                    />
                    <select
                        onChange={(e) => setGenero(e.target.value)}
                        value={genero} // Valor controlado por el estado
                    >
                        <option value="Hombre">Hombre</option>
                        <option value="Mujer">Mujer</option>
                    </select>
                    <input
                        onChange={(e) => setFile(e.target.files[0])}
                        type="file"
                        placeholder="Seleccione una imagen"
                        required
                    />
                    <input
                        onChange={(e) => setDescripcion(e.target.value)}
                        type="text"
                        placeholder="Descripcion"
                    />
                    <button onClick={subirProducto}>Agregar Producto</button>
                </div>
                <div className="contenedor-form-edit">
                    <input type="text" placeholder="Nombre Producto" />
                    <input type="number" placeholder="Editar ML" />
                    <input type="file" placeholder="Seleccione una imagen" required />
                    <input type="text" placeholder="Descripcion" />
                    <button>Editar</button>
                </div>
            </div>
        </>
    );
};

export default FormAdministrador;
