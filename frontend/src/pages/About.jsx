import React from "react";
import '../assets/css/about.css';
import { TeamMember } from "../components/TeamMember";
import { ReviewCard } from "../components/ReviewCard";
import { Scissors, Award, Heart } from "lucide-react";

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "Master Stylist",
    image: "https://images.unsplash.com/photo-1763048208932-cbe149724374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc3R5bGlzdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Njg2NTM0NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    specialty: "Color & Balayage Specialist"
  },
  {
    name: "Emma Martinez",
    role: "Makeup Artist",
    image: "https://images.unsplash.com/photo-1600637070413-0798fafbb6c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWtldXAlMjBhcnRpc3QlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY4NzAxOTc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    specialty: "Bridal & Special Events"
  },
  {
    name: "Lisa Chen",
    role: "Spa Specialist",
    image: "https://images.unsplash.com/photo-1763873993447-1d0be71a96d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGElMjBwcm9mZXNzaW9uYWwlMjB3b21hbnxlbnwxfHx8fDE3Njg3MDE5Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    specialty: "Skincare & Treatments"
  },
  {
    name: "Michael Brown",
    role: "Senior Barber",
    image: "https://images.unsplash.com/photo-1732314287829-f1da598a5b77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJiZXIlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY4Njg3MzgzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    specialty: "Classic & Modern Cuts"
  }
];

const reviews = [
  {
    name: "Jennifer Wilson",
    rating: 5,
    review: "Absolutely love my new look! Sarah transformed my hair beyond my expectations. The salon has such a relaxing atmosphere.",
    date: "Jan 2026"
  },
  {
    name: "David Thompson",
    rating: 5,
    review: "Michael is a true professional. Best haircut I've had in years. The attention to detail is impeccable.",
    date: "Dec 2025"
  },
  {
    name: "Amanda Garcia",
    rating: 5,
    review: "Emma did my wedding makeup and it was flawless! I felt so beautiful. Highly recommend for any special occasion.",
    date: "Nov 2025"
  },
  {
    name: "Rachel Lee",
    rating: 5,
    review: "The spa treatments are incredible. Lisa's expertise in skincare has made such a difference. My skin has never looked better!",
    date: "Jan 2026"
  },
  {
    name: "Mark Davis",
    rating: 5,
    review: "Great experience from start to finish. Professional, friendly staff and excellent results every time.",
    date: "Dec 2025"
  },
  {
    name: "Sophia Anderson",
    rating: 5,
    review: "I've been coming here for years and they never disappoint. The team truly cares about their clients.",
    date: "Nov 2025"
  }
];



const About = () => {
  return (
    <div className="container">
      {/* Hero Section */}
      <div className="hero-section">
        <img src="https://images.unsplash.com/photo-1681965823525-b684fb97e9fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc2ODY0Njg3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Salon interior" className="hero-image" />

        <div className="hero-overlay">
          <div className="header-content">
            <h1 className="hero-title">About Hair & Harmony Salon</h1>
          </div>
        </div>
      </div>

      {/* About section */}
      <section className="about-section">
        <div className="about-container">
          <div className="about-content">
            <h2 className="about-title">Our Story</h2>
            <p className="about-text">
              For over 15 years, we&#39;ve been dedicated to providing exceptional beauty and wellness services to our community. What started as a small salon has grown into a full-service beauty destination, but our commitment to personalized care remains unchanged.
            </p>
            <p className="about-text">
              We believe that every client deserves to look and feel their absolute best. Our team of experienced professionals stays current with the latest trends and techniques, ensuring you receive cutting-edge treatments in a warm, welcoming environment.
            </p>
            <p className="about-text">
              Whether you&#39;re here for a quick trim or a complete transformation, we&#39;re committed to exceeding your expectations every single time.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Scissors size={48} color="#ff6f61" className="feature-svg" />
              </div>

              <div className="feature-content">
                <h3 className="feature-title">Expert Stylists</h3>
                <p className="feature-description">
                  Our stylist bring years of experience and continous training to every service.
                </p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Award size={48} color="#ff6f61" className="feature-svg" />
              </div>

              <div className="feature-content">
                <h3 className="feature-title">Award-Winning Team</h3>
                <p className="feature-description">
                  Recognized locally and nationally for excelence in beauty services.
                </p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Heart size={48} color="#ff6f61" className="feature-svg" />
              </div>

              <div className="feature-content">
                <h3 className="feature-title">Client-Centered Care</h3>
                <p className="feature-description">
                  Your satisfaction and comfort are our top priorities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <div className="team-header">
            <h2 className="team-title">Meet Our Team</h2>
            <p className="team-subtitle">
              Our talented professionals are passionate about making you look and feel amazing
            </p>
          </div>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="reviews-section">
        <div className="reviews-header">
          <h2 className="reviews-title">What Our Client Say</h2>
          <p className="reviews-subtitle">Don&apos;t just take our word for it. Hear from our satisfied clients about their experience with us.</p>
        </div>
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <h2 className="cta-title">Ready to Transform Your Look?</h2>
          <p className="cta-subtitle">Book your appointment today and experience the difference that our expert team can make.</p>
          <button className="cta-button">Book Now</button>
        </div>
      </section>
    </div>
  );
};

export default About;
