import React, { useState } from 'react';
import '../styles/Login.css';
import { obtenerUsuario, guardarUsuario } from '../services/fetch'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Authprovider';
// Importar componentes de Material UI
import { Box, TextField, Button, Typography } from '@mui/material';

function FormLogin() {
  const navegar = useNavigate();  // Usamos el hook useNavigate para redirigir a otras paginas
  const { login } = useAuth();  // Obtenemos la funcion de login desde el contexto de autenticacion
  
  // Definicion de estados para los campos de formulario
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Funcion para manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();  // Evitar recarga de pagina

    // Validar que los campos no esten vacios
    if (!username || !password) {
      alert('Por favor, llene todos los campos');
      return;
    }

    const usuarioLogin = {
      username,
      password,
    };

    try {
      // Llamada a la API para verificar credenciales
      const data = await guardarUsuario(usuarioLogin, `login-usuario/`);
      console.log(data);

      // Si el inicio de sesion es exitoso, se verifica el rol del usuario
      if (data.success) {
        console.log('Inicio de sesion exitoso');
        localStorage.setItem('access_token', data.token);  // Guardar el token de acceso
        localStorage.setItem('admin', data.is_admin);  // Guardar si es admin en localStorage

        console.log('Valor de admin:', data.is_admin);

        // Si el usuario es administrador, redirigir a la pagina de admin
        if (data.is_admin === true || data.is_admin === 'true') {
          console.log('Redirigiendo al panel de administrador');
          login();  // Establecer el estado de autenticacion en el contexto
          navegar('/admin');  // Redirigir al panel de administrador
          return;  // Detener la ejecucion para evitar redireccion multiple
        }

        // Si no es administrador, redirigir al home
        console.log('Redirigiendo a la pagina de inicio');
        login();  // Establecer el estado de autenticacion
        navegar('/');  // Redirigir al home para usuarios normales
      } else if (!data.token) {
        alert('Error de inicio de sesion');
      }
    } catch (error) {
      console.error('Error al iniciar sesion:', error);  // Manejar errores
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
        bgcolor="rgba(1, 3, 38, 0.6)" // Fondo con opacidad
        maxWidth={400}
        mx="auto"
      >
        <Typography variant="h4" gutterBottom>
          Inicio de Sesion
        </Typography>
        <form>
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
                  borderColor: '#4CAF50',  // Cambiar el borde cuando esta enfocado
                },
              },
            }}
          />
          <TextField 
            label="Contrasena" 
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
            type="button"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: '#f4f2ea',
              color: 'black',
              '&:hover': {
                backgroundColor: '#f4f2ea',
              }
            }}
            onClick={handleSubmit}  // Ejecutar la funcion de inicio de sesion
          >
            Ingresar
          </Button>
        </form>
        <Box mt={2}>
          <a href="/registro">No tienes una cuenta? Registrate aqui</a>
        </Box>
        <Box mt={1}>
          <a href="#">¿Olvidaste tu contrasena?</a>
        </Box>
      </Box>
    </div>
  );
}

export default FormLogin;
