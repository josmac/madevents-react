import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";

mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9zbWFjIiwiYSI6ImNpa2JsMzNhajAwMnl3YWx5N2U3bnkwbmsifQ.WU5bDn29C0gtqoDANLF8kA";

const Map = ({ position }) => {
  console.log(position);
  const mapContainerRef = useRef(null);

  const latitude = parseFloat(position.latitude._text);
  const longitude = parseFloat(position.longitude._text);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: 15,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    const marker = new mapboxgl.Marker()
      .setLngLat([longitude, latitude])
      .addTo(map);

    return () => map.remove();
  }, []);

  return <div className="mapContainer" ref={mapContainerRef}></div>;
};

export default Map;
