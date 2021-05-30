import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/fwLogo.png';


const Header = () => {
  return (
    <header className="d-flex justify-content-between position-relative logo-container">
      <div className="logo-container">
        <img src={logo} alt="Fret Werx logo on black background" />
        <Link to="/">
          <div className="logo-link"></div>
        </Link>
      </div>
      <div className="nav-container">
        <nav className="text-right">
          <Link to="/">home</Link>
          <Link to="/forum">forum</Link>
          <Link to="/fret-builder">fret builder</Link>
          <Link to="/login">login</Link>
          <Link to="/signup">signup</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;