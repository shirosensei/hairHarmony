import React, { useEffect, useState } from "react";
import Logo from "../assets/images/client-doing-hair-cut-barber-shop-salon.jpg";
const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await fetch("http://localhost:8100/api/services");
        const data = await response.json();
        setServices(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getServices();

  }, []);


  return (
    <React.Fragment>
      <section className="services">
        <h2>Our Services</h2>

        <div className="service-items">
          <div className="service-item">
            {loading && <p>Loading services...</p> ? (
              <img src={Logo} alt="Loading services..." />
            ) : (
              <p>No services found.</p>
            )}

            {services.map((service) => (
              <div key={service._id} className="service-item">
                <img src={service.icon} alt={service.name} />
                <p>{service.name}</p>
                <p>{service.duration}</p>
                <p>${service.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Services;
