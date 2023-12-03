import React, { useState, useEffect } from 'react';
import Navbar from '../../Dashboard/Navbar';
import Sidebar from '../../Dashboard/Sidebar';
import '../../../Styles/luzstyles.css';

function Alertas() {
  const [alertaVisible, setAlertaVisible] = useState(false);
  const [fechaHora, setFechaHora] = useState('2023-11-21 12:30:00');
  const [tipoAlerta, setTipoAlerta] = useState('Simulación');
  const [descripcion, setDescripcion] = useState('Simulación de alerta');

  useEffect(() => {
    // Simulación de retardo para mostrar la alerta después de un tiempo
    const delay = setTimeout(() => {
      setAlertaVisible(true);
    }, 2000);

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className='cuerpo'>
      <Navbar />
      <div>
        <Sidebar />
        <div className={`custom-content ${alertaVisible ? 'show-alert' : ''}`}>
          <div className="custom-alerta">
            <h2>Nueva Alerta</h2>
            <p>Fecha y Hora: {fechaHora}</p>
            <p>Tipo de Alerta: {tipoAlerta}</p>
            <p>Descripción: {descripcion}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Alertas;
