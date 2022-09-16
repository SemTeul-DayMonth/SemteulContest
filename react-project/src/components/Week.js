import { Fragment, useContext, useEffect, useState } from "react";
import "../static/Week.css";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import { getMonth } from "../utils";
import Day from "./Day";

export default function Week() {
  const {
    monthIndex,
    setMonthIndex,
    weekIndex,
    setWeekIndex,
    setShowSchedule,
  } = useContext(GlobalContext);
  const weekDays = ["SON", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const [currentWeek, setCurrentWeek] = useState(
    getMonth(monthIndex)[weekIndex]
  );

  console.log(currentWeek, monthIndex, weekIndex);

  function prev_week() {
    if (weekIndex > 0) {
      setWeekIndex(weekIndex - 1);
    } else {
      setWeekIndex(4);
      setMonthIndex((cur) => cur - 1);
    }
  }
  function next_week() {
    if (weekIndex < 4) {
      setWeekIndex(weekIndex + 1);
    } else {
      setWeekIndex(0);
      setMonthIndex((cur) => cur + 1);
    }
  }

  useEffect(() => {
    setCurrentWeek(getMonth(monthIndex)[weekIndex]);
  }, [weekIndex]);

  return (
    <Fragment>
      <div className="cal_week_header">
        <div className="prev_week" onClick={prev_week}>
          &lt;
        </div>
        <p
          className="month"
          onClick={() => {
            setShowSchedule("month");
          }}
        >
          {dayjs(new Date(dayjs().year(), monthIndex))
            .format("MMM")
            .toUpperCase()}
        </p>
        <div className="next_week" onClick={next_week}>
          &gt;
        </div>
      </div>
      <div className="cal_week_days">
        <div className="weekDays">
          {weekDays.map((day, i) => (
            <div className="day" key={i}>
              {day}
            </div>
          ))}
        </div>
        <div className="week">
          {currentWeek.map((day, idx) => (
            <Day month={monthIndex} day={day} key={idx} />
          ))}
        </div>
      </div>
      <div className="cal_week_schedule">
        <div className="sonSche"></div>
        <div className="monSche"></div>
        <div className="tueSche"></div>
        <div className="wedSche"></div>
        <div className="thuSche"></div>
        <div className="friSche"></div>
        <div className="satSche"></div>
      </div>
    </Fragment>
  );
}
