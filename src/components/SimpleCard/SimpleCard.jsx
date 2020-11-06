import React, { useEffect, useState } from "react";
import {
  favorites,
  getCategory,
  getDates,
  getUrl,
} from "../../services/api-client";
import ReactHtmlParser from "react-html-parser";
import "./SimpleCard.css";
import { Link, useHistory } from "react-router-dom";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFavoritesContext } from "../../contexts/FavoritesContext";
import { useAuthContext } from "../../contexts/AuthContext";

const SimpleCard = ({ event }) => {
  const title = event.basicData.name._cdata;
  const category = getCategory(event);
  const datesRange = getDates(event);
  const price = event.extradata.item[2]._cdata;
  const image = getUrl(event);
  const history = useHistory();

  const { favoritesData } = useFavoritesContext();
  const authContext = useAuthContext();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (authContext.user && favoritesData) {
      const favoritesContext = favoritesData.favorites;
      const favoriteClicked = favoritesContext.find(
        (f) => f.eventId === event._attributes.id
      );
      if (favoriteClicked) {
        setClicked(true);
      }
    }
  }, []);

  const data = {
    eventId: event._attributes.id,
    eventCategory: category,
    eventImg: image,
    eventTitle: title,
    eventDates: datesRange,
    eventPrices: price,
  };

  const handleClick = (e) => {
    if (authContext.user) {
      if (clicked) {
        setClicked(false);
      } else {
        setClicked(true);
      }
      favorites(data);
    } else {
      history.push("/login");
    }
  };

  return (
    <div className="card simple">
      <div className="card-header">
        <div className="row d-flex justify-content-between">
          <div className="ml-2">
            <h5>{category}</h5>
          </div>

          <div className="favorite" onClick={handleClick}>
            {clicked ? (
              <button className="heart">
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: "#cc0000 ", height: "px" }}
                />
              </button>
            ) : (
              <button className="heart">
                <FontAwesomeIcon
                  icon={farHeart}
                  style={{ color: "#cc0000 ", height: "px" }}
                />
              </button>
            )}
          </div>
        </div>
      </div>

      <img
        className="card-img-top"
        src={getUrl(event)}
        alt="card"
        style={{ height: "10%" }}
      />

      <div className="card-body">
        <div className="colapse-content">
          <Link
            className="eventDetails"
            to={`/events/${event._attributes.id}`}
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <h5 className="card-title">
              <b>{ReactHtmlParser(title)}</b>
            </h5>
          </Link>
          <p className="card-text">
            <span>📅&nbsp;&nbsp;&nbsp;</span>
            {datesRange}
          </p>
          <div className="card-text">
            <div className="row">
              &nbsp;&nbsp;&nbsp;&nbsp;💰&nbsp;&nbsp;
              {ReactHtmlParser(price)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleCard;
