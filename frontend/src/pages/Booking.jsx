import React, { useEffect, useState } from "react";
// import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  Scissors,
  User,
  ChevronRight,
  CheckCircle,
  Loader,
  X,
  Mail,
  Phone,
  User as UserIcon,
} from "lucide-react";
import "../assets/css/booking.css";
import stylistImage1 from "../assets/images/stylist-1.jpg";
import stylistImage2 from "../assets/images/stylist_2.jpg";
import stylistImage3 from "../assets/images/stylist_3.jpg";
import stylistImage4 from "../assets/images/stylist_4.jpg";



const Booking = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingError, setBookingError] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [services, setService] = useState(null);
  const [stylist, setStylist] = useState(null);
  const [timeSlots, setTimeSlots] = useState(null);

  // Form validation errors
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setService([
      { id: 1, name: "Haircut", duration: "45 min", price: "$45" },
      { id: 2, name: "Hair Coloring", duration: "2 hrs", price: "$120" },
      { id: 3, name: "Styling", duration: "30 min", price: "$35" },
      { id: 4, name: "Treatment", duration: "1 hr", price: "$80" },
      { id: 5, name: "Highlights", duration: "2.5 hrs", price: "$150" },
      { id: 6, name: "Manicure", duration: "45 min", price: "$40" },
      { id: 7, name: "Massage", duration: "1 hr", price: "$90" },
      { id: 8, name: "Facial", duration: "1 hr", price: "$70" },
    ]);

    setStylist([
      {
        id: 1,
        name: "Sarah Johnson",
        specialty: "Color Specialist",
        image: stylistImage1,
      },
      {
        id: 2,
        name: "Mike Chen",
        specialty: "Cut & Style",
        image: stylistImage2,
      },
      {
        id: 3,
        name: "Emma Davis",
        specialty: "All Services",
        image: stylistImage3,
      },
      {
        id: 4,
        name: "Alex Rivera",
        specialty: "Trending Styles",
        image: stylistImage4,
      },
    ]);

    setTimeSlots([
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
    ]);
  }, []);

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

  const formatDisplayDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Select Service";
      case 2:
        return "Choose Stylist";
      case 3:
        return "Pick Date";
      case 4:
        return "Select Time";
      case 5:
        return "Your Information";
      default:
        return "";
    }
  };

  const handleNextStep = () => {
    if (step < 5) {
      setStep(step + 1);

      // clear form errors when moving to next step
      if (step === 5) setFormErrors({});
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setFormErrors({});
    }
  };

  // handle customer info change
  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  // format phone input
  const formatPhoneInput = (value) => {
    // Remove all non-digit characters
    const numbers = value.replace(/\D/g, "");

    // Format as (XXX) XXX-XXXX
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`;
    } else {
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
    }
  };

  // Backend API call function
  const sendBookingData = async (bookingData) => {
    setIsLoading(true);
    setFormErrors({});


    try {
      const response = await fetch("https://localhost:8100/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to book appointment. Please try again. ${response.status}`,
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Booking error:", error);
      setBookingError(
        "An error occurred while processing your booking. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  // handle booking
  const handleBooking = async () => {
    const errors = validateCustomerInfo(customerInfo);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    const bookingData = {
      service: selectedService,
      stylist: selectedStylist,
      date: selectedDate,
      time: selectedTime,
      customerInfo: {
        firstName: customerInfo.firstName.trim(),
        lastName: customerInfo.lastName.trim(),
        email: customerInfo.email.trim().toLowerCase(),
        phone: customerInfo.phone.replace(/\D/g, ''),
        notes: customerInfo.notes?.trim() || '',
      },
      timstamp: new Date().toISOString(),
      status: "confirmed",
    };

    try {

      // load for about 5 seconds
      // new Promise((resolve, reject) => )
      const result = await sendBookingData(bookingData);

      if (result.success) {
        setBookingConfirmed(true);
        setBookingId(
          result.bookingId || `BH-${Date.now().toString().slice(-8)}`,
        );
        setShowConfirmation(true);
      } else {
        setFormErrors({ booking: result.message || "Booking failed. Please try again." });
        setShowConfirmation(true);
      }
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedService(null);
    setSelectedStylist(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setCustomerInfo({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      notes: "",
    });
    setBookingConfirmed(false);
    setBookingId(null);
    setBookingError(null);
    setFormErrors({});
    setShowConfirmation(false);
  };

  // Validate to proceed to next step
  const validateCurrentStep = () => {
    switch (step) {
      case 1:
        return selectedService !== null;
      case 2:
        return selectedStylist !== null;
      case 3:
        return selectedDate !== null;
      case 4:
        return selectedTime !== null;
      case 5: {
        const allField = customerInfo.firstName?.trim() !== '' &&
          customerInfo.lastName?.trim() !== '' &&
          customerInfo.email?.trim() !== '' &&
          customerInfo.phone?.trim() !== ''

        return allField;
      }
      default:
        return false;
    }
  };

  const canProceed = () => {
    return validateCurrentStep();
  };

  // helper function to validate customer info
  const validateCustomerInfo = (customerInfo) => {
    const errors = {};

    if (!customerInfo.firstName?.trim()) {
      errors.firstName = "First name is required";
    } else if (customerInfo.firstName.length < 5) {
      errors.firstName = "First name must be at least 5 characters";
    }

    if (!customerInfo.lastName?.trim()) {
      errors.lastName = "Last name is required";
    } else if (customerInfo.lastName.length < 5) {
      errors.lastName = "Last name must be at least 5 characters";
    }

    if (!customerInfo.email?.trim()) {
      errors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      errors.email = "Invalid email format";
    }

    if (!customerInfo.phone?.trim()) {
      errors.phone = "Phone number is required";
    } else if (
      !/^\(\d{3}\) \d{3}-\d{4}$/.test(customerInfo.phone)
    ) {
      errors.phone = "Invalid phone number format";
    }

    // Notes validation (optional)
    if (customerInfo.notes && customerInfo.notes.trim().length > 500) {
      errors.notes = "Special requests cannot exceed 500 characters";
    }

    return errors;
  };

  return (

    <>
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
              {[1, 2, 3, 4, 5].map((s) => (
                <React.Fragment key={s}>
                  <div className="step-container">
                    <div className={`step-circle ${step >= s ? "active" : ""}`}>
                      {s}
                    </div>
                  </div>
                  {s < 5 && (
                    <div className={`step-line ${step > s ? "active" : ""}`} />
                  )}
                </React.Fragment>

  
              ))}
            </div>

            {/* Step Count */}
            <div className="step-indicator">
              Step {step} of 5: {` ${getStepTitle()}`}
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
                  {services?.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service)}
                      className={`servicelist-card ${selectedService?.id === service.id ? "selected" : ""}`}
                    >
                      <div className="service-info">
                        <h3 className="service-name">{service.name}</h3>
                        <p className="service-duration">{service.duration}</p>
                      </div>
                      <div className="service-pricing">{service.price}</div>
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
                  {stylist?.map((stylist) => (
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
                  <h2 className="step-title">Pick a Date</h2>
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

                <div className="times-grid">
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

            {/* Step 5: Confirm Information */}
            {step === 5 && (
              <div className="step-content">
                <div className="step-header">
                  <User className="step-icon" />
                  <h2 className="step-title">Confirm Your Information</h2>
                </div>

                <div className="customer-form">
                  <p className="form-description">
                    Please provide your contact details for booking confirmation.
                  </p>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="firstName">
                        First Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        className={formErrors.firstName ? "form-input input-error" : "form-input"}
                        value={customerInfo.firstName}
                        onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                        placeholder="John"
                        required
                      />
                      {formErrors.firstName && (
                        <span className="error-message">{formErrors.firstName}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="lastName">
                        Last Name <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        className={formErrors.lastName ? "form-input input-error" : "form-input"}
                        value={customerInfo.lastName}
                        onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                        placeholder="Doe"
                        required
                      />
                      {formErrors.lastName && (
                        <span className="error-message">{formErrors.lastName}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email Address <span className="required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Mail className="input-icon" />

                      <input
                        type="email"
                        id="email"
                        className={formErrors.email ? 'form-input input-error' : 'form-input'}
                        value={customerInfo.email}
                        onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    {formErrors.email ? (
                      <span className="error-message">{formErrors.email}</span>
                    ) : (
                      <small className="input-hint">Confirmation will be sent to this email</small>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">
                      Phone Number <span className="required">*</span>
                    </label>
                    <div className="input-with-icon">
                      <Phone className="input-icon" />

                      <input
                        type="tel"
                        id="phone"
                        className={formErrors.phone ? 'input-error form-input' : 'form-input'}
                        value={customerInfo.phone}
                        onChange={(e) => {
                          const value = formatPhoneInput(e.target.value);
                          handleCustomerInfoChange('phone', value)
                        }}
                        placeholder="(928) 567-8901"
                      />
                    </div>
                    {formErrors.phone && (
                      <span className="error-message">{formErrors.phone}</span>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label" htmlFor="notes">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      id="notes"
                      className={formErrors.notes ? 'input-error form-textarea' : 'form-textarea'}
                      value={customerInfo.notes || ''}
                      onChange={(e) => handleCustomerInfoChange('notes', e.target.value)}
                      placeholder="Any special requests or notes for the stylist..."
                      rows="4"
                    />
                    {formErrors.notes ? (
                      <span className="error-message">{formErrors.notes}</span>
                    ) : (
                      <div className="character-count">
                        {(customerInfo.notes || '').length}/500 characters
                      </div>
                    )}
                  </div>

                  <div className="privacy-notice">
                    <small>
                      Your information is secure and will only be used for booking purposes.
                      We never share your personal details with third parties.
                    </small>
                  </div>

                </div>
              </div>
            )}
          </div>

          {/* Footer with Summary and Navigation */}
          <div className="booking-footer">
            {/* Booking Summary */}
            {(step < 5 && (selectedService ||
              selectedStylist ||
              selectedDate ||
              selectedTime)) && (
                <div className="booking-summary">
                  <h3 className="summary-title">Booking Summary</h3>
                  <div className="summary-details">
                    {selectedService && (
                      <p className="summary-item">
                        <strong className="summary-bold">Service:</strong>{" "}
                        {selectedService.name} ({selectedService.price})
                      </p>
                    )}
                    {selectedStylist && (
                      <p className="summary-item">
                        <strong className="summary-bold">Stylist:</strong>{" "}
                        {selectedStylist.name}
                      </p>
                    )}
                    {selectedDate && (
                      <p className="summary-item">
                        <strong className="summary-bold">Date:</strong>{" "}
                        {selectedDate}
                      </p>
                    )}
                    {selectedTime && (
                      <p className="summary-item">
                        <strong className="summary-bold">Time:</strong>{" "}
                        {selectedTime}
                      </p>
                    )}
                  </div>
                </div>
              )}

            {/* Navigation Buttons */}
            <div className="booking-navigation">
              {step > 1 && (
                <button
                  onClick={handlePreviousStep}
                  className="btn-back"
                  disabled={isLoading}
                >
                  Back
                </button>
              )}

              {step < 5 ? (
                <button
                  onClick={handleNextStep}
                  disabled={!canProceed() || isLoading}
                  className={`btn-continue ${canProceed() ? "active" : ""} ${isLoading ? "loading" : ""}`}
                >
                  {isLoading ? <Loader className="btn-loader" /> : "Continue"}
                  {!isLoading && <ChevronRight className="btn-icon" />}
                </button>
              ) : (
                <button
                  onClick={handleBooking}
                  disabled={!canProceed() || isLoading}
                  className={`btn-confirm ${canProceed() ? "active" : ""} ${isLoading ? "loading" : ""}`}
                >
                  {isLoading ? (
                    <>
                      <Loader className="btn-loader" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Booking Confirmation Modal */}
          {showConfirmation && (
            <div className="confirmation-modal-overlay">
              <div className="confirmation-modal">
                <button
                  className="modal-close"
                  onClick={() => !isLoading && resetBooking()}
                  disabled={isLoading}
                >
                  <X size={20} />
                </button>

                {isLoading ? (
                  <div className="modal-loading">
                    <Loader className="modal-loader" size={48} />
                    <h3>Processing Your Booking</h3>
                    <p>Please wait while we confirm your appointment...</p>
                  </div>
                ) : bookingConfirmed ? (
                  <div className="modal-success">
                    <CheckCircle className="success-icon" size={64} />
                    <h3>Booking Confirmed!</h3>
                    <p>Your appointment has been successfully scheduled.</p>

                    <div className="confirmation-details">
                      <h4>Appointment Details</h4>
                      <div className="details-grid">
                        <div className="detail-item">
                          <strong>Booking ID:</strong>
                          <span className="booking-id">{bookingId}</span>
                        </div>
                        <div className="detail-item">
                          <strong>Customer:</strong>
                          <span>
                            {customerInfo.firstName} {customerInfo.lastName}
                          </span>
                        </div>
                        <div className="detail-item">
                          <strong>Email:</strong>
                          <span>{customerInfo.email}</span>
                        </div>
                        <div className="detail-item">
                          <strong>Phone:</strong>
                          <span>{customerInfo.phone}</span>
                        </div>
                        <div className="detail-item">
                          <strong>Service:</strong>
                          <span>{selectedService.name}</span>
                        </div>
                        <div className="detail-item">
                          <strong>Stylist:</strong>
                          <span>{selectedStylist.name}</span>
                        </div>
                        <div className="detail-item">
                          <strong>Date:</strong>
                          <span>{formatDisplayDate(selectedDate)}</span>
                        </div>
                        <div className="detail-item">
                          <strong>Time:</strong>
                          <span>{selectedTime}</span>
                        </div>
                        {customerInfo.notes && (
                          <div className="detail-item full-width">
                            <strong>Special Requests:</strong>
                            <span>{customerInfo.notes}</span>
                          </div>
                        )}
                      </div>

                      <div className="confirmation-notes">
                        <p>
                          📧 A confirmation email has been sent to{" "}
                          {customerInfo.email}
                        </p>
                        <p>
                          ⏰ Please arrive 10 minutes before your appointment
                        </p>
                        <p>
                          📞 Call (555) 123-4567 for any changes or
                          cancellations
                        </p>
                        <p>📍 123 Beauty Street, New York, NY 10001</p>
                      </div>
                    </div>

                    <div className="modal-actions">
                      <button
                        className="btn-print"
                        onClick={() => window.print()}
                      >
                        Print Confirmation
                      </button>
                      <button
                        className="btn-new-booking"
                        onClick={resetBooking}
                      >
                        Book Another Appointment
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="modal-error">
                    <div className="error-icon">!</div>
                    <h3>Booking Failed</h3>
                    <p className="error-message">
                      {bookingError ||
                        "Something went wrong. Please try again."}
                    </p>

                    <div className="modal-actions">
                      <button className="btn-retry" onClick={handleBooking}>
                        Try Again
                      </button>
                      <button className="btn-cancel" onClick={resetBooking}>
                        Start Over
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </section >
    </>
  );
};

export default Booking;
