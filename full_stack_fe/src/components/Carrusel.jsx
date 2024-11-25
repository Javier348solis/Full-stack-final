import Carousel from 'react-bootstrap/Carousel';
import Imagen from './Imagen';
import '../styles/Carrusel.css';

function Carrusel() {
  return (
    <Carousel interval={5000} className="custom-carousel">
      <Carousel.Item>
        <Imagen text="First slide" url={"/src/Images/versace-eros.jpg"} />
        <div className="carousel-caption">
          <h3>Versace eros Energy (2024)</h3>
          <p>Oferta: ₡50.000</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <Imagen text="Second slide" url={"/src/Images/POLO PERFUME.jpg"} />
        <div className="carousel-caption">
          <h3>Polo green</h3>
          <p>Oferta: ₡46.000</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <Imagen text="Third slide" url={"/src/Images/versace eros.jpg"} />
        <div className="carousel-caption">
          <h3>Versace eros EDT</h3>
          <p>
            Oferta: ₡44.000.
          </p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrusel;
