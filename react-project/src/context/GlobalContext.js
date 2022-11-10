import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  weekIndex: 0,
  setWeekIndex: () => {},
  nowDate: {},
  setNowDate: () => {},
  modalDate: {},
  setModalDate: () => {},
  showSchedule: "",
  setShowSchedule: () => {},
});

export default GlobalContext;
