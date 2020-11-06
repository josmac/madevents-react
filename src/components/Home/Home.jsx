import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useEventsContext } from "../../contexts/EventsContext";
import { getEvents } from "../../services/api-client";
import SimpleCard from "../SimpleCard/SimpleCard";
import "./Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";
import Loader from "react-loader-spinner";
import logo from "./assets/Logo.png";

const Home = () => {
  const { events, setEvents } = useEventsContext();

  useEffect(() => {
    if (!events) {
      getEvents().then((response) => {
        setEvents(response.serviceList.service);
      });
    }
  }, []);

  const randomEvents = () => {
    let randomNum = 0;
    const eventsNum = events.length;
    const eventsRandom = [];
    for (let i = 0; i < 4; i++) {
      randomNum = Math.floor(Math.random() * eventsNum);
      eventsRandom.push(events[randomNum]);
    }
    return eventsRandom;
  };

  const random = events ? randomEvents() : null;

  const eventList =
    events &&
    random.map((event) => {
      return (
        <div className="col-sm m-2">
          <div>
            <SimpleCard key={event._attributes.id} event={event}></SimpleCard>
          </div>
        </div>
      );
    });

  return (
    <div className="home-master">
      <div className="home">
        <div className="container">
          <div className="banner row m-4">
            <div className="col logo-container mt-4 h-100">
              <img src={logo} alt="logo" className="logo" />
            </div>
            <div className="col mt-4">
              <h1>Explora tus eventos culturales favoritos en Madrid</h1>
            </div>
            <div className=" arrow col">
              <Link
                className="home-button"
                to="/events"
                style={{ textDecoration: "none", color: "#fff" }}
              >
                <FontAwesomeIcon
                  icon={faArrowCircleRight}
                  style={{ color: "#FFF" }}
                />
              </Link>
            </div>
          </div>
          <div className="row">
            {eventList ? (
              eventList
            ) : (
              <div className="loader">
                <Loader
                  type="Puff"
                  color="#cc2549"
                  height={50}
                  width={50}
                  timeout={10000}
                />
              </div>
            )}
          </div>

          <div className="login row">
            <div className="col-sm m-4">
              <div className="row">
                <div className="col">
                  <h2>Consulta tu agenda de eventos. Accede</h2>
                </div>
                <div className=" arrow col">
                  <Link
                    className="home-button"
                    to="/login"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <FontAwesomeIcon
                      icon={faArrowCircleRight}
                      style={{ color: "#595959" }}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="signup col-sm m-4">
              <div className="row">
                <div className="col">
                  <h2>¿Quieres crear tu propia agenda cultural? Regístrate</h2>
                </div>
                <div className=" arrow col">
                  <Link
                    className="home-button"
                    to="/signup"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    <FontAwesomeIcon
                      icon={faArrowCircleRight}
                      style={{ color: "#595959" }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
