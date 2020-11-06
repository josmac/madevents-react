import SimpleCard from "../SimpleCard/SimpleCard";
import NavBar from "../NavBar/NavBar";
import { useEventsContext } from "../../contexts/EventsContext";
import Map from "../Map/Map";
import Footer from "../Footer/Footer";

const Events = () => {
  const { events } = useEventsContext();

  // useEffect(() => {
  //   getEvents().then((response) => {
  //     setEvents(response.serviceList.service);
  //   });
  // }, []);

  const eventsSubset = events && events.slice(0, 4);

  const eventList = eventsSubset.map((event) => {
    return (
      <div className="col-sm mb-4">
        <SimpleCard event={event}></SimpleCard>
      </div>
    );
  });

  return (
    <div>
      <NavBar />

      <div className="container">
        {eventList ? (
          <div className="col-12">
            <div className="row mt-5" style={{ height: "55vh" }}>
              <Map props={events} />
            </div>
            <div className="mt-4 title">
              <p>Últimos eventos</p>
            </div>
            <div className="row">{eventList}</div>
          </div>
        ) : (
          "loading"
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Events;
