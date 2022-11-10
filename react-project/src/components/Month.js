import React, { Fragment, useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import GlobalContext from "../context/GlobalContext";
import "../static/Month.css";
import dayjs from "dayjs";
import { AuthContext } from "../context/auth";
import { getMonth } from "../utils/daysMatrix";
import Day from "./Day";
import FETCH_TODOS_QUERY from "../utils/querys";

const weekDays = ["SON", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function Month() {
  const {
    monthIndex,
    setMonthIndex,
    showSchedule,
    setShowSchedule,
    setWeekIndex,
  } = useContext(GlobalContext);
  const [currentMonth, setCurrentMonth] = useState(getMonth().slice(0, 6));

  const { user } = useContext(AuthContext);
  const userId = user?.id;
  let pageCounts = new Array(31);
  let currentDate = dayjs(new Date(dayjs().year(), monthIndex));

  pageCounts.fill(0);

  useEffect(() => {
    if (user && !userId) {
      window.location.replace("/");
    }
  }, [user]);

  const { error, data } = useQuery(FETCH_TODOS_QUERY, {
    variables: { userId },
  });

  if (data) {
    data.getPages.pages.forEach(({ date }) => {
      if (dayjs(date).format("YYYY-MM") === currentDate.format("YYYY-MM")) {
        const dayIdx = dayjs(date).format("D");
        pageCounts[dayIdx] += 1;
      }
    });
  }

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex).slice(0, 6));
  }, [monthIndex]);

  function prev_mon() {
    setMonthIndex(monthIndex - 1);
  }
  function next_mon() {
    setMonthIndex(monthIndex + 1);
  }

  return (
    <Fragment>
      <p className="year">{currentDate.format("YYYY")}</p>
      <div className="cal_month_header">
        <div onClick={prev_mon}>&lt;</div>
        <p className="month">{currentDate.format("MM")}</p>
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
              <Day
                month={monthIndex}
                day={day}
                pageCount={pageCounts[day.format("D")]}
                key={idx}
              />
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  );
}
