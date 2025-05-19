const TestimonialCard = ({ testimonial }) => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <ion-icon
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          className={i <= rating ? "checked" : ""}
        ></ion-icon>
      );
    }
    return stars;
  };

  return (
    <div className="testimonial-card">
      <div className="testimonial-header">
        <img
          src={testimonial.imageUrl}
          alt={testimonial.name}
          className="testimonial-img"
        />
        <div className="testimonial-info">
          <h3>{testimonial.name}</h3>
          <p className="position">{testimonial.position}</p>
        </div>
      </div>
      <p className="testimonial-text">"{testimonial.text}"</p>
      <div className="testimonial-rating">
        {renderStars(testimonial.rating)}
      </div>
    </div>
  );
};

export default TestimonialCard;
