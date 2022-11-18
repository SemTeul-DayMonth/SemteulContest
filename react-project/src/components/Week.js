import { Fragment, useContext, useEffect, useState } from "react";
import "../static/Week.css";
import { useQuery } from "@apollo/client";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import { AuthContext } from "../context/auth";
import { getMonth } from "../utils/daysMatrix";
import Day from "./Day";
import { FETCH_TODOS_QUERY } from "../utils/querys";
import { getPageCounts, changeDateIndex } from "../utils/util";
import { useNavigate, useParams } from "react-router-dom";
import PageList from "./PageList";
import CalHeader from "./CalHeader";

export default function Week() {
  const params = useParams();
  let yearIndex = Number(params.year);
  let monthIndex = Number(params.month);
  let weekIndex = Number(params.week);
  const { pageMode } = useContext(GlobalContext);
  const { user } = useContext(AuthContext);
  const userId = user?.id;
  const weekDays = ["SON", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let currentMonth = getMonth(yearIndex, monthIndex - 1);
  const [currentWeek, setCurrentWeek] = useState(currentMonth[weekIndex]);
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

  const pageCounts = getPageCounts(pageMode, data, currentDate);

  function prev_week() {
    weekIndex -= 1;
    [yearIndex, monthIndex, weekIndex] = changeDateIndex(
      yearIndex,
      monthIndex,
      weekIndex,
      getMonth(yearIndex, monthIndex - 2)[6]
    );
  }
  function next_week() {
    if (currentMonth[weekIndex][0] < currentMonth[weekIndex + 1][0]) {
      weekIndex += 1;
    } else {
      weekIndex = 0;
      monthIndex += 1;
      [yearIndex, monthIndex, weekIndex] = changeDateIndex(
        yearIndex,
        monthIndex,
        weekIndex
      );
    }
  }

  useEffect(() => {
    setCurrentWeek(currentMonth[weekIndex]);
  }, [weekIndex]);

  return (
    <Fragment>
      <CalHeader
        mode="week"
        prevWeekCount={getMonth(yearIndex, monthIndex - 2)[6]}
        currentMonth={currentMonth}
      />
      <div className="cal_week_days">
        <div className="weekDays">
          {weekDays.map((day, i) => (
            <div className="day" key={i}>
              {day}
            </div>
          ))}
        </div>
        <div className="week">
          {currentWeek.map((day, idx) => (
            <Day day={day} pageCount={pageCounts[day.format("D")]} key={idx} />
          ))}
        </div>
      </div>
      <div className="cal_week_schedule">
        <div className="sonSche">
          <PageList
            pageDate={currentMonth[weekIndex][0].format("YYYY-MM-DD")}
          />
        </div>
        <div className="monSche">
          <PageList
            pageDate={currentMonth[weekIndex][1].format("YYYY-MM-DD")}
          />
        </div>
        <div className="tueSche">
          <PageList
            pageDate={currentMonth[weekIndex][2].format("YYYY-MM-DD")}
          />
        </div>
        <div className="wedSche">
          <PageList
            pageDate={currentMonth[weekIndex][3].format("YYYY-MM-DD")}
          />
        </div>
        <div className="thuSche">
          <PageList
            pageDate={currentMonth[weekIndex][4].format("YYYY-MM-DD")}
          />
        </div>
        <div className="friSche">
          <PageList
            pageDate={currentMonth[weekIndex][5].format("YYYY-MM-DD")}
          />
        </div>
        <div className="satSche">
          <PageList
            pageDate={currentMonth[weekIndex][6].format("YYYY-MM-DD")}
          />
        </div>
      </div>
    </Fragment>
  );
}
