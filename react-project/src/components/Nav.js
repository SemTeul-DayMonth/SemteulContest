import "../static/Nav.css";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const user = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    user.logout();
    navigate("/");
  }

  return (
    <div className="nav">
      <div className="nav_left">
        <div className="mainLogo">DayMonth</div>
        <div className="searchBar">
          <div className="searchIcon"></div>
          <input
            className="search"
            type="text"
            placeholder="Search for events"
            style={{ color: "#7B68EE" }}
          />
        </div>
      </div>
      <div className="nav_right">
        {user.user ? (
          <a onClick={logout}>Logout</a>
        ) : (
          <React.Fragment>
            <a href="login">Login</a>
            <a href="register">Register</a>
          </React.Fragment>
        )}

        <div className="modeSwitch">to-do</div>
        <a href="" className="settingsLink">
          settings
        </a>
      </div>
    </div>
  );
}
