import React, { useState } from "react";
import "./style/events.css";
import Header from "../components/Header";
import carouselImage from "../assets/carousel.jpg";
import voting from "../assets/voting.png";
import CardModel from "../components/CardComponent/CardModel";
import SearchBox from "../components/SearchBoxComponent/SearchBox";
import CarouselModel from "../components/CarouselComponent/Carousel";

const cardData = [
  {
    title: "Diverse Roles in Tech",
    description: "Description for card 1",
    date: "9th April, 2024",
    location: "Location 1",
    organization: "Fisk CS Club",
    carousel: carouselImage,
    img: voting,
    eventType: "live",
  },
  {
    title: "Career Week",
    description: "Description for card 2",
    date: "18th April, 2024",
    location: "Location 2",
    organization: "OCPD",
    carousel: voting,
    img: carouselImage,
    eventType: "virtual",
  },
  {
    title: "BioTech Expo",
    description: "Description for card 3",
    date: "26th April, 2024",
    location: "Location 3",
    organization: "Axon NeuroScience Club",
    carousel: carouselImage,
    img: voting,
    eventType: "virtual",
  },
  {
    title: "Data For Social Justice",
    description: "Description for card 3",
    date: "28th April, 2024",
    location: "Location 4",
    organization: "Data Science Club",
    carousel: carouselImage,
    img: voting,
    eventType: "live",
  },
];

const Events = () => {
  const [filteredData, setFilteredData] = useState(cardData);

  const handleSearch = (searchParams) => {
    const { name, organization, dateFilter, eventType } = searchParams;
    let filteredResults = [...cardData];

    if (name) {
      filteredResults = filteredResults.filter((item) =>
        item.title.toLowerCase().includes(name.toLowerCase())
      );
    }

    if (organization) {
      filteredResults = filteredResults.filter(
        (item) => item.organization === organization
      );
    }

    if (dateFilter !== "all") {
      const dateThreshold = new Date();
      if (dateFilter === "pastWeek") {
        dateThreshold.setDate(dateThreshold.getDate() - 7);
      } else if (dateFilter === "pastMonth") {
        dateThreshold.setMonth(dateThreshold.getMonth() - 1);
      } else if (dateFilter === "semester") {
        const semesterStartDate = new Date("2024-01-01");
        dateThreshold.setTime(semesterStartDate.getTime());
      }
      filteredResults = filteredResults.filter(
        (item) => item.date >= dateThreshold
      );
    }

    if (eventType !== "all") {
      filteredResults = filteredResults.filter(
        (item) => item.eventType === eventType
      );
    }

    setFilteredData(filteredResults);
  };

  return (
    <>
      <Header />
      <div>
        <CarouselModel cardData={cardData} />
        <h1 className="title">Events</h1>
        <div className="events-section">
          <div className="search-area">
            <SearchBox onSearch={handleSearch} />
          </div>
          <div className="card-area">
            <CardModel cardData={filteredData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
