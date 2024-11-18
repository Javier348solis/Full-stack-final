import React from 'react'
import '../styles/Login'

function Formlogin() {
  return (
    <div>
      <input type="text" placeholder='Nombre Completo'/>
      <input type="email" placeholder='Correo electronico'/>
      <input type="password" placeholder='Contraseña'/>
      <button type="submit">Ingresar</button>
    </div>
  )
}

export default Formlogin
