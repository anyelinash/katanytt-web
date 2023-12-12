import React from 'react';
import { Link } from 'react-router-dom';
import kataImage from '../../Images/kata.png';
import '../../Styles/sidebar.css';

const Sidebar = () => {
  return (
    <nav id="sidebar" style={{ position: 'fixed', left: 0, width: '240px', height: '100%', zIndex: 1 }}>
      <ul className="list-unstyled components">
      <img
            src={kataImage}
            width="60"
            height="60"
            className="kataya "
            alt="kata"
          />
          
          <li>
        <Link to="/homekata">
          <span className="bi bi-house"></span> Home
        </Link>
      </li>
        <li>
          <Link to="/empresas">
            <span className="bi bi-people"></span> Empresas
          </Link>
        </li>
        </ul>
      
      <div className="sidebar-header">
        <h3 style={{ fontSize: '20px' }}>Luz</h3>
      </div>
      <ul className="list-unstyled components">
        <li>
          <Link to="/informacionluz">
            <span className="bi bi-clipboard"></span> Gestionar
          </Link>
        </li>
        <li>
          <Link to="/alertasluz">
            <span className="bi bi-exclamation-lg"></span> Alertas
          </Link>
        </li>
        <li>
          <Link to="/notificacionesluz">
            <span className="bi bi-bell"></span> Notificaciones
          </Link>
        </li>
      </ul>

      <div className="sidebar-header">
        <h3 style={{ fontSize: '20px' }}>Aire</h3>
      </div>
      <ul className="list-unstyled components">
        <li>
          <Link to="/informacionaire">
            <span className="bi bi-clipboard"></span> Gestionar
          </Link>
        </li>
        <li>
          <Link to="/alertasaire">
            <span className="bi bi-exclamation-lg"></span> Alertas
          </Link>
        </li>
        <li>
          <Link to="/notificacionesluz">
            <span className="bi bi-bell"></span> Notificaciones
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
