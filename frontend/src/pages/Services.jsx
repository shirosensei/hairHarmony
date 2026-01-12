import React, { useEffect, useState } from "react";
import { Scissors, Sparkles, Heart, Palette, Star } from "lucide-react";

import "../assets/css/services.css";

import Logo from "../assets/images/client-doing-hair-cut-barber-shop-salon.jpg";
const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const services1 = [
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
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      review:
        "Absolutely love this salon! The staff is incredibly talented and the atmosphere is so relaxing. My hair has never looked better!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      review:
        "Best haircut I've ever had. The attention to detail is outstanding. Highly recommend!",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      review:
        "I've been coming here for years and they never disappoint. Professional, friendly, and amazing results every time.",
      rating: 5,
    },
  ];

  return (
    <React.Fragment>
      <section className="services-section container" id="services">
        {/* Hero Section */}

        {/* <div className="hero-container">
          <div className="hero-overlay">
            <div className="hero-content">
              <div className="hero-title">Hair Harmony Salon</div>
              <p className="hero-subtitle">Where Beauty Meets Excellence</p>
            </div>
          </div>
        </div> */}

        {/* Services Section */}
        <div className="services-header">
          <h2 className="services-title">Our Services</h2>
          <p className="services-subtitle">
            Professional beauty services tailored to your unique needs. Book
            your appointment today for a personalized experience.
          </p>
        </div>

        <div className="services-container">
          <div className="services-grid">
            {services1.map((service, index) => (
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
                {services1.features && (
                  <div className="service-features">
                    {services1.features.map((feature, i) => (
                      <span key={i} className="service-feature">
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                {/* <button className="service-cta">Book {service.title}</button> */}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <div className="testimonials-header">
            <h2 className="testimonials-title">What Our Clients Say</h2>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id || index}
                className="testimonial-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="testimonial-rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="testimonial-star" />
                  ))}
                </div>
                <p className="testimonial-review">{testimonial.review}</p>
                <p className="testimonial-name">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Services;
