import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../../services/api-client";
import SimpleCard from "../SimpleCard/SimpleCard";
import Header from "../Header/Header";

const Events = () => {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    getEvents().then((response) => {
      setEvents(response.serviceList.service);
    });
  }, []);

  const eventList =
    events &&
    events.slice(0, 4).map((event) => {
      return (
        <div className="col-sm mt-4">
          <Link
            className="eventDetails"
            to={`/events/${event._attributes.id}`}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <div>
              <SimpleCard event={event}></SimpleCard>
            </div>
          </Link>
        </div>
      );
    });

  return (
    <div>
      <Header />
      <div className="container">
        {eventList ? (
          <div className="container">
            <div className="col-12">
              <div className="row mt-4">
                <h1>Últimos eventos</h1>
              </div>
              <div className="row">{eventList}</div>
            </div>
          </div>
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
};

export default Events;
