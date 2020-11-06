import React from "react";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import "./NavBar.css";
import { logout } from "../../services/api-client";
import logo from "./assets/Logo.png";

const NavBar = () => {
  const authContext = useAuthContext();
  const history = useHistory();

  const handleLogout = async () => {
    try {
      await logout();
      authContext.logout();
      history.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  return authContext.user ? (
    <div className="navbar">
      <div className="row m-2">
        <div className="home-icon">
          <Link to="/">
            <img src={logo} alt="nav-logo" className="nav-logo" />
          </Link>
        </div>
        <div className="ml-4 mt-1">
          <Link to="/events">
            <button className="events-btn">
              <FontAwesomeIcon icon={faCalendarAlt} style={{ color: "#fff" }} />
            </button>
          </Link>
        </div>
      </div>

      <div className="row m-2">
        <div className="avatar mr-4">
          <Link to={`/profile/${authContext.user.id}`}>
            <img src={authContext.user.avatar} alt="avatar" />
          </Link>
        </div>

        <button className="logout" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} style={{ color: "#fff" }} />
        </button>
      </div>
    </div>
  ) : (
    <div className="navbar">
      <div className="row m-2">
        <div className="home-icon">
          <Link to="/">
            <img src={logo} alt="nav-logo" className="nav-logo" />
          </Link>
        </div>
        <div className="ml-4 mt-1">
          <Link to="/events">
            <button className="events-btn">
              <FontAwesomeIcon icon={faCalendarAlt} style={{ color: "#fff" }} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
