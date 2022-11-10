import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function initTodos() {
  const storageTodos = localStorage.getItem("savedTodos");
  const parsedTodos = storageTodos ? JSON.parse(storageTodos) : [];
  return parsedTodos;
}

export default function ContextWrapper(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [weekIndex, setWeekIndex] = useState(0);
  const [nowDate, setNowDate] = useState(dayjs());
  const [modalDate, setModalDate] = useState("");
  const [showSchedule, setShowSchedule] = useState("month");

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        weekIndex,
        setWeekIndex,
        nowDate,
        setNowDate,
        modalDate,
        setModalDate,
        showSchedule,
        setShowSchedule,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
