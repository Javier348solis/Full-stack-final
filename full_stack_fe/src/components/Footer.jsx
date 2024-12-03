 import React from 'react'
 import '../styles/Footer.css'
 
 function Footer() {
   return (
    <footer className="footer">
    <div className="footer-content">
      <div className="footer-column">
        <h4>Ubicación</h4>
        <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">Dirección de la empresa</a>
      </div>
      <div className="footer-column">
        <h4>Contacto</h4>
        <a href="mailto:contacto@empresa.com">contacto@empresa.com</a>
        <a href="tel:+1234567890">+1 234 567 890</a>
      </div>
      <div className="footer-column">
        <h4>Acerca de Nosotros</h4>
        <a href="/acerca-de-nosotros">Más información sobre la empresa</a>
      </div>
      <div className="footer-column">
        <h4>Redes Sociales</h4>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
      </div>
    </div>
    <div className="footer-rights">
      <p>&copy; 2024 Derechos reservados</p>
    </div>
  </footer>
   )
 }
 
 export default Footer
 