import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Routing from './Rutas/Routing.jsx';
import { CarritoProvider } from './components/Carrito.jsx';  // Asegúrate de importar el proveedor correctamente

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarritoProvider> {/* Aquí se envuelve tu aplicación con el CarritoProvider */}
      <Routing />
    </CarritoProvider>
  </StrictMode>
);
