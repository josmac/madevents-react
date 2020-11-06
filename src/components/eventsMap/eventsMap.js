import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9zbWFjIiwiYSI6ImNpa2JsMzNhajAwMnl3YWx5N2U3bnkwbmsifQ.WU5bDn29C0gtqoDANLF8kA";

const EventsMap = ({ position }) => {
  console.log(position);
  const eventsMapRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: eventsMapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-3, 40],
      zoom: 8,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    return () => map.remove();
  }, []);

  return <div className="mapContainer" ref={eventsMapRef}></div>;
};

export default EventsMap;
