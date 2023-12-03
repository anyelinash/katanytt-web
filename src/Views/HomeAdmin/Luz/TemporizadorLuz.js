import React, { useState, useEffect } from 'react';
import '../../../Styles/luzstyles.css';

const TemporizadorLuz = () => {
  const [tempInicio, setTempInicio] = useState('');
  const [tempFin, setTempFin] = useState('');
  const [accion, setAccion] = useState('Desactivado');
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    fetch('http://xswo8cg.34.148.253.125.sslip.io/iot/temporizadores')
      .then((response) => response.json())
      .then((data) => {
        setTempInicio(data.temp_inicio);
        setTempFin(data.temp_fin);
        setAccion(data.accion);
      })
      .catch((error) => {
        console.error('Error al obtener los datos del temporizador:', error);
      });
  }, []);

  const handleGuardar = () => {
    setEditando(false);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-9 d-flex justify-content-center align-items-center">
            <div className="card custom-temporizador-card">
              <div className="card-body">
                <h5 className="card-title"><span className="bi bi-stopwatch"></span>Temporizador</h5>
                <form>
                  <div className="mb-3">
                    <label htmlFor="formTempInicio" className="form-label">
                      Inicio
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="formTempInicio"
                      value={tempInicio}
                      onChange={(e) => setTempInicio(e.target.value)}
                      disabled={!editando}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="formTempFin" className="form-label">
                      Fin
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="formTempFin"
                      value={tempFin}
                      onChange={(e) => setTempFin(e.target.value)}
                      disabled={!editando}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="formAccion" className="form-label">
                      Accion
                    </label>
                    <select
                      className="form-select"
                      id="formAccion"
                      value={accion}
                      onChange={(e) => setAccion(e.target.value)}
                      disabled={!editando}
                    >
                      <option value="Desactivado">Desactivado</option>
                      <option value="Activado">Activado</option>
                    </select>
                  </div>
                </form>
                {!editando ? (
                  <button type="button" className="btn edit" onClick={() => setEditando(true)}>
                    Editar
                  </button>
                ) : (
                  <button type="button" className="btn temp" onClick={handleGuardar}>
                    Guardar
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TemporizadorLuz;
