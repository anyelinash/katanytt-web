import React from 'react';
import '../../Styles/navbar.css';

const AppNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" id="navbar">
      <div className="container-fluid">
        <div className="d-flex align-items-center">
          <span className="brand-name">KATAYAKU</span>
        </div>
        <div >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <form className="d-flex custom-search-form">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Buscar"
                  style={{ width: '300px' }}
                  aria-label="Search"
                />
                <button className="btn btn-outline-light" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </form>
            </li>
            <li className="nav-item">
              <button className="btn btn-light nbutton">
                <i className="bi bi-bell"></i>
              </button>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Perfil
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Mi Perfil <i className="bi bi-person"></i>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Configuración <i className="bi bi-gear"></i>
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Cerrar Sesión <i className="bi bi-box-arrow-right"></i>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
