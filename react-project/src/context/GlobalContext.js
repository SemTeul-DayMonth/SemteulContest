import React from "react";

const GlobalContext = React.createContext({
  pageMode: "",
  setPageMode: () => {},
  monthIndex: 0,
  setMonthIndex: (index) => {},
  weekIndex: 0,
  setWeekIndex: () => {},
  dayViewDate: {},
  setDayViewDate: () => {},
  modalObj: {},
  setModalObj: () => {},
  showSchedule: "",
  setShowSchedule: () => {},
});

export default GlobalContext;
