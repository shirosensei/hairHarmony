import hairHarmony from "../assets/images/hairHarmony.svg";
import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "../assets/css/App.css";

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const handleNavClose = () => {
    setIsNavOpen(false);
  };

  return (
    <React.Fragment>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img src={hairHarmony} alt="HairHarmony Logo" />
          </Link>
        </div>
        <nav className="navbar">
          <button
            className="nav-toggle"
            onClick={handleNavToggle}
            aria-label="Open menu"
          >
            ☰
          </button>

          <button
            onClick={handleNavClose}
            aria-label="Close menu"
            className={`nav-toggle-close ${isNavOpen ? "active" : ""}`}
          >
            <span className="line line1"></span>
            <span className="line line2"></span>
          </button>

          <>
            <ul className={`nav-links ${isNavOpen ? "show active" : ""}`}>
              <li>
                <Link
                  to="/"
                  className="link"
                  onClick={() => handleNavClose(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="link"
                  onClick={() => handleNavClose(false)}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/booking"
                  className="link"
                  onClick={() => handleNavClose(false)}
                >
                  Book Now
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="link"
                  onClick={() => handleNavClose(false)}
                >
                  About Us
                </Link>
              </li>
              {/* <li>
      <Link to="/admin" className="link" onClick={() => handleNavClose(false)}>
        Admin
      </Link>
    </li> */}
            </ul>
          </>
          {/* )} */}
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
    </React.Fragment>
  );
};

export default Navbar;
