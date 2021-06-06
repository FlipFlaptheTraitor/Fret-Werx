import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import logo from '../../assets/images/fwLogo.png';

const Header = () => {
  let curUser;

  if (Auth.loggedIn()) {
    curUser = Auth.getProfile().data.username;
  }

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="d-flex justify-content-between position-relative">
      <div className="logo-container">
        <img src={logo} alt="Fret Werx logo on black background" />
        <Link to="/">
          <div className="logo-link"></div>
        </Link>
      </div>
      <nav className="nav-container nav navbar navbar-dark navbar-expand-lg fw-navbar">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <Link to="/" className="nav-item">Home</Link>
          <Link to="/forum" className="nav-item">Forum</Link>
        {Auth.loggedIn() ? (
            <>
              <Link to="/fret-builder" className="nav-item">Fret Builder</Link>
              <Link to={`/my-frets/${curUser}`} className="nav-item">My Frets</Link>
              <a href="/" onClick={logout} className="nav-item">
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-item">Login</Link>
              <Link to="/signup" className="nav-item">Signup</Link>
            </>
          )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;