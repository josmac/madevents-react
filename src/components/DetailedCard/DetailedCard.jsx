import React from "react";
import {
  getDates,
  getDays,
  getDaysArray,
  getUrl,
} from "../../services/api-client";
import ReactHtmlParser from "react-html-parser";

const DetailedCard = ({ event }) => {
  const title = event.basicData.name._cdata;
  const category = event.extradata.categorias.categoria.item[1]._text;
  const datesRange = getDates(event);
  const daysArray = getDaysArray(event);
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
          <span>📅&nbsp;&nbsp;&nbsp;</span>
          {getDays(daysArray)}
          {datesRange}
        </p>
        <p className="card-text">
          📍 &nbsp;&nbsp;{place},{" "}
          {address.startsWith("de") ? "Calle " + address : address}
        </p>
        <p className="card-text"></p>
        <div className="card-text">
          <div className="row">
            &nbsp;&nbsp;&nbsp;&nbsp;💰&nbsp;&nbsp;
            {ReactHtmlParser(price)}
          </div>
        </div>
        <div className="card-text">{ReactHtmlParser(description)}</div>
      </div>
    </div>
  );
};

export default DetailedCard;
