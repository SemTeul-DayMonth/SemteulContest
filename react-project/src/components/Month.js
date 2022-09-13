import React from "react";
import Day from "./Day";
import "../static/Month.css";

const weekDays = ["SON", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function Month({ month }) {
  return (
    <div className="cal_days">
      <div className="weekDays">
        {weekDays.map((day, i) => (
          <div className="day" key={i}>
            {day}
          </div>
        ))}
      </div>
      {month.map((row, i) => (
        <div className="week" key={i}>
          {row.map((day, idx) => (
            <Day day={day} rowIdx={i} key={idx} />
          ))}
        </div>
      ))}
    </div>
  );
}
