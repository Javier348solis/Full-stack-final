import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography } from '@mui/material';
import { guardarUsuario } from '../services/fetch';
import '../styles/Registro.css';

function FormRegistro() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const navegar = useNavigate();

  // Función para validar los campos
  const validarEspacios = () => {
    if (!username || !password || !email || !numero) {
      alert('Favor, llenar todos los espacios');
      return false;
    }
    return true;
  };

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevenir recarga de página

    // Validar campos antes de hacer el POST
    if (!validarEspacios()) return;

    // Crear objeto con los datos del formulario
    const usuario = {
      username,
      password,
      email,
      phone_number: numero,
    };
    console.log(usuario);

    try {
      const data = await guardarUsuario(usuario, 'registro-usuario/');
      console.log('Usuario registrado:', data);
      // Limpiar los campos del formulario
      setUserName('');
      setPassword('');
      setEmail('');
      setNumero('');
    } catch (error) {
      console.error('Error al guardar el usuario:', error);
    }
  };

  return (
    <div className="contenedor-registro">
      {/* Formulario */}
      <div className="contenedor-formulario">
        <Typography variant="h4" color="primary" sx={{paddingBottom: 2}}>
          Registro
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            label="Nombre completo"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ marginBottom: '15px' }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Número telefónico"
            type="number"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            sx={{ marginBottom: '15px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: '15px' }}
            onClick={() => navegar("/login")}
          >
            Registrarse
          </Button>
          <Typography
            variant="body2"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
              color: 'gray',
            }}
          >
            ¿Ya tienes una cuenta?{' '}
            <Link
              to="/login"
              sx={{ textDecoration: 'underline', marginLeft: '5px' }}
            >
              Inicia sesión
            </Link>
          </Typography>
        </form>
      </div>

      {/* Columna de la imagen */}
      <div className="contenedor-imagen" />
    </div>
  );
}

export default FormRegistro;
