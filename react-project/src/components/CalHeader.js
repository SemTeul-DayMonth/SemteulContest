import React, { Fragment, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

export default function CalHeader({ mode, prevWeekCount, currentMonth }) {
  const params = useParams();
  const navigate = useNavigate();
  let year = Number(params.year);
  let month = Number(params.month);
  let week = Number(params.week);
  let currentDate = dayjs(new Date(year, month - 1));

  function prev_week() {
    week -= 1;
    if (week < 0) {
      week = prevWeekCount - 2;
      month -= 1;
      if (month < 1) {
        month = 12;
        year -= 1;
      }
    }
  }
  function next_week() {
    if (currentMonth[week][0] < currentMonth[week + 1][0]) {
      week += 1;
    } else {
      week = 0;
      month += 1;
      if (month > 12) {
        month = 1;
        year += 1;
      }
    }
  }

  function prev_mon() {
    month -= 1;
    if (month < 1) {
      month = 12;
      year -= 1;
    }
  }
  function next_mon() {
    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }
  }

  return (
    <Fragment>
      <div className={"cal_" + mode + "_header"}>
        {/* prev */}
        <div
          className="prev_week"
          onClick={() => {
            if (mode === "week") {
              prev_week();
              navigate(`/week/${year}/${month}/${week}`);
            }
            if (mode === "month") {
              prev_mon();
              navigate(`/month/${year}/${month}/`);
            }
          }}
        >
          &lt;
        </div>

        {/* Show Date */}
        {mode === "week" && (
          <p
            className="month"
            onClick={() => {
              navigate(`/month/${year}/${month}`);
            }}
          >
            {currentDate.format("YYYY ") +
              currentDate.format("MMM").toUpperCase()}
          </p>
        )}
        {mode === "month" && (
          <p className="month">
            {currentDate.format("YYYY ") +
              currentDate.format("MMM").toUpperCase()}
          </p>
        )}

        {/* next */}
        <div
          className="next_week"
          onClick={() => {
            if (mode === "week") {
              next_week();
              navigate(`/week/${year}/${month}/${week}`);
            }
            if (mode === "month") {
              next_mon();
              navigate(`/month/${year}/${month}/`);
            }
          }}
        >
          &gt;
        </div>
      </div>
    </Fragment>
  );
}
