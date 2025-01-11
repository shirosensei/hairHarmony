import React from "react";

const About = () => {
  return (
    <div>
      <section className="about">
        <div className="about-text">
          <h2>About Our Salon</h2>
          <p>
            We are a renowned salon with a focus on providing high-quality
            services and relaxation. Our team of skilled professionals is
            committed to providing you with the best possible haircut and
            styling experience.
          </p>
          <button className="button" id="about-border">
            Learn More
          </button>
        </div>
        <div className="about-image">
          <img src="path/to/salon-image.jpg" alt="Salon" />
        </div>
      </section>
    </div>
  );
};

export default About;
