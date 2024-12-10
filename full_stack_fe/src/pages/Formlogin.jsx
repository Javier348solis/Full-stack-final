import React, { useState } from 'react';
import '../styles/Login.css';
import { obtenerUsuario, guardarUsuario } from '../services/fetch'; 
import { useNavigate } from 'react-router-dom';

function FormLogin() {
const navegar = useNavigate();

  // Definición de estados para los campos de formulario
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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
      const data = await guardarUsuario(usuarioLogin,`login-usuario/`);
      console.log(data);
      if(data.success){
        console.log("entre");
      }if(!data.token){
        alert("no entre");
        
      }
      // Si es exitoso, podrías redirigir al usuario a otra página o mostrar un mensaje
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h1>Inicio de Sesión</h1>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            placeholder="Nombre Completo" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
          {/* <input 
            type="email" 
            placeholder="Correo electrónico" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          /> */}
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button onClick={() => navegar("/")} type="submit">Ingresar</button>
        </form>
        <a href="">No tienes una cuenta? Regístrate aquí</a>
        <a href="">¿Olvidaste tu contraseña?</a>
      </div>
    </div>
  );
}

export default FormLogin;
