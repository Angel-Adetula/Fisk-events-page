import React from "react";
import "./style/events.css";
import Header from "../components/Header";
import carouselImage from "../assets/carousel.jpg";
import voting from "../assets/voting.png";
import CardModel from "../components/CardComponent/CardModel";
import SearchBox from "../components/SearchBoxComponent/SearchBox";
import CarouselModel from "../components/CarouselComponent/Carousel";

const cardData = [
  {
    title: "Card 1",
    description: "Description for card 1",
    date: "16th April, 2024",
    location: "Location 1",
    organization: "Fisk CS Club",
    carousel: carouselImage,
    img: voting,
  },
  {
    title: "Card 2",
    description: "Description for card 2",
    date: "18th April, 2024",
    location: "Location 2",
    organization: "OCPD",
    carousel: carouselImage,
    img: carouselImage,
  },
  {
    title: "Card 3",
    description: "Description for card 3",
    date: "26th April, 2024",
    location: "Location 3",
    organization: "Axon NeuroScience Club",
    carousel: carouselImage,
    img: voting,
  },
  {
    title: "Card 4",
    description: "Description for card 3",
    date: "28th April, 2024",
    location: "Location 4",
    organization: "Data Science Club",
    carousel: carouselImage,
    img: voting,
  },
];

const Events = () => {
  return (
    <>
      <Header />
      <div>
        <CarouselModel cardData={cardData} />
        <h1 className="title">Events</h1>
        <div className="events-section">
          <div className="search-area">
            <SearchBox />
          </div>
          <div className="card-area">
            <CardModel cardData={cardData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
