import React from "react";
import { Fragment, useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import TodoList from "./TodoList";

function DayView() {
  const { nowDate, showSchedule, setShowSchedule } = useContext(GlobalContext);

  return (
    <Fragment>
      <div className="cal_day_header">
        <h2>{nowDate.format("YYYY MMM DD")}</h2>
        <button onClick={() => setShowSchedule("week")}>back</button>
      </div>
      <div className="cal_day_body">
        <TodoList todoDate={nowDate} />
      </div>
    </Fragment>
  );
}

export default DayView;
