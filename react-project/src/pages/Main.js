import { useState, useContext, useEffect, Fragment } from "react";
import GlobalContext from "../context/GlobalContext";
import "../static/Main.css";
import Nav from "../components/Nav";
import Month from "../components/Month";
import SideTodo from "../components/SideTodo";
import PageDateModal from "../components/PageDateModal";
import EventModal from "../components/EventModal";
import Week from "../components/Week";
import DayView from "../components/DayView";
import PageModal from "../components/PageModal";

function Main() {
  const { modalDate, showSchedule } = useContext(GlobalContext);

  return (
    <Fragment>
      {modalDate && (modalDate === "page" ? <PageModal /> : <PageDateModal />)}
      <div className="app">
        <Nav />
        <div className="main">
          <div className="cal">
            {showSchedule === "month" && <Month />}
            {showSchedule === "week" && <Week />}
            {showSchedule === "day" && <DayView />}
          </div>
        </div>
        <SideTodo />
      </div>
    </Fragment>
  );
}

export default Main;
