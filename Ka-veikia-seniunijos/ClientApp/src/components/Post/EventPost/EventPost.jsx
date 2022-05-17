import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendar,
  faClock,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export default function EventPost({ event }) {
  return (
    <>
      <h3 className="header__tertiary">Renginys</h3>
      <p className="post__header-event">
        <b>{event.Name}</b>
      </p>
      <p>{event.Description}</p>
      <div className="post__content-event">
        <div className="post__content-event--left">
          <p>
            <FontAwesomeIcon icon={faLocationDot} />
            <span className="post__content-event--description">
              <b> Vieta: </b>
              {event.Address}
            </span>
          </p>
          <p>
            <FontAwesomeIcon icon={faCalendar} />
            <span className="post__content-event--description">
              <b>Data: </b>
              {event.Date.slice(0, 10)}
            </span>
          </p>
        </div>
        <div className="post__content-event--right">
          <div className="post__content-event--times">
            <p>
              <FontAwesomeIcon icon={faClock} />
              <span className="post__content-event--description">
                <b>Pradžia: </b>
                {event.StartTime.slice(0, 5)}
              </span>
            </p>
            <p>
              <FontAwesomeIcon icon={faClock} />
              <span className="post__content-event--description">
                <b>Pabaiga: </b>
                {event.EndTime.slice(0, 5)}
              </span>
            </p>
          </div>

          <p>
            <FontAwesomeIcon icon={faMoneyBill} />
            <span className="post__content-event--description">
              <b>Kaina: </b>
              {event.Price === 0 ? "Nemokamas" : event.Price}
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

EventPost.propTypes = {
  event: PropTypes.shape({
    Name: PropTypes.string,
    Description: PropTypes.string,
    Address: PropTypes.string,
    Date: PropTypes.string,
    StartTime: PropTypes.string,
    EndTime: PropTypes.string,
    Price: PropTypes.number,
  }),
};
