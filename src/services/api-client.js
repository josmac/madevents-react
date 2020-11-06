import axios from "axios";
import xmljs from "xml-js";

const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3001",
  withCredentials: true,
});

http.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.assign("/");
    }

    return Promise.reject(error);
  }
);

export const login = ({ email, password }) =>
  http.post("/login", { email, password });

export const favorites = (data) => http.post("/favorites", data);

export const profile = (userId) => http.get(`/profile/${userId}`);

export const logout = () => http.post("/logout");

export const createUser = ({
  firstName,
  lastName,
  email,
  password,
  avatar,
}) => {
  const formData = new FormData();

  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("avatar", avatar);

  return http.post("/users", formData);
};

export const getEvents = () => {
  return axios
    .get(
      "https://cors-anywhere.herokuapp.com/https://www.esmadrid.com/opendata/agenda_v1_es.xml"
    )
    .then((res) => {
      const events = JSON.parse(
        xmljs.xml2json(res.data, { compact: true, spaces: 2 })
      );
      console.log("request");
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

export const getDates = (e) => {
  if (Array.isArray(e.extradata.fechas.rango)) {
    return `del ${e.extradata.fechas.rango[0].inicio._text} al ${e.extradata.fechas.rango[0].fin._text} y del ${e.extradata.fechas.rango[1].inicio._text} al ${e.extradata.fechas.rango[1].fin._text}`;
  } else {
    return `del ${e.extradata.fechas.rango.inicio._text} al ${e.extradata.fechas.rango.fin._text}`;
  }
};

export const getDaysArray = (e) => {
  if (Array.isArray(e.extradata.fechas.rango)) {
    return e.extradata.fechas.rango[0].dias._text.split(",");
  } else if (e.extradata.fechas.rango === undefined) {
    return "Sin datos";
  } else {
    return e.extradata.fechas.rango.dias._text.split(",");
  }
};

export const search = (search) => {
  console.log(search);
};

export const getCategory = (e) => {
  if (e.extradata.categorias.categoria.item === undefined) {
    return "Sin categoría";
  } else {
    return e.extradata.categorias.categoria.item[1]._text;
  }
};
