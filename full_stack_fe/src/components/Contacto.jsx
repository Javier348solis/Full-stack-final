import React from "react";
import { useState } from "react";
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';
import '../styles/Contacto.css';

const Contacto = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      message: formData.message,
    };

    emailjs.send('service_4ptxthw', 'template_e2yr83r', templateParams, 'HowEthmonDVO_H_xp')
      .then((response) => {
        console.log('Correo enviado!', response.status, response.text);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Mensaje enviado, pronto le responderemos",
          showConfirmButton: false,
          timer: 3000
        });
      })
      .catch((error) => {
        console.error('Error al enviar el correo:', error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Por favor, llene todos los espacios",
          showConfirmButton: false,
          timer: 3000
        });
      });
  };

  return (
    <Container maxWidth="sm" sx={{
      padding: 10
    }}>
      <form onSubmit={handleSubmit} className="Contenedor-formu">
        <Typography  sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
              color: 'blue',
            }} variant="h4" gutterBottom>
          Formulario contacto
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Nombre"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Correo Electrónico"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Teléfono"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Mensaje"
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Enviar
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Contacto;
