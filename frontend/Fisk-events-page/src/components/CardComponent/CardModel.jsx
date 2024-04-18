import React from "react";
import { Link } from "react-router-dom";
import "./cardStyle.css";
import { Divider } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";

function CardModel({ cardData }) {
  const truncateDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
      return description;
    }
    return `${description.substring(0, maxLength)}...`;
  };

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr + "T00:00:00");

    const options = { year: "numeric", month: "long", day: "2-digit" };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      dateObj
    );

    return formattedDate;
  };

  return (
    <div className="card-container">
      {cardData.map((card, index) => (
        <div key={index} className="card">
          <div>
            <img src={card.img} className="card-image" alt="voting" />
            <Link to={`/event/${index}`}>
              <h2 className="card-title">{card.title}</h2>
            </Link>
            <div className="card-body">
              <p className="card-description">
                {truncateDescription(card.description, 108)}
              </p>
              <div className="card-info">
                <p>
                  <CalendarOutlined /> {formatDate(card.date)}
                </p>
                <p>
                  <EnvironmentOutlined /> {card.location}
                </p>
              </div>
              <Divider className="custom-divider" />
              <p className="bottom">
                <TeamOutlined />
                {card.organization}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardModel;
