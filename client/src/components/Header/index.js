import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import logo from '../../assets/images/fwLogo.png';



const Header = () => {

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

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
        <Link to="/">Home</Link>
          <Link to="/forum">Forum</Link>
          <Link to="/fret-builder">Fret Builder</Link>
        {Auth.loggedIn() ? (
            <>
             <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;