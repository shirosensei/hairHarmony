// import React from 'react'
import Logo from "../assets/images/client-doing-hair-cut-barber-shop-salon.jpg";
const Services = () => {
  return (
    <section className="services">
      <h2>Our Services</h2>
      <div className="services-list">
        <div className="service-item">
          <img
            src={Logo}
            srcSet="
              ../assets/images/client-doing-hair-cut-barber-shop-salon.jpg 100w,
              ../assets/images/client-doing-hair-cut-barber-shop-salon.jpg 200w
            "
            sizes="(max-width: 320px) 80px, (max-width: 480px) 160px, 200px"
            alt="Haircuts"
          />
          <p>Haircuts</p>
        </div>
        <div className="service-item">
          <img src="path/to/spa-icon.png" alt="Spa" />
          <p>Spa Treatments</p>
        </div>
      </div>
    </section>
  );
};

export default Services;
