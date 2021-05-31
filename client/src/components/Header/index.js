import React,{Component} from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/images/fwLogo.png';



class Header extends Component {
  constructor(props){
    super(props)
  
  this.state ={
    isLoggedIn: true
  }
  }
  render(){
    if (this.state.isLoggedIn){
      return(
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
        </nav>
      </div>
    </header>
      )
    } else{
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
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </nav>
      </div>
    </header>
  );
  };
};
};

export default Header;