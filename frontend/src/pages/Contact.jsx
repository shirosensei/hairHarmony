import React from 'react'

const Contact = () => {
  return (
    <div>
                <section className="contact-info">
          <h2>Contact Info</h2>
          <div className="contact-item">
            <img src="path/to/location-icon.png" alt="Location" />
            <p>123 Main St, City, State, ZIP</p>
          </div>
          <div className="contact-item">
            <img src="path/to/phone-icon.png" alt="Phone" />
            <p>123-456-7890</p>
          </div>
          <div className="contact-item">
            <img src="path/to/email-icon.png" alt="Email" />
            <p>info@salon.com</p>
          </div>
          <div className="contact-item">
            <img src="path/to/opening-hours-icon.png" alt="Opening Hours" />
            <p>Monday - Friday: 9:00 AM - 5:00 PM</p>
          </div>
        </section>
    </div>
  )
}

export default Contact