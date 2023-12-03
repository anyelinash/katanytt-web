import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from '../../Dashboard/Navbar';
import Sidebar from '../../Dashboard/Sidebar';
import TemporizadorLuz from './TemporizadorLuz';
import '../../../Styles/luzstyles.css';

const InformacionLuz = () => {
  const [releInfo, setReleInfo] = useState({
    nombre: '',
    ubicacion: '',
    descripcion: '',
    estado: '',
  });

  const [editMode, setEditMode] = useState(false);
  const [editInfo, setEditInfo] = useState({});
  const [apiData, setApiData] = useState({});

  useEffect(() => {
    obtenerDatosRele();
  }, []);

  const obtenerDatosRele = () => {
    Axios.get('http://katanytt-api.34.73.226.103.sslip.io/iot/reles/3/')
      .then(response => {
        const { nombre, ubicacion, descripcion, status } = response.data;
        setReleInfo({ nombre, ubicacion, descripcion, estado: status ? 'Activo' : 'Inactivo' });
        setApiData({ nombre, ubicacion, descripcion, estado: status });
      })
      .catch(error => {
        console.error('Error al obtener los datos del Rele:', error);
      });
  };

  const handleEdit = () => {
    setEditInfo({ ...releInfo });
    setEditMode(true);
  };

  const handleCloseEdit = () => {
    setEditMode(false);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditInfo(prevEditInfo => ({
      ...prevEditInfo,
      [name]: value,
    }));
  };

  const handleUpdateInfo = () => {
    Axios.put('http://katanytt-api.34.73.226.103.sslip.io/iot/reles/3/', editInfo)
      .then(response => {
        setReleInfo({ ...editInfo });
        setEditMode(false);
      })
      .catch(error => {
        console.error('Error al actualizar los datos:', error);
      });
  };

  const handleEstadoChange = () => {
    Axios.get('http://katanytt-api.34.73.226.103.sslip.io/iot/reles/3/')
      .then(response => {
        const nuevoEstado = !response.data.status;

        Axios.put('http://katanytt-api.34.73.226.103.sslip.io/iot/reles/3/', {
          nombre: 'rele',
          topico: 'relay/control',
          status: nuevoEstado,
        })
          .then(response => {
            setReleInfo(prevInfo => ({
              ...prevInfo,
              estado: nuevoEstado ? 'Activo' : 'Inactivo',
            }));
          })
          .catch(error => {
            console.error('Error al cambiar el estado:', error);
          });
      })
      .catch(error => {
        console.error('Error al obtener el estado actual:', error);
      });
  };

  return (
    <div className='cuerpo'>
      <Navbar />
      <Sidebar />
      <div>
        <div className="container-fluid">
          <div className="row justify-content-center align-items-center">
            <main role="main" className="col-md-6">
              <div className="card mb-3 card-container">
                <div className="titulo card-header ">
                  <h5 className="card-title"><span className="bi bi-lightbulb"></span>{releInfo.nombre}</h5>
                </div>
                <div className="card-body-info">
                  <p>Ubicación: {releInfo.ubicacion}</p>
                  <p>Descripción: {releInfo.descripcion}</p>
                  <p>Estado: {releInfo.estado}</p>
                  <button className="btn boton" onClick={handleEdit}>
                    Editar
                  </button>
                  <button className="btn estado" onClick={handleEstadoChange}>
                    Cambiar Estado
                  </button>
                </div>
              </div>

              {editMode && (
                <div className="modal-overlay">
                  <div className="modal-container modal-dialog-scrollable">
                    <div className="modal-header">
                      <h5 className="modal-title">Editar Información</h5>
                      <button className="close" onClick={handleCloseEdit}>
                        <span>&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">
                        <label htmlFor="nombreDispositivo">Nombre del Dispositivo</label>
                        <input
                          type="text"
                          className="form-control"
                          id="nombreDispositivo"
                          name="nombre"
                          value={editInfo.nombre || ''}
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
                          value={editInfo.ubicacion || ''}
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
                          value={editInfo.descripcion || ''}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="estado">Estado</label>
                        <select
                          className="form-control"
                          id="estado"
                          name="estado"
                          value={editInfo.estado || ''}
                          onChange={handleInputChange}
                        >
                          <option value="Activo">Activo</option>
                          <option value="Inactivo">Inactivo</option>
                        </select>
                      </div>
                      <button className="btn guardar" onClick={handleUpdateInfo}>
                        Guardar Cambios
                      </button>
                    </div>
                  </div>
                </div>
              )}
              <TemporizadorLuz />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformacionLuz;
