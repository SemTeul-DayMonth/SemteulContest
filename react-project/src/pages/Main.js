import { useState, useContext, useEffect, Fragment } from "react";
import GlobalContext from "../context/GlobalContext";
import "../static/Main.css";
import Nav from "../components/Nav";
import Month from "../components/Month";
import SideTodo from "../components/SideTodo";
import PageModal from "../components/PageModal";
import Week from "../components/Week";
import DayView from "../components/DayView";
import PageView from "../components/PageView";
import Calender from "./Calender";
import Repository from "../components/Repository";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function Main() {
  const { modalObj, showSchedule } = useContext(GlobalContext);
  const navigate = useNavigate();
  useEffect(() => {
    navigate("month/" + dayjs().format("YYYY/MM"));
  }, []);

  return (
    <Fragment>
      {modalObj.type === "page" && <PageModal />}
      {modalObj.type === "pageView" && <PageView />}
      <div className="app">
        <Nav />
        <div className="main">
          <Routes>
            <Route path="/*" element={<Calender />} />
            {/* <Route path="/repo/*" element={<Repository />} /> */}
            <Route path="/repo/*" element={<Repository />} />
          </Routes>
        </div>
        <SideTodo />
      </div>
    </Fragment>
  );
}

export default Main;
