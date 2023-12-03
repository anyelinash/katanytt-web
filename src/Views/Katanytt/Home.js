import React from 'react';
import Navbar from './Navbar';  // Asegúrate de ajustar la ruta correcta al archivo Navbar
import Carousel from '../Katanytt/Carousel';
import '../../Styles/katanytt.css';

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container-fluid p-0 custom-height">
        {/* Contenedor principal */}
        <Carousel />
        <div className="row mt-4">
          {/* Fila para la información adicional */}
          <div className="col">
            {/* Aquí puedes agregar la información adicional */}
            <h2>Quiénes Somos</h2>
            <p>
              Aquí puedes agregar información sobre tu empresa o proyecto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
