import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { cardData } from "./Events";
import "./style/eventDetails.css";
import {
  VideoCameraOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";

function EventDetails() {
  const { eventId } = useParams();
  const event = cardData[eventId];
  const capitalizedEventType =
    event.eventType.charAt(0).toUpperCase() + event.eventType.slice(1);
  const handleSignUp = () => {
    window.location.href = "/sign-in";
  };

  const convertTime = (timeString) => {
    var timeArr = timeString.split(":");
    var hours = parseInt(timeArr[0]);
    var minutes = parseInt(timeArr[1]);

    var period = hours >= 12 ? "pm" : "am";

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;

    var formattedTime = hours + ":" + minutes + " " + period;

    return formattedTime;
  };

  return (
    <>
      <Header />
      <div className="event-details-container">
        <div className="event-details-header">
          <h2>{event.title}</h2>
          <div className="date">
            <p className="event-date">Date: {event.date}</p>
            {event.time && (
              <p className="event-time">Time: {convertTime(event.time)}</p>
            )}
          </div>
        </div>
        <div className="event-details-image-container">
          <div>
            <img src={event.img} alt="Event" className="event-details-image" />
            <div className="event-details-organization">
              <p>
                {" "}
                <TeamOutlined /> Hosted by {event.organization}
              </p>
              <button className="signup-button" onClick={handleSignUp}>
                Sign up for event
              </button>
            </div>
          </div>
          <div className="description">
            <p>{event.description}</p>
            <div className="detail-container">
              <p>
                <EnvironmentOutlined /> &nbsp;&nbsp; {event.location}
              </p>
              <p>
                <VideoCameraOutlined />
                &nbsp; &nbsp; To join virtually, click{" "}
                <a href={event.videoCall}>here</a>
              </p>
              <p className="detail-header">Event Type</p>
              <p className="meta-data">{capitalizedEventType}</p>
              <p className="detail-header">Tags</p>
              <p className="meta-data">{event.tags.join(", ")}</p>
              <p className="detail-header">Perks and Volunteering</p>
              <p className="detail-header-2">
                Hours Offered: {event.PandV["Hours Offered"]}
              </p>
              <p className="detail-header-2">
                Volunteers Needed: {event.PandV["Volunteers Needed"]}
              </p>
              <p className="detail-header-2">
                Volunteer Hours: {event.PandV["Volunteer Hours"]}
              </p>
              <p className="detail-header-2">
                Volunteer Link:{" "}
                <a href={event.PandV["Volunteer Link"]}>
                  {event.PandV["Volunteer Link"]}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventDetails;
