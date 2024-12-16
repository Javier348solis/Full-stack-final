import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Routing from './Rutas/Routing.jsx';
import { CarritoProvider } from './components/Carrito.jsx';  
import { AuthProvider } from './components/Authprovider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Contexto de autenticación */}
      <CarritoProvider> {/* Contexto del carrito */}
        <Routing />
      </CarritoProvider>
    </AuthProvider>
  </StrictMode>
);
