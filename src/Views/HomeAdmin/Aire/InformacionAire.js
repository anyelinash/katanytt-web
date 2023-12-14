import React, { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import Sidebar2 from '../../Components/Sidebar';
import '../../../Styles/luzstyles.css';

const InformacionLuz = () => {
  const [sensorInfo, setSensorInfo] = useState({
    nombre: '',
    descripcion: '',
    ubicacion: '',
    estado: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [editInfo, setEditInfo] = useState({ ...sensorInfo });

  useEffect(() => {
    // Solicitud a la API para obtener la información del sensor
    fetch('http://katanytt-api.34.73.226.103.sslip.io/iot/modulo/7')
      .then(response => response.json())
      .then(data => {
        const { nombre, descripcion, ubicacion, estado } = data;
        setSensorInfo({ nombre, descripcion, ubicacion, estado });
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
                <p>Nombre: {sensorInfo.nombre}</p>
                <p>Descripción: {sensorInfo.descripcion}</p>
                <p>Ubicación: {sensorInfo.ubicacion}</p>
                <p>Estado: {sensorInfo.estado}</p>
                <button className="btn boton" onClick={handleEdit}>
                  Gestionar
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
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      value={editInfo.nombre}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <input
                      type="text"
                      className="form-control"
                      id="descripcion"
                      name="descripcion"
                      value={editInfo.descripcion}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="ubicacion">Ubicación</label>
                    <input
                      type="text"
                      className="form-control"
                      id="ubicacion"
                      name="ubicacion"
                      value={editInfo.ubicacion}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="estado">Estado</label>
                    <input
                      type="text"
                      className="form-control"
                      id="estado"
                      name="estado"
                      value={editInfo.estado}
                      onChange={handleInputChange}
                    />
                  </div>
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
