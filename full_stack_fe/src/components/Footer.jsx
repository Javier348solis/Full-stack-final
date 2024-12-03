 import React from 'react'
 import '../styles/Footer.css'
 import { useNavigate } from 'react-router-dom';
 
 function Footer() {
  const navigate = useNavigate();
   return (
    <footer className="footer">
    <div className="footer-content">
      <div className="footer-column">
        <h4>Ubicación</h4>
        <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">Dirección de la empresa</a>
      </div>
      <div className="footer-column">
        <h4>Contacto</h4>
        <a onClick={() => navigate("/Contacto")} href="">Formulario de contacto</a>
        <a href="tel:+1234567890">+1 234 567 890</a>
      </div>
      <div className="footer-column">
        <h4>Acerca de Nosotros</h4>
        <a href="/acerca-de-nosotros">Más información sobre la empresa</a>
      </div>
      <div className="footer-column">
        <h4>Redes Sociales</h4>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer">WhatsApp</a>
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
 