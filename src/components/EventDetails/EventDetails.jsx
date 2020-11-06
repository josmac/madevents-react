import React from "react";
import { useEventsContext } from "../../contexts/EventsContext";
import DetailedCard from "../DetailedCard/DetailedCard";
import NavBar from "../NavBar/NavBar";
import Map from "../Map/Map";
import Footer from "../Footer/Footer";

const EventDetails = (props) => {
  const { events } = useEventsContext();

  const event = events?.find((e) => e._attributes.id === props.match.params.id);

  const loadedCard = () => {
    return event ? <DetailedCard event={event} /> : "loading";
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="row">
          <div className="col-sm m-4">{loadedCard()}</div>
          <div className="col-sm m-4">
            {event ? <Map props={event} /> : "loading"}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventDetails;
