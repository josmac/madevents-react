import axios from "axios";
import xmljs from "xml-js";

// axios.defaults.withCredentials = true; // Very important so that cookies will be set and sent with every request

// const app = axios.create({
//   baseURL: "http://localhost:3001",
// });

// export const getEvents = () => {
//   return axios.get("https://ih-beers-api2.herokuapp.com/beers").then(res => {
//     console.log(res.data)
//   });
// };

export const getEvents = () => {
  return axios
    .get(
      "https://cors-anywhere.herokuapp.com/https://www.esmadrid.com/opendata/agenda_v1_es.xml"
    )
    .then((res) => {
      const events = JSON.parse(
        xmljs.xml2json(res.data, { compact: true, spaces: 2 })
      );
      return events;
    });
};

export const getDays = (daysArray) => {
  const dayNames = {
    1: "Lunes",
    2: "Martes",
    3: "Miércoles",
    4: "Jueves",
    5: "Viernes",
    6: "Sábado",
    7: "Domingo",
  };
  let dayNumber;
  let days = "";
  for (let i = 0; i < daysArray.length; i++) {
    dayNumber = daysArray[i];
    days += `${dayNames[dayNumber]} `;
  }
  return days;
};

export const getUrl = (e) => {
  if (Array.isArray(e.multimedia.media)) {
    return e.multimedia.media[0].url._text;
  } else {
    return e.multimedia.media.url._text;
  }
};
