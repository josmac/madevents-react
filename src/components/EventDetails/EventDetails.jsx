import React, { useState, useEffect } from "react";
import { getEvents } from "../../services/api-client";
import DetailedCard from "../DetailedCard/DetailedCard";
import Header from "../Header/Header";
import Map from "../Map/Map";

const EventDetails = (props) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    getEvents().then((response) => {
      const eventData = response.serviceList.service;
      const eventDetails = eventData.find(
        (e) => e._attributes.id === props.match.params.id
      );
      setEvent(eventDetails);
    });
  }, []);

  console.log(event);

  const loadedCard = () => {
    return event ? <DetailedCard event={event} /> : "loading";
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-sm-6">{loadedCard()}</div>
          <div className="col-sm-6">
            {event ? <Map position={event.geoData} /> : "loading"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
