import React from "react";
import { Fragment, useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { AuthContext } from "../context/auth";
import { useForm } from "../utils/hooks";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PageList from "./PageList";
import { useNavigate, useParams } from "react-router-dom";
import "../static/DayView.css";

function DayView() {
  const { dayViewDate, setModalObj } = useContext(GlobalContext);
  const navigation = useNavigate();
  const params = useParams();
  return (
    <Fragment>
      <div className="cal_day_header">
        <h2>{dayViewDate.format("YYYY MMM DD")}</h2>
        <button
          onClick={() =>
            setModalObj({
              date: dayViewDate.format("YYYY-MM-DD"),
              type: "page",
            })
          }
        >
          +
        </button>
        <button
          onClick={() =>
            navigation(`/week/${params.year}/${params.month}/${params.week}`)
          }
        >
          back
        </button>
      </div>
      <div className="cal_day_body">
        <PageList pageDate={dayViewDate} />
      </div>
    </Fragment>
  );
}

export default DayView;
