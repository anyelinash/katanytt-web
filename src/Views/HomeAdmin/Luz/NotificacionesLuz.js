import React, { useState, useEffect } from 'react';
import Navbar from '../../Dashboard/Navbar';
import Sidebar from '../../Dashboard/Sidebar';
import '../../../Styles/luzstyles.css';

function Notificaciones() {
  const [notificacionVisible, setNotificacionVisible] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const nuevaNotificacion = {
      id: Date.now(),
      mensaje: 'Nueva notificación',
      fechaHora: new Date(),
      descripcion: 'Descripción de la notificación',
    };

    setFormattedDate(
      `${nuevaNotificacion.fechaHora.toLocaleDateString()} ${nuevaNotificacion.fechaHora.toLocaleTimeString()}`
    );

    // Simulación de retardo para mostrar la notificación después de un tiempo
    const delay = setTimeout(() => {
      setNotificacionVisible(true);
    }, 2000);

    // Limpia el temporizador al desmontar el componente
    return () => clearTimeout(delay);
  }, []);

  return (
    <div className='cuerpo'>
      <Navbar />
      <Sidebar />
      <div className={`custom-notificaciones-content ${notificacionVisible ? 'show-custom-notificacion' : ''}`}>
        <div className="custom-notificacion">
          <div className="notificacion-info">
            <p className="notificacion-fecha-hora">{formattedDate}</p>
            <p className="notificacion-descripcion">Descripción de la notificación</p>
          </div>
          <div className="notificacion-mensaje">Nueva notificación</div>
        </div>
      </div>
    </div>
  );
}

export default Notificaciones;
