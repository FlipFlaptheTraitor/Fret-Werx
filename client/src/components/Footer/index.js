import React from 'react';
import logo from '../../assets/images/fwLogo2.png';
import "./style.css";

const Footer = () => {
  return (
    <footer className="w-100 mt-auto">
      <div className="container d-flex footer-info">
        <div className="col-lg footer-1" id="about-us">
          <h3>About Us</h3>
          <p>
          Here at Fret Werx, we are a dedicated team of creatives and coders with a passion for music and individuality.  Our goal is to provide an easy and intuitive experience so that anyone can release their inner creativity based on the world’s greatest instrument, the guitar :)
          </p>
        </div>
        <div className="col-lg footer-2">
          <img src={logo} alt="Fret Werx logo on maroon background" />
        </div>
        <div className="col-lg footer-3">
          <form id="ask">
            <h3>Questions? Ask us here!</h3>
            <input
              className="form-input"
              placeholder="Your name"
              name="name"
            />
            <input
              className="form-input"
              placeholder="Your email"
              name="email"
              type="email"
            />
            <textarea
              className="form-input"
              placeholder="Your message:"
              name="description"
            />
            <button className="btn d-block w-100" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="container-fluid w-100 d-flex justify-content-between align-items-center bottom-footer">
        <div className="container w-50">&copy;2021 by WRP</div>
        <div className="container w-50 d-flex justify-content-between align-items-center">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-twitter"></i>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
