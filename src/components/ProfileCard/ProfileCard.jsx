import React from "react";
import { favorites, profile } from "../../services/api-client";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFavoritesContext } from "../../contexts/FavoritesContext";
import "./ProfileCard.css";

const ProfileCard = ({ favorite }) => {
  const { setFavoritesData } = useFavoritesContext();

  const handleClick = async () => {
    try {
      await favorites(data);
      const favoriteList = await profile(favorite.user);
      setFavoritesData(favoriteList);
    } catch (err) {
      console.error(err);
    }
  };

  const {
    eventId,
    eventCategory,
    eventImg,
    eventTitle,
    eventPrices,
    eventDates,
  } = favorite;

  const data = {
    eventId: eventId,
    eventCategory: eventCategory,
    eventImg: eventImg,
    eventTitle: eventTitle,
    eventDates: eventDates,
    eventPrices: eventPrices,
  };

  return (
    <div className="col-sm mt-2 mb-2">
      <div className="card profile-card">
        <div className="card-header">
          <div className="row d-flex justify-content-between">
            <div className="ml-2">
              <h5>{eventCategory}</h5>
            </div>

            <button className="trash" onClick={handleClick}>
              <FontAwesomeIcon
                icon={faTrashAlt}
                style={{ color: "#fff", height: "px" }}
              />
            </button>
          </div>
        </div>

        <img
          className="card-img-top"
          src={eventImg}
          alt="card"
          style={{ height: "10%" }}
        />

        <div className="card-body">
          <div className="colapse-content">
            <Link
              className="eventDetails"
              to={`/events/${eventId}`}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <h5 className="card-title">
                <b>{ReactHtmlParser(eventTitle)}</b>
              </h5>
            </Link>

            <p className="card-text">
              <span>📅&nbsp;&nbsp;&nbsp;</span>
              {eventDates}
            </p>
            <div className="card-text">
              <div className="row">
                &nbsp;&nbsp;&nbsp;&nbsp;💰&nbsp;&nbsp;
                {ReactHtmlParser(eventPrices)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
