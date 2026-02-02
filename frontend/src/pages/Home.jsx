import React, { Suspense, lazy } from "react";
import haircutImage from "../assets/images/hair-stylist-7099181_1280.jpg";
import hairtreatmentImage from "../assets/images/hairdressing-1516352_640.jpg";
import pedicureImage from "../assets/images/pedicure.jpg";
import pedicureImage1 from "../assets/images/pedicure_1.jpg";
import hairHighlights from "../assets/images/hairhighlight.jpg";
import facialsImage from "../assets/images/facials.jpg";
import massageImage from "../assets/images/body-massage.jpg";
const SwiperCarousel = lazy(() => import("./SwiperCarousel"));

const Home = () => {
  const services = [
    {
      id: 1,
      title: "Hair Services",
      description:
        "Discover precision cuts that enhance your individuality and textured cuts that redefine your style narrative. Immerse yourself in the world of custom color variations, where our bold and confident stylists craft a palette that complements your personality seamlessly. Experience the transformative power of smoothing treatments that leave your hair luxuriously sleek and vibrant.",
      price: "From $45",
      image: `${haircutImage}`,
    },
    // {
    //  id: 2,
    //   title: "Color Services",
    //   description: "Full color, highlights, balayage, and more",
    //   price: "From $85",
    //   image: `${hairHighlights}`,
    // },
    // {
    //  id: 3,
    //   title: "Hair Treatments",
    //   description: "Deep conditioning, keratin, and repair treatments",
    //   price: "From $65",
    //   image: `${hairtreatmentImage}`
    // },
    {
      id: 4,
      title: "Nail Services",
      description:
        "Elevate your style with our bold and modern nail services at The Clip Joint. Crafted for trendsetting, our nail treatments are designed to complement your unique personality. From fashion-forward nail art to timeless classics, our conscious and cutting-edge nail technicians deliver a pampering experience that resonates with the modern and confident spirit of our diverse clientele. Trust us for quality and relaxation, where your nails become a canvas for self-expression.",
      price: "From $20",
      image: `${pedicureImage1}`,
    },
    {
      id: 5,
      title: "SPA/sKIN Services",
      description: "Discover conscious skincare with our industry-leading esthetician, Kelly Krivesti. Our diverse clientele of trendy adults seeks the perfect balance of modern skincare solutions in a relaxing atmosphere. Our approach to facial treatments goes beyond the ordinary, promoting not just beauty but a sense of well-being. Unveil your radiant skin with confidence, as our relatable estheticians provide quality services that align with our brand's commitment to self-care. This is where modern meets timeless, and beauty is an art form.",
      price: "From $75",
      image: `${massageImage}`,
    },
    // {
    //  id: 6,
    //   title: "Facials Teatments",
    //   description: "All types of facial cleansing",
    //   price: "$20",
    //   image: `${facialsImage}`
    // }
    // Add more services
  ];

  return (
    <React.Fragment>
      <main>
        <section className="hero">
          <div className="container">
            <Suspense fallback={<p>loading...</p>}>
              <SwiperCarousel />
            </Suspense>
            <div className="hero-text">
              <h1>Welcome to Our Salon</h1>
              <p className="hero-description">
                We provide full experience luxury and relaxation. we are proud
                to say that we have been a staple in the community for over 50
                year
              </p>

              <button className="hero-button">Book Now</button>
            </div>
          </div>
        </section>

        <section className="services-section services">
          <div className="u-container">
            <h2>Our Services</h2>
            <div className="u-grid">
              {services.map((service) => (
                <>
                  <div className="u-grid-item">
                    <div key={service.id} className="home-service-card">
                      <div className="service-image service-item">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="service-title"
                        />
                      </div>

                      <div className="service-details">
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                      </div>

                      <div className="service-button-container">
                        <button className="service-button">
                          View All Services
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
};

export default Home;
