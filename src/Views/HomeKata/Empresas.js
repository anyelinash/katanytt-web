import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from '../Components/Navbar';
import Sidebark from '../Components/Sidebark';
import '../../Styles/tablas.css';

const Empresas = () => {
  const [empresas, setEmpresas] = useState([]);
  const [nuevaEmpresa, setNuevaEmpresa] = useState({
    codigo_usu: '',
    nombre: '',
    ruc: '',
    correo: '',
  });
  const [busqueda, setBusqueda] = useState('');
  const [modalAgregar, setModalAgregar] = useState(false);
  const [empresaSeleccionada, setEmpresaSeleccionada] = useState(null);

  useEffect(() => {
    obtenerEmpresas();
  }, []);

  // Método para obtener usuarios utilizando el método GET (funciona)
  const obtenerEmpresas = async () => {
    try {
      const response = await Axios.get('https://api.katayaku.xyz/v1/users/empresas');
      if (response.status === 200) {
        setEmpresas(response.data);
      } else {
        console.error('Error al obtener la lista de empresas. Respuesta del servidor:', response);
      }
    } catch (error) {
      console.error('Error al obtener la lista de empresas', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaEmpresa((prevEmpresa) => ({
      ...prevEmpresa,
      [name]: value,
    }));
  };

  const handleAgregarEmpresa = async () => {
    try {
      const response = await Axios.post('https://api.katayaku.xyz/v1/users/empresas', nuevaEmpresa);
      if (response.status === 201) {
        console.log('Empresa agregada correctamente');
        obtenerEmpresas();
        setNuevaEmpresa({
          codigo_usu: '',
          nombre: '',
          ruc: '',
          correo: '',
        });
        setModalAgregar(false);
      } else {
        console.error('Error al agregar empresa. Respuesta del servidor:', response);
      }
    } catch (error) {
      console.error('Error al agregar empresa', error);
    }
  };

// Método para buscar empresas utilizando el método GET (funciona)
  const handleBuscarEmpresa = async () => {
    try {
      const response = await Axios.get('https://api.katayaku.xyz/v1/users/empresas');
      if (response.status === 200) {
        const empresasFiltradas = response.data.filter(
          (empresa) =>
            empresa.codigo_usu.toLowerCase().includes(busqueda.toLowerCase()) ||
            empresa.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            empresa.ruc.toLowerCase().includes(busqueda.toLowerCase()) ||
            empresa.correo.toLowerCase().includes(busqueda.toLowerCase())
        );
        setEmpresas(empresasFiltradas);
      } else {
        console.error('Error al buscar empresas. Respuesta del servidor:', response);
      }
    } catch (error) {
      console.error('Error al buscar empresas', error);
    }
  };

  // Método para eliminar un usuario utilizando el método DELETE (funciona)
  const handleEliminarEmpresa = async (id) => {
    try {
      const response = await Axios.delete(`https://api.katayaku.xyz/v1/users/empresa/${id}`);
      if (response.status === 204) {
        console.log('Empresa eliminada correctamente');
        obtenerEmpresas();
      } else {
        console.error('Error al eliminar empresa. Respuesta del servidor:', response);
      }
    } catch (error) {
      console.error('Error al eliminar empresa', error);
    }
  };

  const handleCloseEdit = () => {
    setModalAgregar(false);
    setEmpresaSeleccionada(null);
    setNuevaEmpresa({
      codigo_usu: '',
      nombre: '',
      ruc: '',
      correo: '',
    });
  };

  const handleEditarEmpresa = (empresa) => {
    setEmpresaSeleccionada(empresa);
    setNuevaEmpresa({
      codigo_usu: empresa.codigo_usu,
      nombre: empresa.nombre,
      ruc: empresa.ruc,
      correo: empresa.correo,
    });
    setModalAgregar(true);
  };

  const handleGuardarCambios = async () => {
    try {
      const response = await Axios.put(
        `https://api.katayaku.xyz/v1/users/empresas/${empresaSeleccionada.codigo_usu}`,
        {
          codigo_usu: nuevaEmpresa.codigo_usu,
          nombre: nuevaEmpresa.nombre,
          ruc: nuevaEmpresa.ruc,
          correo: nuevaEmpresa.correo,
        }
      );

      if (response.status === 200) {
        console.log('Cambios guardados correctamente');
        obtenerEmpresas();
        setModalAgregar(false);
        setEmpresaSeleccionada(null);
        setNuevaEmpresa({
          codigo_usu: '',
          nombre: '',
          ruc: '',
          correo: '',
        });
      } else {
        console.error('Error al guardar cambios. Respuesta del servidor:', response);
      }
    } catch (error) {
      console.error('Error al guardar cambios', error);
    }
  };

  const renderEmpresas = () => {
    if (!Array.isArray(empresas)) {
      console.error('La lista de empresas no es un array:', empresas);
      return null;
    }

    return empresas.map((empresa) => (
      <tr key={empresa.codigo_usu}>
        <td>{empresa.codigo_usu}</td>
        <td>{empresa.nombre}</td>
        <td>{empresa.ruc}</td>
        <td>{empresa.correo}</td>
        <td>
          <button className="btn btn-edit" onClick={() => handleEditarEmpresa(empresa)}>
            Editar
          </button>
          <button className="btn btn-delete" onClick={() => handleEliminarEmpresa(empresa.codigo_usu)}>
            Eliminar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className='cuerpo'>
      <Navbar />
      <Sidebark />
      <div className="empresa">
        <h1>Lista de Empresas</h1>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Buscar empresas..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="btn btn-buscar" onClick={handleBuscarEmpresa}>
            Buscar
          </button>
          <button className="btn btn-agregar" onClick={() => setModalAgregar(true)}>
            Agregar Empresa
          </button>
        </div>
        <div className="table-container"  >
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>RUC</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{renderEmpresas()}</tbody>
          </table>
        </div>
      </div>

      {modalAgregar && (
        <div className="modal-overlay">
          <div className="modal-container modal-dialog-scrollable">
            <div className="modal-header">
              <h5 className="modal-title">{empresaSeleccionada ? 'Editar Empresa' : 'Agregar Empresa'}</h5>
              <button className="cclose" onClick={handleCloseEdit}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="codigo_usu">ID:</label>
                <input
                  type="text"
                  className="form-control"
                  id="codigo_usu"
                  name="codigo_usu"
                  value={nuevaEmpresa.codigo_usu}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={nuevaEmpresa.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ruc">RUC:</label>
                <input
                  type="text"
                  className="form-control"
                  id="ruc"
                  name="ruc"
                  value={nuevaEmpresa.ruc}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="correo">Correo:</label>
                <input
                  type="email"
                  className="form-control"
                  id="correo"
                  name="correo"
                  value={nuevaEmpresa.correo}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button
              type="button"
              className="btn guardarr"
              onClick={empresaSeleccionada ? handleGuardarCambios : handleAgregarEmpresa}
            >
              {empresaSeleccionada ? 'Guardar Cambios' : 'Agregar Empresa'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empresas;