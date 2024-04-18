import "./carousel.css";
import { Carousel } from "antd";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function CarouselModel({ cardData }) {
  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return `${description.substring(0, maxLength)}...`;
  };
  const shuffledCardData = shuffleArray(cardData);

  return (
    <Carousel className="carousel-container">
      {shuffledCardData.map((card, index) => (
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
