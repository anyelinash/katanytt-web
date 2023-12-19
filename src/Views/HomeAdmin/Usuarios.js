import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from '../Components/Navbar';
import Sidebar from '../Components/Sidebar';
import '../../Styles/tablas.css';

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    provider_id: '',
    nombre: '',
    dni: '',
    correo: '',
    contrasena: '',
    photo_url: '',
  });
  const [busqueda, setBusqueda] = useState('');
  const [modalAgregar, setModalAgregar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  // Método para obtener usuarios utilizando el método GET (funciona)
  const obtenerUsuarios = async () => {
    try {
      const response = await Axios.get('https://api.katayaku.xyz/v1/users/usuarios');
      if (response.status === 200) {
        setUsuarios(response.data);
      } else {
        console.error('Error al obtener la lista de usuarios. Respuesta del servidor:', response);
      }
    } catch (error) {
      console.error('Error al obtener la lista de usuarios', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  // Método para agregar un nuevo usuario utilizando el método POST
  const handleAgregarUsuario = async () => {
    try {
      const response = await Axios.post('https://api.katayaku.xyz/v1/users/usuarios', nuevoUsuario);
      if (response.status === 201) {
        console.log('Usuario agregado correctamente');
        obtenerUsuarios();
        // Limpiar el formulario después de agregar un usuario
        setNuevoUsuario({
          provider_id: '',
          nombre: '',
          dni: '',
          correo: '',
          contrasena: '',
          photo_url: '',
        });
        setModalAgregar(false);
      } else {
        console.error('Error al agregar usuario. Respuesta del servidor:', response);
      }
    } catch (error) {
      console.error('Error al agregar usuario', error);
    }
  };

  // Método para buscar usuarios utilizando el método GET (funciona)
  const handleBuscarUsuario = async () => {
    try {
      const response = await Axios.get('https://api.katayaku.xyz/v1/users/usuarios');
      if (response.status === 200) {
        const usuariosFiltrados = response.data.filter(
          (usuario) =>
            usuario.provider_id.toLowerCase().includes(busqueda.toLowerCase()) ||
            usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            usuario.dni.toLowerCase().includes(busqueda.toLowerCase()) ||
            usuario.correo.toLowerCase().includes(busqueda.toLowerCase()) ||
            (usuario.photo_url && usuario.photo_url.toLowerCase().includes(busqueda.toLowerCase()))
        );
        setUsuarios(usuariosFiltrados);
      } else {
        console.error('Error al buscar usuarios. Respuesta del servidor:', response);
      }
    } catch (error) {
      console.error('Error al buscar usuarios', error);
    }
  };

  // Método para eliminar un usuario utilizando el método DELETE (funciona)
  const handleEliminarUsuario = async (id) => {
    // Mostrar un cuadro de diálogo de confirmación antes de eliminar
    const confirmacion = window.confirm('¿Está seguro de querer eliminar este usuario?');

    if (confirmacion) {
      try {
        const response = await Axios.delete(`https://api.katayaku.xyz/v1/users/usuario/${id}`);
        if (response.status === 204) {
          console.log('Usuario eliminado correctamente');
          obtenerUsuarios();
        } else {
          console.error('Error al eliminar usuario. Respuesta del servidor:', response);
        }
      } catch (error) {
        console.error('Error al eliminar usuario', error);
      }
    }
  };

  // Método para cerrar el modal de edición
  const handleCloseEdit = () => {
    setModalAgregar(false);
    setUsuarioSeleccionado(null);
    setNuevoUsuario({
      provider_id: '',
      nombre: '',
      dni: '',
      correo: '',
      contrasena: '',
      photo_url: '',
    });
  };

  // Método para editar un usuario utilizando el método PUT
  const handleEditarUsuario = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setNuevoUsuario({
      provider_id: usuario.provider_id,
      nombre: usuario.nombre,
      dni: usuario.dni,
      correo: usuario.correo,
      contrasena: usuario.contrasena || '',
      photo_url: usuario.photo_url || '',
    });
    setModalAgregar(true);
  };

  // Método para guardar cambios en un usuario utilizando el método PUT
  const handleGuardarCambios = async () => {
    try {
      const response = await Axios.put(
        `https://api.katayaku.xyz/v1/users/usuario/${usuarioSeleccionado.codigo_usu}`,
        {
          provider_id: nuevoUsuario.provider_id,
          nombre: nuevoUsuario.nombre,
          dni: nuevoUsuario.dni,
          correo: nuevoUsuario.correo,
          contrasena: nuevoUsuario.contrasena || '',
          photo_url: nuevoUsuario.photo_url || '',
        }
      );

      if (response.status === 200) {
        console.log('Cambios guardados correctamente');
        obtenerUsuarios();
        setModalAgregar(false);
        setUsuarioSeleccionado(null);
        setNuevoUsuario({
          provider_id: '',
          nombre: '',
          dni: '',
          correo: '',
          contrasena: '',
          photo_url: '',
        });
      } else {
        console.error('Error al guardar cambios. Respuesta del servidor:', response);
      }
    } catch (error) {
      console.error('Error al guardar cambios', error);
    }
  };

  // Método para renderizar la lista de usuarios
  const renderUsuarios = () => {
    if (!Array.isArray(usuarios)) {
      console.error('La lista de usuarios no es un array:', usuarios);
      return null;
    }

    return usuarios.map((usuario) => (
      <tr key={usuario.codigo_usu}>
        <td>{usuario.provider_id}</td>
        <td>{usuario.nombre}</td>
        <td>{usuario.dni}</td>
        <td>{usuario.correo}</td>
        <td>
          {usuario.photo_url && (
            <img
              src={usuario.photo_url}
              alt={`Foto de ${usuario.nombre}`}
              style={{ maxWidth: '50px', maxHeight: '50px' }}
            />
          )}
        </td>
        <td>
          <button className="btn btn-edit" onClick={() => handleEditarUsuario(usuario)}>
            Editar
          </button>
          <button className="btn btn-delete" onClick={() => handleEliminarUsuario(usuario.codigo_usu)}>
            Eliminar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div className='cuerpo'>
      <Navbar />
      <Sidebar />
      <div className="usuario">
        <h1>Lista de Usuarios</h1>
        <div className="search-container">
          <input
            className="search-input"
            type="text"
            placeholder="Buscar usuarios..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="btn btn-buscar" onClick={handleBuscarUsuario}>
            Buscar
          </button>
          <button className="btn btn-agregar" onClick={() => setModalAgregar(true)}>
            Agregar Usuario
          </button>
        </div>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuarios</th>
                <th>DNI</th>
                <th>Correo</th>
                <th>Foto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>{renderUsuarios()}</tbody>
          </table>
        </div>
      </div>

      {modalAgregar && (
        <div className="modal-overlay">
          <div className="modal-container modal-dialog-scrollable">
            <div className="modal-header">
              <h5 className="modal-title">{usuarioSeleccionado ? 'Editar Usuario' : 'Agregar Usuario'}</h5>
              <button className="cclose" onClick={handleCloseEdit}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="provider_id">ID:</label>
                <input
                  type="text"
                  className="form-control"
                  id="provider_id"
                  name="provider_id"
                  value={nuevoUsuario.provider_id}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nombre">Usuario:</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  value={nuevoUsuario.nombre}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="dni">DNI:</label>
                <input
                  type="text"
                  className="form-control"
                  id="dni"
                  name="dni"
                  value={nuevoUsuario.dni}
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
                  value={nuevoUsuario.correo}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="photo_url">Foto:</label>
                <input
                  type="url"
                  className="form-control"
                  id="photo_url"
                  name="photo_url"
                  value={nuevoUsuario.photo_url}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <button
              type="button"
              className="btn guardarr"
              onClick={usuarioSeleccionado ? handleGuardarCambios : handleAgregarUsuario}
            >
              {usuarioSeleccionado ? 'Guardar Cambios' : 'Agregar Usuario'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Usuario;