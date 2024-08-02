import "../static/Nav.css";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

export default function Nav() {
  const user = useContext(AuthContext);
  const navigate = useNavigate();
  const { pageMode, setPageMode } = useContext(GlobalContext);

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
            style={{ color: "#7b417b" }}
          />
          <img
            className="searchImg"
            src={process.env.PUBLIC_URL + "/img/magn.png"}
          ></img>
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

        <div
          onClick={() => setPageMode(pageMode === "page" ? "todo" : "page")}
          className="modeSwitch"
        >
          {pageMode}
        </div>
      </div>
    </div>
  );
}
