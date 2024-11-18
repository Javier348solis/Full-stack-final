import React from 'react'
import { useState, useEffect } from 'react'
import '../styles/Login.css'


function FormLogin() {



    return (
      <div className="login-container">
        <div className="login-form-container">
          <h1>Inicio de Sesión</h1>
          <input type="text" placeholder="Nombre Completo" />
          <input type="email" placeholder="Correo electrónico" />
          <input type="password" placeholder="Contraseña" />
          <button type="submit">Ingresar</button>
          <a href="">No tienes una cuenta? Regístrate aquí</a>
          <a href="">¿Olvidaste tu contraseña?</a>
        </div>
      </div>
    );
  }

export default FormLogin
