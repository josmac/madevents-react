import React from "react";
import { getDays, getUrl } from "../../services/api-client";
import ReactHtmlParser from "react-html-parser";

const DetailedCard = ({ event }) => {
  console.log(event);
  const title = event.basicData.name._cdata;
  const category = event.extradata.categorias.categoria.item[1]._text;
  const startDate = event.extradata.fechas.rango.inicio._text;
  const endDate = event.extradata.fechas.rango.fin._text;
  const daysArray = event.extradata.fechas.rango.dias._text.split(",");
  const place = event.basicData.nombrert._text;
  const address = event.geoData.address._text;
  const price = event.extradata.item[2]._cdata;
  const description = event.basicData.body._cdata;

  return (
    <div className="card">
      <div className="card-header">{category}</div>
      <img
        className="card-img-top"
        src={getUrl(event)}
        alt="card"
        style={{ height: "10%" }}
      ></img>
      <div className="card-body">
        <h5 className="card-title">{ReactHtmlParser(title)}</h5>
        <p className="card-text">
          Del {startDate} al {endDate}
        </p>
        <p className="card-text">{place}</p>
        <p className="card-text">{address}</p>
        <p className="card-text">{getDays(daysArray)}</p>
        <div className="card-text">{ReactHtmlParser(price)}</div>
        <div className="card-text">{ReactHtmlParser(description)}</div>
      </div>
    </div>
  );
};

export default DetailedCard;
