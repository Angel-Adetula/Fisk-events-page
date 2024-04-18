import "./carousel.css";
import { Carousel } from "antd";

function CarouselModel({ cardData }) {
  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return `${description.substring(0, maxLength)}...`;
  };

  return (
    <Carousel className="carousel-container">
      {cardData.map((card, index) => (
        <div key={index} className="carousel-style">
          <img src={card.carousel} alt="Event" className="carousel-image" />
          <div className="carousel-overlay">
            <h3 className="text-title">{card.title}</h3>
            <p className="text-body">
              {truncateDescription(card.description, 220)}
            </p>
          </div>
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselModel;
