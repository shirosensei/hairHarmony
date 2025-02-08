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
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [stylist, setStylist] = useState("");
  const [date, setDate] = useState(new Date());

  //! This is the same as the handleChange function below
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "service":
        setService(value);
        break;
      case "stylist":
        setStylist(value);
        break;
      default:
        break;
    }
  };

  //* Function to handle date picker
  const handleDateChange = (date) => {
    setDate(date);
  };

  //? Function that handle submit button
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8100/api/appointments/book",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            service,
            stylist,
            date: date.toISOString(),
            time: new Date().toLocaleTimeString(),
          }),
        }
      );

      if (response.ok) {
        // console.error("Error booking appointment.", response.text());
        alert("Appointment booked appointment.");
      } else {
        alert("Error booking appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment.", error);
    }

    // Make API call to book appointment
  };

  return (
    <div className="container">
      <section className="booking">
        <h1>Book an Appointment</h1>
        <p>
          Book an appointment with our professional stylists and get the look
          you desire. Our stylists are experienced in providing a range of
          services including haircuts, hair coloring, beard trims, and more.
        </p>

        {/* <h2>Book an Appointment</h2> */}
        {/* Appointment form */}
        <div className="cards">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email Address: </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />

            <label htmlFor="phoneNumber" className="booking-card"></label>
            <input
              type="text"
              id="phoneNumber"
              name="phone"
              value={phone}
              // onChange={(e) => console.log(setPhone(e.target.value))}
              onChange={handleChange}
            />

            {/* Calendar component goes here */}
            <label htmlFor="date">Date: </label>
            <Calendar value={date} onChange={handleDateChange} required />
            <p>Selected Date: {date.toLocaleDateString()}</p>

            <label htmlFor="service">Service: </label>
            <select
              id="service"
              name="service"
              value={service}
              onChange={handleChange}
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
            <button type="submit" className="button">
              Book Now
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Booking;
