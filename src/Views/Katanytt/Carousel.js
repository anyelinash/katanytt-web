import React from 'react';
import home1Image from '../../Images/home1.jpg';
import home2Image from '../../Images/home2.jpg';
import '../../Styles/katanytt.css';

const Carousel = () => {
  return (
    <div className="container-fluid p-0 custom-height">
      <div className="row">
        <div className="col">
          <div id="carouselExample" className="carousel slide carousel-fade" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={home1Image} className="d-block w-100" alt="Imagen 1" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={home2Image} className="d-block w-100" alt="Imagen 2" />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
              {/* Agrega más imágenes según sea necesario */}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Anterior</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Siguiente</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
