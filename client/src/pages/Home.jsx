// import React from 'react';
import Logo from '../assets/images/client-doing-hair-cut-barber-shop-salon1.jpg';

const Home = () => {
  return (
    <div>
      <main>
        <section className="hero">
          <picture>
            <source
              srcSet={`${Logo} 100vw, ${Logo} 200vw`}
              sizes='(max-width: 600px) 100vw, 100vw'
              type='image/jpeg'
            />
            <source
              srcSet={`${Logo} 100vw, ${Logo} 200vw`}
              sizes='(max-width: 1024px) 50vw, 50vw'
              type='image/jpeg'
            />
            <img
              src={Logo}
              alt="Salon"
              className="hero-image"
            />
            
          </picture>
{/*           
          <img
            src={Logo}
            srcSet=''
            alt="Salon"
            className="hero-image"
          /> */}
          <div className="hero-text">
            <h1>Welcome to Our Salon</h1>
            <p>Experience luxury and relaxation.</p>
            <button className="hero-button">Book Now</button>
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
