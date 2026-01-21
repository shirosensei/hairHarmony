import React, { useState } from "react";
// import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Scissors, User, ChevronRight } from "lucide-react";
import "../assets/css/booking.css";

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

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const services = [
    { id: 1, name: "Haircut", duration: "45 min", price: "$45" },
    { id: 2, name: "Hair Coloring", duration: "2 hrs", price: "$120" },
    { id: 3, name: "Styling", duration: "30 min", price: "$35" },
    { id: 4, name: "Treatment", duration: "1 hr", price: "$80" },
    { id: 5, name: "Highlights", duration: "2.5 hrs", price: "$150" },
    { id: 6, name: "Manicure", duration: "45 min", price: "$40" },
  ];

  const stylists = [
    {
      id: 1,
      name: "Sarah Johnson",
      specialty: "Color Specialist",
      image: "👩‍🦰",
    },
    { id: 2, name: "Mike Chen", specialty: "Cut & Style", image: "👨‍🦱" },
    { id: 3, name: "Emma Davis", specialty: "All Services", image: "👱‍♀️" },
    { id: 4, name: "Alex Rivera", specialty: "Trending Styles", image: "👨‍🦲" },
  ];

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
  ];

  // Generate dates for the next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  // formate date
  const formatDate = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return {
      days: days[date.getDay()],
      date: date.getDate(),
      month: months[date.getMonth()],
    };
  };

  const handleNextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  // handle booking
  const handleBooking = () => {
    // Here you would typically send the booking data to your server
    alert("Booking confirmed! You will receive a confirmation email shortly.");
    setStep(1);
    setSelectedService(null);
    setSelectedStylist(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const canProceed = () => {
    if (step === 1) return selectedService !== null;
    if (step === 2) return selectedStylist !== null;
    if (step === 3) return selectedDate !== null;
    if (step === 4) return selectedTime !== null;
    return false;
  };

  return (
    <section className="booking-section">
      <div className="booking-system">
        {/* Header */}
        <div className="booking-header">
          <h1 className="booking-title">Book Your Appointment</h1>
          <p className="booking-subtitle">
            Select your preference service to schedule your visit
          </p>

          {/* Progress Steps */}
          <div className="progress-steps">
            {[1, 2, 3, 4].map((s) => (
              <React.Fragment key={s}>
                <div className="step-container">
                  <div className={`step-circle ${step >= s ? "active" : ""}`}>
                    {s}
                  </div>
                </div>
                {s < 4 && (
                  <div className={`step-line ${step > s ? "active" : ""}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Step Count */}
          <div className="step-indicator">
            Step {step} of 4: {step === 1 && "Select Service"}
            {step === 2 && "Choose Stylist"}
            {step === 3 && "Pick Date"}
            {step === 4 && "Select Time"}
          </div>
        </div>

        {/* Content */}
        <div className="booking-content">
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div className="step-content">
              <div className="step-header">
                <Scissors className="step-icon" />
                <h2 className="step-title">Select a Service</h2>
              </div>

              <div className="services-list">
                {services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => setSelectedService(service)}
                    className={`service-card ${selectedService?.id === service.id ? "selected" : ""}`}
                  >
                    <div className="service-info">
                      <h3 className="service-name">{service.name}</h3>
                      <p className="service-duration">{service.duration}</p>
                    </div>
                    <div className="service-price">{service.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Choose Stylist */}
          {step === 2 && (
            <div className="step-content">
              <div className="step-header">
                <User className="step-icons" />
                <h2 className="step-title">Choose a Stylist</h2>
              </div>
              <div className="stylists-list">
                {stylists.map((stylist) => (
                  <div
                    key={stylist.id}
                    onClick={() => setSelectedStylist(stylist)}
                    className={`stylist-card ${selectedStylist?.id === stylist.id ? "selected" : ""}`}
                  >
                    <div className="stylist-image-card">
                      <img
                        className="stylist-image"
                        src={stylist.image}
                        alt={stylist.name}
                      />
                      <div className="stylist-info">
                        <h3 className="stylist-name">{stylist.name}</h3>
                        <p className="stylist-speciality">
                          {stylist.specialty}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Pick Date */}
          {step === 3 && (
            <div className="step-content">
              <div className="step-header">
                <Calendar className="step-icon" />
                <h2 className="step-header">Pick a Date</h2>
              </div>

              <div className="dates-grid">
                {generateDates().map((date, idx) => {
                  const formatted = formatDate(date);
                  const dateStr = date.toDateString();
                  return (
                    <div
                      key={idx}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`date-card ${selectedDate === dateStr ? "selected" : ""}`}
                    >
                      <div className="date-day">{formatted.days}</div>
                      <div className="date-number">{formatted.date}</div>
                      <div className="date-month">{formatted.month}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 4: Select Time */}
          {step === 4 && (
            <div className="step-content">
              <div className="step-header">
                <Clock className="step-icon" />
                <h2 className="step-title">Select a Time</h2>
              </div>

              <div className="time-grid">
                {timeSlots.map((time) => (
                  <div
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`time-card ${selectedTime === time ? "selected" : ""}`}
                  >
                    <div className="time-slot">{time}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer with Summary and Navigation */}
          <div className="booking-footer">
            {/* Booking Summary */}
            {(selectedService ||
              selectedStylist ||
              selectedDate ||
              selectedTime) && (
              <div className="booking-summary">
                <h3 className="summary-title">Booking Summary</h3>
                <div className="summary-details">
                  {selectedService && (
                    <p className="summary-item">
                      <strong>Service:</strong> {selectedService.name} (
                      {selectedService.price})
                    </p>
                  )}
                  {selectedStylist && (
                    <p className="summary-item">
                      <strong>Stylist:</strong> {selectedStylist.name}
                    </p>
                  )}
                  {selectedDate && (
                    <p className="summary-item">
                      <strong>Date:</strong> {selectedDate}
                    </p>
                  )}
                  {selectedTime && (
                    <p className="summary-item">
                      <strong>Time:</strong> {selectedTime}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="booking-navigation">
              {step > 1 && (
                <button onClick={handlePreviousStep} className="btn-back">
                  Back
                </button>
              )}

              {step < 4 ? (
                <button
                  onClick={handleNextStep}
                  disabled={!canProceed()}
                  className={`btn-continue ${canProceed() ? "active" : ""}`}
                >
                  Continue <ChevronRight className="btn-icon" />
                </button>
              ) : (
                <button
                  onClick={handleBooking}
                  disabled={!canProceed()}
                  className={`btn-confirm ${canProceed() ? "active" : ""}`}
                >
                  Confirm Booking
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
