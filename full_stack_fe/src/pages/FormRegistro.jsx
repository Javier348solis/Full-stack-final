import React, { useState, useEffect } from 'react';
import '../styles/Registro.css';
import { guardarUsuario, obtenerUsuario } from '../services/fetch';

function FormRegistro() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [numero, setNumero] = useState('');
  const [datos, setDatos] = useState([]);

  // Usamos useEffect para cargar los usuarios si es necesario
// useEffect(() => {
  //   const obtainUsers = async () => {
  //     try {
  //       const datosUsuarios = await obtenerUsuario('user');
  //       setDatos(datosUsuarios);
  //     } catch (error) {
  //       console.error("Error al obtener usuarios:", error);
  //     }
  //   };
  //   obtainUsers();
  // }, []);  // Este useEffect se ejecutará solo al montar el componente"

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
      phone_number:numero
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
    <div className='contenedor-registro'>
      <h1>Registro</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Nombre completo'
          value={username}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          type="email"
          placeholder='Correo electrónico'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder='Contraseña'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="number"
          placeholder='Número telefónico'
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
        <button type="submit">Registrarse</button>
        <a href="" className='account-login'>Ya tienes una cuenta?</a>
      </form>
    </div>
  );
}

export default FormRegistro;
