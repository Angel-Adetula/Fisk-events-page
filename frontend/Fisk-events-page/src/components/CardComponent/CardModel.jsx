import "./cardStyle.css";
import { Divider } from "antd";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  TeamOutlined,
} from "@ant-design/icons";

function CardModel({ cardData }) {
  return (
    <div className="card-container">
      {cardData.map((card, index) => (
        <div key={index} className="card">
          <div>
            <img src={card.img} className="card-image" alt="voting" />
            <div className="card-body">
              <h2 className="card-title">{card.title}</h2>
              <p className="card-description">{card.description}</p>
              <div className="card-info">
                <p>
                  <CalendarOutlined /> {card.date}
                </p>
                <p>
                  <EnvironmentOutlined /> {card.location}
                </p>
                <Divider />
                <p>
                  <TeamOutlined />
                  {card.organization}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardModel;
