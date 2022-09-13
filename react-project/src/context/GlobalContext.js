import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  savedTodos: [],
  dispatchCalTodo: ({ type, payload }) => {},
  isTodoModal: false,
  setIsTodoModal: () => {},
});

export default GlobalContext;
