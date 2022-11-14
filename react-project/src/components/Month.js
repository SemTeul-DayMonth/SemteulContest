import React, { Fragment, useContext, useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import GlobalContext from "../context/GlobalContext";
import "../static/Month.css";
import dayjs from "dayjs";
import { AuthContext } from "../context/auth";
import { getMonth } from "../utils/daysMatrix";
import Day from "./Day";
import { FETCH_TODOS_QUERY } from "../utils/querys";
import { getPageCounts } from "../utils/util";
import { useNavigate, useParams } from "react-router-dom";
import CalHeader from "./CalHeader";

const weekDays = ["SON", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function Month() {
  const params = useParams();
  let yearIndex = Number(params.year);
  let monthIndex = Number(params.month);
  const [currentMonth, setCurrentMonth] = useState(
    getMonth(monthIndex - 1).slice(0, 6)
  );

  const { user } = useContext(AuthContext);
  const userId = user?.id;
  let currentDate = dayjs(new Date(yearIndex, monthIndex - 1));
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !userId) {
      window.location.replace("/");
    }
  }, [user]);

  const { error, data } = useQuery(FETCH_TODOS_QUERY, {
    variables: { userId },
  });

  const pageCounts = getPageCounts(data, currentDate);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex - 1).slice(0, 6));
  }, [monthIndex]);

  function prev_mon() {
    if (monthIndex > 1) {
      monthIndex -= 1;
    } else {
      monthIndex = 12;
      yearIndex -= 1;
    }
  }
  function next_mon() {
    if (monthIndex < 12) {
      monthIndex += 1;
    } else {
      monthIndex = 1;
      yearIndex += 1;
    }
  }

  return (
    <Fragment>
      <CalHeader mode="month" currentMonth={currentMonth} />

      <div className="cal_month">
        <div className="weekDays">
          {weekDays.map((day, i) => (
            <div className="day" key={i}>
              {day}
            </div>
          ))}
        </div>
        {currentMonth.map((row, i) => (
          <div
            className="week"
            key={i}
            onClick={() => {
              navigate(`/week/${yearIndex}/${monthIndex}/${i}`);
            }}
          >
            {row.map((day, idx) => (
              <Day
                month={monthIndex}
                day={day}
                pageCount={pageCounts[day.format("D")]}
                key={idx}
              />
            ))}
          </div>
        ))}
      </div>
    </Fragment>
  );
}
