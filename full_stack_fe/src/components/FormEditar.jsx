import React, { useState } from "react";
import { TextField, Button, Grid } from '@mui/material';

const FormEditar = ({ producto, onClose, onActualizar }) => {
  const [formData, setFormData] = useState({
    nombre_producto: producto.nombre_producto,
    cantidad_ml: producto.cantidad_ml,
    imagen: null,
    descripcion: producto.descripcion,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datosActualizados = await onActualizar(producto.id, formData);
    console.log('Datos actualizados:', datosActualizados);
    onClose();
  };

  return (
    <div className="contenedor-form-edit">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Nombre Producto"
            name="nombre_producto"
            value={formData.nombre_producto}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Editar ML"
            name="cantidad_ml"
            type="number"
            value={formData.cantidad_ml}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            component="label"
            fullWidth
          >
            Seleccione una imagen
            <input
              type="file"
              hidden
              name="imagen"
              onChange={handleChange}
              required
            />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
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
