import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <Link
        className="home-button"
        to="/events"
        style={{ textDecoration: "none", color: "#000" }}
      >
        Explora Madrid
      </Link>
    </div>
  );
};

export default Home;
