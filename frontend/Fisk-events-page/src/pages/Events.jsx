import React, { useState } from "react";
import "./style/events.css";
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

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const handleSignIn = () => {
  window.location.href = "/sign-in";
};


const originalData = [
  {
    title: "Diverse Roles in Tech",
    description:
      "Join us in an enlightening exploration led by Dr. Marcus, a distinguished Quantum Engineer at IBM,as we delve into the captivating world where AI intersects with Quantum Engineering. With a wealth of experience and expertise, Dr. Marcus spearheads groundbreaking research and innovation at the forefront of quantum technology. Discover alongside him how pioneers in the field utilize AI's creative potential to sculpt new paradigms and push the boundaries of possibility. Get ready to embark on a journey of imagination and discovery as we unravel the fusion of artistry and technology in this fascinating realm.",
    date: "2024-04-20",
    location: "Appleton Room",
    organization: "Fisk CS Club",
    carousel: carouselImage,
    img: dit,
    eventType: "live",
    time: "17:00",
    type: "Academic",
    tags: ["Computer Science, Software Engineering", "Product Management"],
    PandV: {
      "Hours Offered": "3",
      "Volunteers Needed": "4",
      "Volunteer Hours": "1",
      "Volunteer Link": "Link here",
    },
    videoCall: "/",
  },
  {
    title: "Career Week",
    description:
      "Explore endless career possibilities at Career Week! Join us for workshops, panels, and networking opportunities tailored to boost your career journey. From resume tips to industry insights, seize the chance to pave your path to success!",
    date: "2024-04-19",
    location: "Multipurpose Room @ Spence Hall",
    organization: "Fisk OCPD",
    carousel: career,
    img: summer,
    eventType: "virtual",
    time: "16:00",
    type: "Academic",
    tags: ["Career Develoopment", "Opportunities"],
    PandV: {
      "Hours Offered": "1",
      "Volunteers Needed": "15",
      "Volunteer Hours": "2.5",
      "Volunteer Link": "Link here",
      videoCall: "/",
    },
  },
  {
    title: "Voting Open House",
    description:
      "Voting Open House hosted by the CS Club provides an interactive platform for members and enthusiasts alike to delve into the mechanics of digital democracy.",
    date: "2024-05-02",
    location: "Library 317",
    organization: "Fisk CS Club",
    carousel: votingCar,
    img: voting,
    eventType: "virtual",
    time: "15:00",
    type: "Extra Curricular",
    tags: ["Computer Science", "Voting"],
    PandV: {
      "Hours Offered": "4",
      "Volunteers Needed": "10",
      "Volunteer Hours": "2",
      "Volunteer Link": "Link here",
    },
    videoCall: "/",
  },
  {
    title: "Data For Social Justice",
    description:
      "Join us at Voices for Change, a dynamic forum dedicated to advancing social justice. This event brings together activists, community leaders, and changemakers to address pressing issues and drive meaningful action. ",
    date: "2024-04-22",
    location: "PJ 122",
    organization: "Data Science Club",
    carousel: dfsj,
    img: bts,
    eventType: "live",
    time: "16:30",
    type: "Academic",
    tags: ["Data Science", "Social Justice"],
    PandV: {
      "Hours Offered": "2",
      "Volunteers Needed": "5",
      "Volunteer Hours": "2",
      "Volunteer Link": "Link here",
    },
    videoCall: "/",
  },
];

export const cardData = shuffleArray(originalData);

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
      <div>
        <CarouselModel cardData={cardData} />
        <h1 className="title">Events</h1>
        <div className="events-section">
          <div className="search-area">
            <button className="signin-button" onClick={handleSignIn}>
              Sign In To Add Events
            </button>
            <SearchBox onSearch={handleSearch} />
          </div>
          <div className="card-model-area">
            <CardModel cardData={filteredData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
