import React from "react";
import { Fragment, useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import PageList from "./PageList";
import { useNavigate, useParams } from "react-router-dom";
import "../static/DayView.css";
import BasicBtn from "./BasicBtn";

function DayView() {
  const { dayViewDate, setModalObj } = useContext(GlobalContext);
  const navigation = useNavigate();
  const params = useParams();
  return (
    <Fragment>
      <div className="cal_day_header">
        <h2>{dayViewDate.format("YYYY MMM DD")}</h2>
        <div style={{ display: "flex" }}>
          <BasicBtn
            onClick={() =>
              setModalObj({
                date: dayViewDate.format("YYYY-MM-DD"),
                type: "page",
              })
            }
          >
            +
          </BasicBtn>
          <BasicBtn
            onClick={() =>
              navigation(`/week/${params.year}/${params.month}/${params.week}`)
            }
          >
            back
          </BasicBtn>
        </div>
      </div>
      <div className="cal_day_body">
        <PageList pageDate={dayViewDate} />
      </div>
    </Fragment>
  );
}

export default DayView;
