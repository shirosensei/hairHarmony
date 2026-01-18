import React from "react";
import "../assets/css/footer.css";

const Footer = () => {
  return (
    <div className="site-footer">
      <footer className="footer-container">
        <div className="footer-grid">
          {/* Hours */}
          <div className="footer-section">
            <h3 className="footer-heading">Business Hours</h3>
            <p className="footer-text">Monday - Friday: 9am - 8pm</p>
            <p className="footer-text">Saturday: 9am - 6pm</p>
            <p className="footer-text">Sunday: 10am - 5pm</p>
          </div>

          {/* Contact  */}
          <div className="footer-section">
            <h3 className="footer-heading">Contact Us</h3>
            <p className="footer-text">123 Main Street</p>
            <p className="footer-text">New York, NY 10001</p>
            <p className="footer-text">Phone: (448) 190-7890</p>
            <p className="footer-text">Email: info@hairharmony.com</p>
          </div>

          {/* Social Media */}
          <div className="footer-section">
            <h3 className="footer-heading">Follow Us</h3>
            <p className="footer-text">Instagram: @hairharmony</p>
            <p className="footer-text">Facebook: Hair Harmony Salon</p>
            <p className="footer-text">Twitter: @hairharmony</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; 2026 Hair Harmony Salon. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
