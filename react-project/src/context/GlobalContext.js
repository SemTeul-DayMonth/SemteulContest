import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  weekIndex: 0,
  setWeekIndex: () => {},
  savedTodos: [],
  dispatchCalTodo: ({ type, payload }) => {},
  ShowModal: "",
  setShowModal: () => {},
  showSchedule: "month",
  setShowSchedule: () => {},
});

export default GlobalContext;
