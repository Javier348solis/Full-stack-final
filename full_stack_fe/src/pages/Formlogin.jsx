import React, { useState } from 'react';
import '../styles/Login.css';
import { obtenerUsuario, guardarUsuario } from '../services/fetch'; 
import { useNavigate } from 'react-router-dom';

// Importar componentes de Material UI
import { Box, TextField, Button, Typography } from '@mui/material';

function FormLogin() {
  const navegar = useNavigate();

  // Definición de estados para los campos de formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Función para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar recarga de página

    // Validar que los campos no estén vacíos
    if (!username || !password) {
      alert('Por favor, llene todos los campos');
      return;
    }

    const usuarioLogin = {
      username,
      password,
    };

    try {
      // Aquí puedes hacer una llamada POST si deseas verificar el usuario o iniciar sesión
      const data = await guardarUsuario(usuarioLogin, `login-usuario/`);
      console.log(data);
      if (data.success) {
        console.log('Inicio de sesión exitoso');
      } else if (!data.token) {
        alert('Error de inicio de sesión');
      }
      // Si es exitoso, podrías redirigir al usuario a otra página o mostrar un mensaje
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="login-container">
      <Box
        className="login-form-container"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={3}
        borderRadius={2}
        boxShadow={3}
        bgcolor="rgba(1, 3, 38, 0.6)" // Fonde de opacidad
        maxWidth={400}
        mx="auto"
      >
        <Typography variant="h4" gutterBottom>
          Inicio de Sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField 
            label="Nombre Completo" 
            variant="outlined" 
            fullWidth 
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputLabelProps={{
              style: { color: 'white' }  // Cambiar el color del label
            }}
            inputProps={{
              style: { color: 'white' } // Cambiar el color del texto
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',  // Cambiar el borde a blanco
                },
                '&:hover fieldset': {
                  borderColor: '#4CAF50',  // Cambiar el borde al pasar el mouse
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4CAF50',  // Cambiar el borde cuando está enfocado
                },
              },
            }}
          />
          <TextField 
            label="Contraseña" 
            type="password" 
            variant="outlined" 
            fullWidth 
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputLabelProps={{
              style: { color: 'white' }
            }}
            inputProps={{
              style: { color: 'white' }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white', 
                },
                '&:hover fieldset': {
                  borderColor: '#4CAF50', 
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#4CAF50', 
                },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: '#f4f2ea',
              color: 'black',
              '&:hover': {
                backgroundColor: '#f4f2ea',
              }
            }}
            onClick={() => navegar("/")}
          >
            Ingresar
          </Button>
        </form>
        <Box mt={2}>
          <a href="/registro">No tienes una cuenta? Regístrate aquí</a>
        </Box>
        <Box mt={1}>
          <a href="#">¿Olvidaste tu contraseña?</a>
        </Box>
      </Box>
    </div>
  );
}

export default FormLogin;
