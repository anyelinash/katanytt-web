import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signupImage from '../../Images/signup.svg';

function Signup() {
  const [nombre, setNombre] = useState('');
  const [dni, setDNI] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    const confirmRegistration = window.confirm('¿Estás seguro de registrarte?');

    if (!confirmRegistration) {
      return;
    }

    try {
      const response = await fetch('https://api.katayaku.xyz/v1/users/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          dni,
          telefono,
          email,
          password,
          confirmPassword,
        }),
      });

      if (response.ok) {
        console.log('Registro exitoso');
        navigate('/homepage'); // Redirigir a la página de inicio después de un registro exitoso
      } else {
        console.error('Error en el registro');
      }
    } catch (error) {
      console.error('Error en la llamada a la API', error);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area" style={{ maxWidth: '1000px', height: '600px' }}>
        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box" style={{ background: '#89bbcb' }}>
          <div className="featured-image mb-3">
            <img src={signupImage} className="img-fluid" style={{ width: '350px' }} alt="Entrena" />
          </div>
          <p className="text-white fs-2" style={{ fontFamily: 'Courier New', fontWeight: 600 }}>
            REGÍSTRATE
          </p>
        </div>

        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <div className="header-text mb-4 text-center">
              <h2>KATAYAKU</h2>
              <p>Únete a nuestra comunidad</p>
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="DNI"
                value={dni}
                onChange={(e) => setDNI(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Confirmar Contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <button className="btn btn-lg btn-dark w-100 fs-6" onClick={handleSignup}>
                Registrarse
              </button>
            </div>
            <div className="row">
              <small>
                ¿Ya tienes una cuenta? &nbsp; &nbsp;
                <a href="/login" className="link-secondary">
                  Iniciar Sesión
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
