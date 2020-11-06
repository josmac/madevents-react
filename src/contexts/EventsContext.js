import React, { useState, createContext, useContext } from "react";

const EventsContext = createContext();

export const useEventsContext = () => useContext(EventsContext);

export const EventsContextProvider = ({ children }) => {
  const [events, setEvents] = useState(null);

  const value = { events, setEvents };

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
};
