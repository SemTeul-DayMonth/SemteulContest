import { Fragment, useContext, useEffect, useState } from "react";
import "../static/Week.css";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import { getMonth } from "../utils/daysMatrix";
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
  let currentMonth = getMonth(monthIndex);
  const [currentWeek, setCurrentWeek] = useState(currentMonth[weekIndex]);

  function prev_week() {
    if (weekIndex > 0) {
      setWeekIndex(weekIndex - 1);
    } else {
      setWeekIndex(getMonth(monthIndex - 1)[6] - 1);
      setMonthIndex((cur) => cur - 1);
    }
  }
  function next_week() {
    if (weekIndex < currentMonth[6] - 1) {
      setWeekIndex(weekIndex + 1);
    } else {
      setWeekIndex(0);
      setMonthIndex((cur) => cur + 1);
    }
  }

  useEffect(() => {
    setCurrentWeek(currentMonth[weekIndex]);
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
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MM")}
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
