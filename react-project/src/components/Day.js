import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "currentDay"
      : "";
  }
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  console.log(monthIndex + 1 === Number(day.format("M")));
  return (
    <div className="day">
      {rowIdx === 0 && <p>{day.format("ddd").toUpperCase()}</p>}
      <p
        className={
          (day.get("day") === 0 ? "sunday " : "") +
          (day.get("day") === 6 ? "saturday " : "") +
          (Number(day.format("M")) !== monthIndex + 1 ? "otherDay " : "") +
          `${getCurrentDayClass()}`
        }
      >
        {day.format("DD")}
      </p>
    </div>
  );
}
