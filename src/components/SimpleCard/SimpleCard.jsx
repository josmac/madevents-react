import React from "react";
import { getUrl } from "../../services/api-client";
import ReactHtmlParser from "react-html-parser";

const SimpleCard = ({ event }) => {
  console.log(event);
  const title = event.basicData.name._cdata;
  const category = event.extradata.categorias.categoria.item[1]._text;
  const startDate = event.extradata.fechas.rango.inicio._text;
  const endDate = event.extradata.fechas.rango.fin._text;
  const price = event.extradata.item[2]._cdata;

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
        <div className="card-text">{ReactHtmlParser(price)}</div>
      </div>
    </div>
  );
};

export default SimpleCard;
