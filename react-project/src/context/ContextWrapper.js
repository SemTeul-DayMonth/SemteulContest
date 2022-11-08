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
  const [ShowModal, setShowModal] = useState("");
  const [showSchedule, setShowSchedule] = useState("month");

  useEffect(() => {
    if (weekIndex > 4) {
      setWeekIndex(0);
      setMonthIndex((cur) => cur + 1);
    } else if (weekIndex < 0) {
      setWeekIndex(4);
      setMonthIndex((cur) => cur - 1);
    }
  }, [weekIndex]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        weekIndex,
        setWeekIndex,
        ShowModal,
        setShowModal,
        showSchedule,
        setShowSchedule,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
