// Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container d-flex justify-content-between align-items-center">
        <a
          className="navbar-brand"
          href="/"
          style={{ fontSize: '1.7rem', fontWeight: 700, fontFamily: 'Roboto, sans-serif' }}
        >
          KATANYTT
        </a>
        <div >
          <a className="btn btn-outline-light me-2 margin-left" href="/login">
            Iniciar Sesión
          </a>
          <a className="btn btn-outline-light" href="/registro"  >
            Registro
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
