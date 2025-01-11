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
      title: "Hair Services",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat nesciunt ea porro, adipisci eos doloribus accusantium sint error. Voluptates maxime alias nulla, modi porro cum qui consectetur amet aspernatur rerum!",
      price: "From $45",
      image: `${haircutImage}`,
    },
    // {
    //   title: "Color Services",
    //   description: "Full color, highlights, balayage, and more",
    //   price: "From $85",
    //   image: `${hairHighlights}`,
    // },
    // {
    //   title: "Hair Treatments",
    //   description: "Deep conditioning, keratin, and repair treatments",
    //   price: "From $65",
    //   image: `${hairtreatmentImage}`
    // },
    {
      title: "Nail Services",
      description:
        "                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos at ullam tenetur iusto minus consequuntur. Suscipit laboriosam accusamus asperiores quia, dolorem distinctio odio officia error, doloremque, sit obcaecati libero sed!",
      price: "From $20",
      image: `${pedicureImage1}`,
    },
    {
      title: "SPA/sKIN Services",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint esse fugit cumque laboriosam minima repellat quis id rerum, laudantium iusto quisquam repudiandae architecto beatae omnis vero tempora? Corrupti, in illum!",
      price: "From $75",
      image: `${massageImage}`,
    },
    // {
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
            <Suspense
              fallback={<p>loading...</p>}
            >
              <SwiperCarousel />
            </Suspense>
            <div className="hero-text">
              <h1>Welcome to Our Salon</h1>
              <p>We provide full experience luxury and relaxation. we are proud to say that we have been a staple in the community for over 50 year</p>
              <button className="hero-button">Book Now</button>
            </div>
          </div>
        </section>

        <section className="services-section services">
          <div className="u-container">
            <h2>Our Services</h2>
            <div
              className="u-grid">
              {services.map((service, index) => (
                <div key={index} className="service-card">
                  <div className="service-image service-item">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="service-title"
                    />
                  </div>

                  <div className="u-grid-item">
                    <h4>{service.title}</h4>
                    <p>{service.description}</p>
                  </div>

                  <div className="service-button-container">
                    <button className="service-button">View All Services</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </React.Fragment>
  );
};

export default Home;
