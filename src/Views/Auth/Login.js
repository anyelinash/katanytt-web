import React, { useState } from "react";
import loginImage from "../../Images/login.svg";
import { loginUsuario } from "../../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      // Utiliza la función loginUsuario para iniciar sesión
      const token = await loginUsuario({ correo: email, password });

      console.log("Token de autenticación:", token);

      if (token) {
        // Si se obtiene un token, puedes manejar la autenticación y redirección aquí
        // Por ejemplo, puedes almacenar el token en el contexto de autenticación o en el estado
        // y redirigir al usuario a la página de menú
        console.log("Inicio de sesión automático exitoso");
        // Aquí puedes agregar la lógica para redirigir al usuario a la página de menú
        // Por ejemplo, puedes utilizar el enrutador de tu aplicación (react-router-dom) para hacer esto
        history.push('/homepage'); // Asegúrate de tener acceso a la historia de la navegación
      } else {
        console.log("Credenciales inválidas");
        // Aquí puedes manejar el caso en el que las credenciales no son válidas
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      // Aquí puedes manejar otros errores relacionados con la autenticación
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="row border rounded-5 p-3 bg-white shadow box-area"
        style={{ maxWidth: "1000px", height: "500px" }}
      >
        <div
          className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
          style={{ background: "#89bbcb" }}
        >
          <div className="featured-image mb-3">
            <img
              src={loginImage}
              className="img-fluid"
              style={{ width: "350px" }}
              alt="Entrena"
            />
          </div>
          <p
            className="text-white fs-2"
            style={{ fontFamily: "Courier New", fontWeight: 600 }}
          >
            BIENVENIDO
          </p>
        </div>
        <div className="col-md-6 right-box">
          <div className="row align-items-center">
            <div className="header-text mb-4 text-center">
              <h2>KATAYAKU</h2>
              <p>Estamos encantados de verte otra vez</p>
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
            <div className="input-group mb-1">
              <input
                type="password"
                className="form-control form-control-lg bg-light fs-6"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-group mb-5 d-flex justify-content-between">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="formCheck"
                />
                <label
                  htmlFor="formCheck"
                  className="form-check-label text-secondary"
                >
                  <small>Recuerdame</small>
                </label>
              </div>
              <div className="forgot">
                <small>
                  <a href="/" className="link-dark">
                    ¿Olvidaste tu contraseña?
                  </a>
                </small>
              </div>
            </div>
            <div className="input-group mb-3">
              <button
                className="btn btn-lg btn-dark w-100 fs-6"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
            <div className="row">
              <small>
                No tienes una cuenta &nbsp; &nbsp;
                <a href="/signup" className="link-secondary">
                  Crear Cuenta
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
