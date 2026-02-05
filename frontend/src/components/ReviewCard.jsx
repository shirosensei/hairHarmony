import React from 'react'
import '../assets/css/ReviewCard.css'

const ReviewCard = ({ name, rating, review, date }) => {
  const stars = Array(rating).fill("★");

  return (
    <div className="review-card">
      <div className="review-header">
        <h3 className="review-name">{name}</h3>
        <div className="review-rating">
          {stars.map((star, i) => (
            <span key={i} className="review-star">★</span>
          ))}
        </div>
      </div>
      <p className="review-text">{review}</p>
      <p className="review-date">{date}</p>
    </div>
  )
}

export { ReviewCard }