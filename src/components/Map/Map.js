import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "./Map.css";
import { getUrl } from "../../services/api-client";
import { useEventsContext } from "../../contexts/EventsContext";
import ReactHtmlParser from "react-html-parser";


mapboxgl.accessToken =
  "pk.eyJ1Ijoiam9zbWFjIiwiYSI6ImNpa2JsMzNhajAwMnl3YWx5N2U3bnkwbmsifQ.WU5bDn29C0gtqoDANLF8kA";

const Map = ({ props }) => {
  const { events } = useEventsContext();

  

  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (Array.isArray(props)) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-3.70256, 40.4165],
        zoom: 10,
      });

      map.addControl(new mapboxgl.NavigationControl(), "top-right");

      events.forEach((event) => {
        const latitude = parseFloat(event.geoData.latitude._text);
        const longitude = parseFloat(event.geoData.longitude._text);


        if (!latitude || !longitude) {
          return;
        }
        const imageURL = getUrl(event);
        const title = ReactHtmlParser(event.basicData.title._cdata)
        const price = event.extradata.item[2]._cdata;
        
        new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .setPopup(
            new mapboxgl.Popup({ offset: 20} ).setHTML(
              '<div><div><img src="' + imageURL + '" alt="event" style="width:120px"/></div><p style="width:120px; padding-top:10px; text-align:center ; color:#cc2549">' + title +'</p> <p style="width:120px"/></div><div style="width:120px; text-align:center ; color:#000">' + price +'</div></div>'
            )
          )
          .addTo(map);
      });

      return () => map.remove();
    } else {
      const latitude = parseFloat(props.geoData.latitude._text);
      const longitude = parseFloat(props.geoData.longitude._text);
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [longitude, latitude],
        zoom: 15,
      });

      map.addControl(new mapboxgl.NavigationControl(), "top-right");

      new mapboxgl.Marker().setLngLat([longitude, latitude]).addTo(map);
      return () => map.remove();
    }
  }, []);

  return <div className="mapContainer container" ref={mapContainerRef}></div>;
};

export default Map;
