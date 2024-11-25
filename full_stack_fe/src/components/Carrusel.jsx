import Carousel from 'react-bootstrap/Carousel';
import Imagen from './Imagen';
import '../styles/Carrusel.css';

function Carrusel() {
  return (
    <Carousel interval={5000} className="custom-carousel">
      <Carousel.Item>
        <Imagen text="First slide" url={"/src/Images/versace-eros.jpg"} />
        <div className="carousel-caption">
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <Imagen text="Second slide" url={"/src/Images/POLO PERFUME.jpg"} />
        <div className="carousel-caption">
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <Imagen text="Third slide" url={"/src/Images/versace eros.jpg"} />
        <div className="carousel-caption">
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carrusel;
