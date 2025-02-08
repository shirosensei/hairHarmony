import React, { useState, useEffect, useLayoutEffect } from "react";
import { useFormAction } from "react-router-dom";

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStaff = async () => {
      try {
        const response = await fetch("http://localhost:8100/api/stylists");
        const data = await response.json();
        setStaff(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getStaff();
  }, []);

  return (
    <div>
      <section className="staff">
        <h2>Our Staff</h2>
        <div className="staff-items">
          <div className="staff-item">
            {loading && <p>Loading staff...</p>}
            {staff.map((staff) => (
              <div key={staff._id} className="staff-item">
                <img src={staff.image} alt={staff.name} />
                <h3>{staff.name}</h3>
                <p>{staff.experience}</p>
                <p>{staff.speciality}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Staff;
