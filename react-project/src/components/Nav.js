import "../static/Nav.css";
import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

export default function Nav() {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const { setShowSchedule } = useContext(GlobalContext);

  function logout() {
    user.logout();
    navigate("month/" + dayjs().format("YYYY/MM"));
  }

  return (
    <div className="nav">
      <div className="nav_left">
        <a href="/" className="mainLogo">
          DayMonth
        </a>
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
            <a href="/login">Login</a>
            <a href="/register">Register</a>
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
