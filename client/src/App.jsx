import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "./App.css";

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
          <h1>H&H</h1>
        </div>
        <nav className="navbar">
          <button className="nav-toggle" onClick={handleNavToggle}>
            ☰
          </button>
          <ul className={`nav-links ${isNavOpen ? "show" : ""}`}>
            <li>
              <Link to="/" onClick={() => handleNavClose(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" onClick={() => handleNavClose(false)}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/booking" onClick={() => handleNavClose(false)}>
                Book Now
              </Link>
            </li>
            <li>
              <Link to="/staff" onClick={() => handleNavClose(false)}>
                About Us
              </Link>
            </li>
            <li>
              <Link to="/admin" onClick={() => handleNavClose(false)}>
                Admin
              </Link>
            </li>
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
