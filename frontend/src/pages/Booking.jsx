import React, { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";

const services = [
  "Haircut",
  "Hair Coloring",
  "Deep Conditioning",
  "Beard Trim",
  "Beard Wash",
  "Beard Color",
  "Beard Brow Wash",
  "Beard Brow Color",
  "Beard Shaping",
  "Beard Conditioning",
  "Eyebrow Trim",
  "Eyebrow Wash",
  "Eyebrow Color",
  "Eyebrow Shaping",
  "Eyebrow Conditioning",
  "Sideburns Trim",
  "Sideburns Wash",
  "Sideburns Color",
  "Sideburns Shaping",
  "Sideburns Conditioning",
  "Full Body Trim",
  "Full Body Wash",
  "Full Body Color",
  "Full Body Shaping",
  "Full Body Conditioning",
  "Hair Extensions",
  "Hair Spa",
  "Hair Pastels",
  "Hair Dye",
  "Hair Sculpting",
  "Hair Trimming",
];

const stylists = [
  "Denise Amaze",
  "Jessica Mystique",
  "Emily Stella",
  "Laura Belle",
  "Mia Grace",
];

const Booking = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [stylist, setStylist] = useState("");
  const [date, setDate] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    // Make API call to book appointment
  };
  return (
    <div>
      <h2>Book an Appointment</h2>
      {/* Appointment form */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email Address: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Calendar component goes here */}
        <label htmlFor="date">Date: </label>
        <Calendar value={date} onChange={setDate} required />
        <p>Selected Date: {date.toLocaleDateString()}</p>

        <label htmlFor="service">Service: </label>
        <select
          id="service"
          name="service"
          value={service}
          onChange={(e) => setService(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a Service
          </option>
          {services.map((service, index) => (
            <option key={index} value={service}>
              {service}
            </option>
          ))}
        </select>

        <label htmlFor="stylist">Stylist: </label>
        <select
          id="stylist"
          name="stylist"
          value={stylist}
          onChange={(e) => setStylist(e.target.value)}
          required
        >
          <option value="" disabled>
            Select a Stylist (optional)
          </option>
          {stylists.map((stylist, index) => (
            <option key={index} value={stylist}>
              {stylist}
            </option>
          ))}
        </select>
        <button type="submit" className="button">Book Now</button>
      </form>
    </div>
  );
};

export default Booking;
