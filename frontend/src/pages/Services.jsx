import React, { useEffect, useState } from "react";
import { Scissors, Sparkles, Heart, Palette, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "../assets/css/services.css";

import Logo from "../assets/images/client-doing-hair-cut-barber-shop-salon.jpg";
const Services = () => {
  const navigate = useNavigate();

  const [services, setServices] = useState([
    {
      title: "Hair Services",
      icon: Scissors,
      items: [
        { service: "Women's Haircut", price: "$50" },
        { service: "Men's Haircut", price: "$35" },
      ],
      features: ["Consultation", "Custom Styling", "Premium Products"],
    },
    {
      title: "Nail Services",
      icon: Sparkles,
      items: [
        { service: "Classic Manicure", price: "$25" },
        { service: "Classic Pedicure", price: "$40" },
        { service: "Spa Pedicure", price: "$55" },
        { service: "Nail Art", price: "$15+" },
        { service: "Acrylic Set", price: "$65+" },
      ],
      features: ["Sanitized Tools", "Massage", "Premium Polish"],
    },
    {
      title: "Massage",
      icon: Heart,
      items: [
        { service: "Deep Tissue Massage (60 min)", price: "$80" },
        { service: "Swedish Massage (60 min)", price: "$100" },
        { service: "Hot Stone Massage (90 min)", price: "$150" },
      ],
    },
    {
      title: "Coloring",
      icon: Palette,
      items: [
        { service: "Full Color", price: "$85" },
        { service: "Highlights", price: "$95" },
        { service: "Balayage", price: "$120" },
      ],
    },
    {
      title: "Special Treatments",
      icon: Star,
      items: [
        { service: "Deep Conditioning Treatment", price: "$55" },
        { service: "Keratin Treatment", price: "$200" },
        { service: "Hair Extensions", price: "$300" },
      ],
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBookNow = () => {
    navigate("/booking");
  };

  // useEffect(() => {
  //   const getServices = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8100/api/services");

  //       if (!response.ok) {
  //         throw new Error(`HTTP error! status: ${response.status}`);
  //       }

  //       const data = await response.json();
  //       setServices(data);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error(error);
  //       setError(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   getServices();

  // }, []);

  return (
    <React.Fragment>
      <section className="services-section container" id="services">
        {/* Services Section */}
        <div className="services-header">
          <h2 className="services-title">Our Services</h2>
          <p className="services-subtitle">
            Professional beauty services tailored to your unique needs.          </p>
        </div>

        <div className="services-container">
          <div className="services-grid">
            {services.map((service, index) => (
              <div
                key={service.id || index}
                className="service-card"
                style={{
                  zIndex: index + 1,
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="service-header">
                  <service.icon className="service-icon" />{" "}
                  <h3 className="service-title">{service.title}</h3>
                </div>
                <div className="service-divider"></div>
                <ul className="service-items-list">
                  {service.items?.map((item, itemIndex) => (
                    <li key={itemIndex} className="service-item">
                      <span className="service-name">
                        <span className="service-bullet">•</span>
                        {item.service}
                      </span>
                      <span className="service-price">{item.price}</span>
                    </li>
                  ))}
                </ul>

                {/* Optional Features */}
                {services.features && (
                  <div className="service-features">
                    {services.features.map((feature, i) => (
                      <span key={i} className="service-feature">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Overlapping Images Section */}
          {/* <div className="overlapping-images">
            <div className="image-circle circle-1">
              <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBzdHlsaXN0fGVufDF8fHx8MTc2Nzg4MTgyMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Client Getting Haircut" />
            </div>
            <div className="image-circle circle-2">
              <img src="https://images.unsplash.com/photo-1761931403671-d020a14928d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwY3V0dGluZyUyMG1vZGVybnxlbnwxfHx8fDE3Njc4ODE4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Salon Interior" />
            </div>
            <div className="image-circle circle-3">
              <img  src="https://images.unsplash.com/photo-1702236240794-58dc4c6895e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGhhaXIlMjBzYWxvbnxlbnwxfHx8fDE3Njc4ODE4MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" alt="Hair Styling" />
            </div>
          </div> */}
        </div>

        {/* Call to Action */}

        <div className="cta-section">
          <button onClick={handleBookNow} className="cta-button">
            Book an Appointment
          </button>

          <p className="cta-phone">Call us at (555) 123-4567</p>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Services;
