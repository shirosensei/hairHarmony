import React from 'react'
import '../assets/css/TeamMember.css';


const TeamMember = ({ name, role, image, specialty }) => {
  return (
    <div className="team-member">
         <div className="team-member-image-container">
        <img src={image} alt={name} className="team-member-image" />
      </div>

      <div className="team-member-content">
        <h3 className="team-member-name">{name}</h3>
        <p className="team-member-role">{role}</p>
        <p className="team-member-specialty">{specialty}</p>
      </div>
    </div>
  )
}

export { TeamMember }