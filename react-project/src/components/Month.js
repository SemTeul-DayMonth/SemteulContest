import React, { Fragment, useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import "../static/Month.css";
import dayjs from "dayjs";
import { getMonth } from "../utils/daysMatrix";
import Day from "./Day";

const weekDays = ["SON", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function Month() {
  const {
    monthIndex,
    setMonthIndex,
    showSchedule,
    setShowSchedule,
    setWeekIndex,
  } = useContext(GlobalContext);
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  function prev_mon() {
    setMonthIndex(monthIndex - 1);
  }
  function next_mon() {
    setMonthIndex(monthIndex + 1);
  }

  return (
    <Fragment>
      <p className="year">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY")}
      </p>
      <div className="cal_month_header">
        <div onClick={prev_mon}>&lt;</div>
        <p className="month">
          {dayjs(new Date(dayjs().year(), monthIndex))
            .format("MMM")
            .toUpperCase()}
        </p>
        <div onClick={next_mon}>&gt;</div>
      </div>
      <div className="cal_month">
        <div className="weekDays">
          {weekDays.map((day, i) => (
            <div className="day" key={i}>
              {day}
            </div>
          ))}
        </div>
        {currentMonth.map((row, i) => (
          <div
            className="week"
            key={i}
            onClick={() => {
              setShowSchedule("week");
              setWeekIndex(i);
            }}
          >
            {row.map((day, idx) => (
              <Day month={monthIndex} day={day} key={idx} />
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  );
}
