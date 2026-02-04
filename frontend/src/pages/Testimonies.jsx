import React from 'react'
import { Scissors, Award, Heart } from "lucide-react";
import { Star } from "lucide-react";


const Testimonies = () => {



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
    <div>
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
    </div>
  )
}

export default Testimonies