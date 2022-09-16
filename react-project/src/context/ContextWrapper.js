import React, { useState, useEffect, useReducer, useMemo } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from "dayjs";

function savedTodosReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}

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
  const [savedTodos, dispatchCalTodo] = useReducer(
    savedTodosReducer,
    [],
    initTodos
  );

  useEffect(() => {
    if (weekIndex > 4) {
      setWeekIndex(0);
      setMonthIndex((cur) => cur + 1);
    } else if (weekIndex < 0) {
      setWeekIndex(4);
      setMonthIndex((cur) => cur - 1);
    }
  }, [weekIndex]);

  useEffect(() => {
    localStorage.setItem("savedTodos", JSON.stringify(savedTodos));
  }, [savedTodos]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        weekIndex,
        setWeekIndex,
        savedTodos,
        dispatchCalTodo,
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
