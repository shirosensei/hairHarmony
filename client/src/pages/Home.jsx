// import React from 'react';
import Logo from "../assets/images/client-doing-hair-cut-barber-shop-salon1.jpg";

const Home = () => {
  return (
    <div>
      <main>
        <section className="hero">
          <picture>
            <source
              srcSet={`${Logo} 100vw, ${Logo} 200vw`}
              sizes="(max-width: 600px) 100vw, 100vw"
              type="image/jpeg"
            />
            <source
              srcSet={`${Logo} 100vw, ${Logo} 200vw`}
              sizes="(max-width: 1024px) 50vw, 50vw"
              type="image/jpeg"
            />
            <img src={Logo} alt="Salon" className="hero-image" />
          </picture>

          <div className="hero-text">
            <h1>Welcome to Our Salon</h1>
            <p>Experience luxury and relaxation.</p>
            <button className="button">Book Now</button>
          </div>
        </section>
        <section className="about">
          <div className="about-text">
            <h2>About Our Salon</h2>
            <p>
              We are a renowned salon with a focus on providing high-quality
              services and relaxation. Our team of skilled professionals is
              committed to providing you with the best possible haircut and
              styling experience.
            </p>
            <button className="button" id="about-border">Learn More</button>
          </div>
          <div className="about-image">
            <img src="path/to/salon-image.jpg" alt="Salon" />
          </div>
        </section>
        <section className="services">
          <h2>Our Services</h2>
          <div className="service-items">
            <div className="service-item">
              <img src="path/to/haircut-icon.png" alt="Haircuts" />
              <p>Haircuts</p>
            </div>
            <div className="service-item">
              <img src="path/to/spa-icon.png" alt="Spa" />
              <p>Spa Treatments</p>
            </div>
            <div className="service-item">
              <img src="path/to/facial-icon.png" alt="Facials" />
              <p>Facials</p>
            </div>
            <div className="service-item">
              <img src="path/to/massage-icon.png" alt="Massages" />
              <p>Massages</p>
            </div>
            <div className="service-item">
              <img src="path/to/color-icon.png" alt="Coloring" />
              <p>Coloring</p>
            </div>
            <div className="service-item">
              <img src="path/to/manicure-icon.png" alt="Manicures" />
              <p>Manicures</p>
            </div>
            <div className="service-item">
              <img src="path/to/pedicure-icon.png" alt="Pedicures" />
              <p>Pedicures</p>
            </div>
            <div className="service-item">
              <img src="path/to/nails-icon.png" alt="Nails" />
              <p>Nails</p>
            </div>
            <div className="service-item">
              <img src="path/to/makeup-icon.png" alt="Makeup" />
              <p>Makeup</p>
            </div>
            <div className="service-item">
              <img src="path/to/hair-care-icon.png" alt="Hair Care" />
              <p>Hair Care</p>
            </div>
            <div className="service-item">
              <img src="path/to/grooming-icon.png" alt="Grooming" />
              <p>Grooming</p>
            </div>
            <div className="service-item">
              <img
                src="path/to/hair-extensions-icon.png"
                alt="Hair Extensions"
              />
              <p>Hair Extensions</p>
            </div>
          </div>
        </section>
        <section className="staff">
          <h2>Our Staff</h2>
          <div className="staff-items">
            <div className="staff-item">
              <img src="path/to/staff-image1.jpg" alt="Staff Member" />
              <h3>Name</h3>
              <p>Position</p>
            </div>
            <div className="staff-item">
              <img src="path/to/staff-image2.jpg" alt="Staff Member" />
              <h3>Name</h3>
              <p>Position</p>
            </div>
            <div className="staff-item">
              <img src="path/to/staff-image3.jpg" alt="Staff Member" />
              <h3>Name</h3>
              <p>Position</p>
            </div>
            <div className="staff-item">
              <img src="path/to/staff-image4" alt="Staff Member" />
            </div>
            <div className="staff-item">
              <img src="path/to/staff-image5.jpg" alt="Staff Member" />
              <h3>Name</h3>
              <p>Position</p>
            </div>
          </div>
        </section>
        <section className="testimonials">
          <h2>Testimonials</h2>
          <div className="testimonial-items">
            <div className="testimonial-item">
              <img src="path/to/client-image1.jpg" alt="Client" />
              <p>
                &quot;I&apos;ve always been amazed by the quality of the
                haircuts I&apos;ve received at H&H Salon. They are always gentle
                and professional, and I&apos;m grateful for the opportunity to
                work with them.&quot;
              </p>
              <h3>Client Name</h3>
            </div>
            <div className="testimonial-item">
              <img src="path/to/client-image2.jpg" alt="Client" />
              <p>
                &quot;I&apos;ve always been amazed by the quality of the
                haircuts I&apos;ve received at H&H Salon. They are always gentle
                and professional, and I&apos;m grateful for the opportunity to
                work with them.&quot;
              </p>
              <h3>Client Name</h3>
            </div>
            <div className="testimonial-item">
              <img src="path/to/client-image3.jpg" alt="Client" />
              <p>
                &quot;I&apos;ve always been amazed by the quality of the
                haircuts I&apos;ve received at H&H Salon. They are always gentle
                and professional, and I&apos;m grateful for the opportunity to
                work with them.&quot;
              </p>
              <h3>Client Name</h3>
            </div>
          </div>
        </section>
        <section className="contact-info">
          <h2>Contact Info</h2>
          <div className="contact-item">
            <img src="path/to/location-icon.png" alt="Location" />
            <p>123 Main St, City, State, ZIP</p>
          </div>
          <div className="contact-item">
            <img src="path/to/phone-icon.png" alt="Phone" />
            <p>123-456-7890</p>
          </div>
          <div className="contact-item">
            <img src="path/to/email-icon.png" alt="Email" />
            <p>info@salon.com</p>
          </div>
          <div className="contact-item">
            <img src="path/to/opening-hours-icon.png" alt="Opening Hours" />
            <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
          </div>
        
        </section>
      </main>
      <footer className="footer">
        <p>&copy; 2024 H&H Salon. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
