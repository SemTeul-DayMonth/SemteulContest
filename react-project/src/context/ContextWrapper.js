import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function initTodos() {
  const storageTodos = localStorage.getItem("savedTodos");
  const parsedTodos = storageTodos ? JSON.parse(storageTodos) : [];
  return parsedTodos;
}

export default function ContextWrapper(props) {
  const [pageMode, setPageMode] = useState("page");
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [weekIndex, setWeekIndex] = useState(0);
  const [dayViewDate, setDayViewDate] = useState(dayjs());
  const [modalObj, setModalObj] = useState({
    date: dayjs(),
    type: "",
    parent: "",
  });
  const [showSchedule, setShowSchedule] = useState("month");

  return (
    <GlobalContext.Provider
      value={{
        pageMode,
        setPageMode,
        monthIndex,
        setMonthIndex,
        weekIndex,
        setWeekIndex,
        dayViewDate,
        setDayViewDate,
        modalObj,
        setModalObj,
        showSchedule,
        setShowSchedule,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
