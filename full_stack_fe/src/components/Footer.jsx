import React from 'react';
import '../styles/Footer.css';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Link, Box } from '@mui/material';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <Box sx={{ backgroundColor: '#333', padding: '2rem', color: 'white' }}>
        <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
  <Typography variant="h6" sx={{ marginBottom: '1rem' }}>Ubicación</Typography>
  <Link 
    href="https://www.google.com/maps" 
    target="_blank" 
    rel="noopener noreferrer" 
    color="inherit" 
    sx={{ display: 'block', marginBottom: '0.5rem' }} /* Espaciado entre los enlaces */
  >
    Dirección de la empresa
  </Link>
</Grid>

          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Contacto</Typography>
            <Link onClick={() => navigate("/Contacto")} href="#" color="inherit" sx={{ display: 'block', marginBottom: '0.5rem' }}>
              Formulario de contacto
            </Link>
            <Link href="tel:+1234567890" color="inherit">
              +506 85526923
            </Link>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Acerca de Nosotros</Typography>
            <Link href="/acerca-de-nosotros" color="inherit" sx={{ display: 'block', marginBottom: '0.5rem' }}>
              Más información sobre la empresa
            </Link>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Typography variant="h6">Redes Sociales</Typography>
            <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ display: 'block', marginBottom: '0.5rem' }}>
              Facebook
            </Link>
            <Link 
              href="https://wa.me/50685526923?text=Hola%20quiero%20más%20información%20sobre%20sus%20servicios" 
              target="_blank" 
              rel="noopener noreferrer" 
              color="inherit"
              sx={{ display: 'block', marginBottom: '0.5rem' }}
            >
              WhatsApp
            </Link>
            <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" color="inherit" sx={{ display: 'block', marginBottom: '0.5rem' }}>
              Instagram
            </Link>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', marginTop: '1rem' }}>
          <Typography variant="body2">&copy; 2024 Derechos reservados</Typography>
        </Box>
      </Box>
    </footer>
  );
}

export default Footer;
