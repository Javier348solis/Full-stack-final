import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import FormRegistro from '../pages/FormRegistro';
import FormLogin from '../pages/Formlogin';
import Ofertas from '../pages/Ofertas';
import PerfuMujer from '../pages/PerfuMujer';
import PerfuHombres from '../pages/Perfuhombres';
import Contacto from '../components/Contacto';
import Administrador from '../pages/Administrador';
import RutasPrivadas from './Rutasprivadas';
import ProductosCarrito from '../pages/Productoscarrito';
import Pago from '../pages/Metodopago';

const Routing = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const adminStatus = localStorage.getItem('admin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/registro' element={<FormRegistro />} />
        <Route path='/login' element={<FormLogin />} />
        <Route path='/ofertas' element={<Ofertas />} />
        <Route path='/mujeres' element={<PerfuMujer />} />
        <Route path='/hombres' element={<PerfuHombres />} />
        <Route path='/contacto' element={<Contacto />} />
        <Route path='/admin' element={<RutasPrivadas isAuthenticated={isAdmin} children={<Administrador />} />} />
        <Route path='/carrito' element={<ProductosCarrito/>}/>
        <Route path='/metodopago' element={<Pago/>}/>
      </Routes>
    </Router>
  );
};

export default Routing;
