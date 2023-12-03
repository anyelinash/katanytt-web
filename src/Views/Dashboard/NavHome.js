import React from 'react';
import '../../Styles/navbar.css';

const AppNavbar2 = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ position: 'fixed', top: 0, width: '100%', backgroundColor: '#6091AD', padding: '10px 0' }} id="navbar">
      <div>
        <div className="align-items-center">
          <span className="brand-name">Bienvenido a Katanytt</span>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar2;
