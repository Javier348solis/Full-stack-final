import React from 'react';
import '../styles/Aboutus.css'
import Navbar from './Navbar';
import Footer from './Footer';

const AcercaDeNosotros = () => {
  return (
    <>
    <Navbar/>
    <div className="acerca-de-nosotros">
      <div className="acerca-de-nosotros-contenido">
        <h1>Acerca de Nosotros</h1>
        <p>
          Nuestro emprendimiento surgió a finales de la pandemia, con una gran
          pasión por las colonias. Somos una tienda física ubicada en Pérez
          Zeledón y también operamos en línea, ofreciendo una amplia variedad de
          productos. Nos especializamos en colonias de diferentes marcas, tanto
          de diseñador como de nicho. Realizamos envíos a través de mensajeros
          locales o por medio de Correos de Costa Rica.
        </p>
        <p>
          En nuestra tienda podrás encontrar una selección de colonias exclusivas
          que no solo destacan por su fragancia, sino también por su calidad y
          durabilidad. Nos apasiona compartir el mundo de las fragancias con
          nuestros clientes, brindando un servicio personalizado y cercano.
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AcercaDeNosotros;
