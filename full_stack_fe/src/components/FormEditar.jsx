import React, { useState } from "react";
import { TextField, Button, Grid } from '@mui/material';

// Componente para editar los detalles de un producto
const FormEditar = ({ producto, onClose, onActualizar }) => {
  // Estado que mantiene los datos del formulario
  const [formData, setFormData] = useState({
    nombre_producto: producto.nombre_producto, 
    cantidad_ml: producto.cantidad_ml,
    imagen: null, 
    descripcion: producto.descripcion, 
  });

  // Funcion para manejar el cambio de los campos del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // Actualiza el estado del formulario con los nuevos valores
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Si es un archivo, lo guarda, si es un campo de texto, guarda el valor
    });
  };

  // Funcion para manejar el envio del formulario (cuando se hace clic en el boton "Editar")
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que se recargue la pagina
    // Llamada a la funcion onActualizar que se pasa como prop, para actualizar los datos del producto
    const datosActualizados = await onActualizar(producto.id, formData);
    console.log('Datos actualizados:', datosActualizados); // Muestra los datos actualizados en la consola
    onClose(); // Cierra el formulario de edición
  };

  return (
    <div className="contenedor-form-edit">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Campo de texto para editar el nombre del producto */}
          <TextField
            fullWidth
            label="Nombre Producto"
            name="nombre_producto"
            value={formData.nombre_producto}
            onChange={handleChange} // Llamada a la funcion handleChange cuando cambia el valor
          />
        </Grid>
        <Grid item xs={12}>
          {/* Campo de texto para editar la cantidad en mililitros */}
          <TextField
            fullWidth
            label="Editar ML"
            name="cantidad_ml"
            type="number" // Campo de tipo numerico
            value={formData.cantidad_ml}
            onChange={handleChange} // Llamada a la funcion handleChange cuando cambia el valor
          />
        </Grid>
        <Grid item xs={12}>
          {/* Boton para seleccionar una nueva imagen del producto */}
          <Button
            variant="contained"
            component="label"
            fullWidth
          >
            Seleccione una imagen
            <input
              type="file"
              hidden // Oculta el campo de entrada de archivo
              name="imagen"
              onChange={handleChange} // Llamada a la funcion handleChange cuando cambia el archivo
              required // Indica que el campo es obligatorio
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          {/* Campo de texto para editar la descripcion del producto */}
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange} // Llamada a la funcion handleChange cuando cambia el valor
          />
        </Grid>
        <Grid item xs={12}>
          {/* Boton para enviar los datos y editar el producto */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit} // Llamada a la funcion handleSubmit cuando se hace clic en el boton
            fullWidth
          >
            Editar
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default FormEditar;
