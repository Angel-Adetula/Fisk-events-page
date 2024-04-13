import "./carousel.css";
import { Carousel } from "antd";

function CarouselModel({ cardData }) {
  return (
    <Carousel className="carousel-container">
      {cardData.map((card, index) => (
        <div key={index} className="carousel-style">
          <img src={card.carousel} alt="Event" className="carousel-image" />
          {/* <div className="carousel-overlay">
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div> */}
        </div>
      ))}
    </Carousel>
  );
}

export default CarouselModel;
