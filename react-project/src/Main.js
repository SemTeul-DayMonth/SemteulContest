import { useState, useContext, useEffect, Fragment } from "react";
import dayjs from "dayjs";
import "./static/Main.css";
import { getMonth } from "./utils";
import Nav from "./components/Nav";
import Month from "./components/Month";
import Todo from "./components/Todo";
import TodoModal from "./components/TodoModal";
import GlobalContext from "./context/GlobalContext";

function Main() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, setMonthIndex, isTodoModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  function prev_mon() {
    if (monthIndex <= 1) setMonthIndex(12);
    else setMonthIndex(monthIndex - 1);
  }
  function next_mon() {
    if (monthIndex >= 12) setMonthIndex(1);
    else setMonthIndex(monthIndex + 1);
  }

  return (
    <Fragment>
      {isTodoModal && <TodoModal />}
      <div className="app">
        <Nav />
        <div className="main">
          <div className="cal">
            <p className="year">
              {dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY")}
            </p>
            <div className="cal_nav">
              <div onClick={prev_mon}>&lt;</div>
              <p className="month">
                {dayjs(new Date(dayjs().year(), monthIndex))
                  .format("MMM")
                  .toUpperCase()}
              </p>
              <div onClick={next_mon}>&gt;</div>
            </div>
            <Month month={currentMonth} />
          </div>
        </div>
        <Todo />
      </div>
    </Fragment>
  );
}

export default Main;
