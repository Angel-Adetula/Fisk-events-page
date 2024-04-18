import React, { useState } from "react";
import "./style/events.css";
import Header from "../components/Header";
import carouselImage from "../assets/carousel.jpg";
import votingCar from "../assets/voh.png";
import voting from "../assets/voting.png";
import dit from "../assets/dit.png";
import bts from "../assets/bts.png";
import dfsj from "../assets/dfsj.jpg";
import career from "../assets/career.jpg";
import summer from "../assets/Summer.png";
import CardModel from "../components/CardComponent/CardModel";
import SearchBox from "../components/SearchBoxComponent/SearchBox";
import CarouselModel from "../components/CarouselComponent/Carousel";

const cardData = [
  {
    title: "Diverse Roles in Tech",
    description:
      "Join us in an enlightening exploration led by Dr. Marcus, a distinguished Quantum Engineer at IBM,as we delve into the captivating world where AI intersects with Quantum Engineering. With a wealth of experience and expertise, Dr. Marcus spearheads groundbreaking research and innovation at the forefront of quantum technology. Discover alongside him how pioneers in the field utilize AI's creative potential to sculpt new paradigms and push the boundaries of possibility. Get ready to embark on a journey of imagination and discovery as we unravel the fusion of artistry and technology in this fascinating realm.",
    date: "9th April, 2024",
    location: "Location 1",
    organization: "Fisk CS Club",
    carousel: carouselImage,
    img: dit,
    eventType: "live",
  },
  {
    title: "Career Week",
    description:
      "Explore endless career possibilities at Career Week! Join us for workshops, panels, and networking opportunities tailored to boost your career journey. From resume tips to industry insights, seize the chance to pave your path to success!",
    date: "18th April, 2024",
    location: "Location 2",
    organization: "OCPD",
    carousel: career,
    img: summer,
    eventType: "virtual",
  },
  {
    title: "Voting Open House",
    description:
      "Voting Open House hosted by the CS Club provides an interactive platform for members and enthusiasts alike to delve into the mechanics of digital democracy.",
    date: "26th April, 2024",
    location: "Location 3",
    organization: "Fisk CS Club",
    carousel: votingCar,
    img: voting,
    eventType: "virtual",
  },
  {
    title: "Data For Social Justice",
    description:
      "Join us at Voices for Change, a dynamic forum dedicated to advancing social justice. This event brings together activists, community leaders, and changemakers to address pressing issues and drive meaningful action. ",
    date: "28th April, 2024",
    location: "Location 4",
    organization: "Data Science Club",
    carousel: dfsj,
    img: bts,
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
