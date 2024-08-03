import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./assets/css/App.css";

const App = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  const handleNavClose = () => {
    setIsNavOpen(false);
  };
  return (
    <div>
      <header className="header">
        <div className="logo">
          <h4>H&H</h4>
        </div>
        <nav className="navbar">
          <button className="nav-toggle" onClick={handleNavToggle}>
            ☰
          </button>
          <ul className={`nav-links ${isNavOpen ? "show" : ""}`}>
            <li>
              <Link to="/" className="link" onClick={() => handleNavClose(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="link" onClick={() => handleNavClose(false)}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/booking" className="link" onClick={() => handleNavClose(false)}>
                Book Now
              </Link>
            </li>
            <li>
              <Link to="/staff" className="link" onClick={() => handleNavClose(false)}>
                About Us
              </Link>
            </li>
            {/* <li>
              <Link to="/admin" className="link" onClick={() => handleNavClose(false)}>
                Admin
              </Link>
            </li> */}
          </ul>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
