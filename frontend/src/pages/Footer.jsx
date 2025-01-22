import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer__section">
      <footer className="footer">
        <div className="footer__container__logo">
          {/* <img
            src=""
            alt="image Logo"
            width="100%"
            height="100%"
            className="container__image"
          /> */}
        </div>

        <div className="container__button">
          <button className="button">BOOK APPOINTMENT</button>
        </div>

        <div className="container__socials">
          <div className="container__socials_icons">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icons_footer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="icons_footer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className="container__address">
          <h4 className="container__address_header">Find us here</h4>
          <p className="address">
            1092 Newsoro Blvd Suite K, New England, LA, 20021
          </p>
          <div className="container__contacts">
          <small>
            <a href="mailto:hairharmony@gmail.com">hairharmony@gmail.com</a>
          </small> &nbsp;| <a href="tel:+9028322336">(902) 832- 2336</a>
        </div>
        </div>

      

        <hr className="container__line"></hr>
        <p className="container_paragraph">&copy; 2019 - 2024. All rights reserved - H&H Salon.</p>
      </footer>
    </div>
  );
};

export default Footer;
