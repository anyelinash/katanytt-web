import React, { useState, useEffect } from 'react';
import Navbar from '../../Dashboard/Navbar';
import Sidebar2 from '../../Dashboard/Sidebar';
import '../../../Styles/luzstyles.css';

const InformacionLuz = () => {
  const [sensorInfo, setSensorInfo] = useState({
    fechaHora: '',
    calidadAire: '',
    monoxidoCarbono: 0,
    amoniaco: 0,
    alerta: '',
    largoPlazo: 0,
  });

  const [editMode, setEditMode] = useState(false);
  const [editInfo, setEditInfo] = useState({ ...sensorInfo });

  useEffect(() => {
    // Solicitud a la API para obtener la información del sensor
    fetch('http://katanytt-api.34.73.226.103.sslip.io/iot/modulo/7')
      .then(response => response.json())
      .then(data => {
        const { fechaHora, calidadAire, monoxidoCarbono, amoniaco, alerta, largoPlazo } = data;
        setSensorInfo({ fechaHora, calidadAire, monoxidoCarbono, amoniaco, alerta, largoPlazo });
      })
      .catch(error => {
        console.error('Error al obtener los datos del sensor:', error);
      });
  }, []);

  const handleEdit = () => {
    setEditInfo({ ...sensorInfo });
    setEditMode(true);
  };

  const handleCloseEdit = () => {
    setEditMode(false);
  };

  const handleUpdateInfo = () => {
    // Actualización de la información en la API
    fetch('http://127.0.0.1:8000/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editInfo),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Datos actualizados con éxito:', data);
      })
      .catch(error => {
        console.error('Error al actualizar los datos:', error);
      });

    setSensorInfo({ ...editInfo });
    setEditMode(false);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditInfo(prevInfo => ({ ...prevInfo, [name]: value }));
  };

  return (
    <div className='cuerpo'>
      <Navbar />
      <Sidebar2 />
      <div className="container-fluid">
        <div className="row justify-content-center align-items-center">
          <main role="main" className="col-md-6">
            <div className="card mb-3 card-container">
              <div className=" titulo card-header ">
                <h5 className="card-title">Información del Sensor</h5>
              </div>
              <div className="card-body-info">
                <p>Fecha y Hora: {sensorInfo.fechaHora}</p>
                <p>Calidad de Aire: {sensorInfo.calidadAire}</p>
                <p>Monóxido de Carbono: {sensorInfo.monoxidoCarbono}</p>
                <p>Amoniaco: {sensorInfo.amoniaco}</p>
                <p>Alerta: {sensorInfo.alerta}</p>
                <p>Largo Plazo: {sensorInfo.largoPlazo}</p>
                <button className="btn boton" onClick={handleEdit}>
                  Editar
                </button>
              </div>
            </div>

            {editMode && (
              <div className="card floating-card">
                <div className="card-header">
                  <h5 className="card-title">Editar Información</h5>
                  <button className="close" onClick={handleCloseEdit}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="card-body">
                  {/* ... (Your existing form fields) */}
                  <div className="form-group">
                    <label htmlFor="fechaHora">Fecha y Hora</label>
                    <input
                      type="text"
                      className="form-control"
                      id="fechaHora"
                      name="fechaHora"
                      value={editInfo.fechaHora}
                      onChange={handleInputChange}
                    />
                  </div>
                  {/* ... (Other form fields) */}
                  <button className="btn btn-success" onClick={handleUpdateInfo}>
                    Guardar Cambios
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default InformacionLuz;
