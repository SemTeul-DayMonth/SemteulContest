import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ day, rowIdx }) {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "currentDay"
      : "";
  }

  return (
    <div className="day">
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
