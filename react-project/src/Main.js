import { useState, useContext, useEffect, Fragment } from "react";
import GlobalContext from "./context/GlobalContext";
import "./static/Main.css";
import Nav from "./components/Nav";
import Month from "./components/Month";
import Todo from "./components/Todo";
import TodoModal from "./components/TodoModal";
import EventModal from "./components/EventModal";
import Week from "./components/Week";

function Main() {
  const { ShowModal, showSchedule } = useContext(GlobalContext);

  return (
    <Fragment>
      {ShowModal === "todo" && <TodoModal />}
      {ShowModal === "event" && <EventModal />}
      <div className="app">
        <Nav />
        <div className="main">
          <div className="cal">
            {showSchedule === "month" && <Month />}
            {showSchedule === "week" && <Week />}
          </div>
        </div>
        <Todo />
      </div>
    </Fragment>
  );
}

export default Main;
