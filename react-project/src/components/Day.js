import dayjs from "dayjs";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Day({ month, day, pageCount }) {
  const navigation = useNavigate();
  const params = useParams();
  const { setDayViewDate, showSchedule, setShowSchedule } =
    useContext(GlobalContext);
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "currentDay"
      : "";
  }

  function getCurrentMonthClass() {
    if (!month) month = day.format("M");
    return day.format("M") !==
      dayjs(new Date(dayjs().year(), month - 1)).format("M")
      ? "otherDay "
      : "";
  }

  return (
    <div className="day">
      <p
        className={
          (day.get("day") === 0 ? "sunday " : "") +
          (day.get("day") === 6 ? "saturday " : "") +
          `${getCurrentMonthClass()}` +
          `${getCurrentDayClass()}`
        }
        onClick={() => {
          navigation("/day" + day.format(`/YYYY/MM/${params.week}/DD`));
          setDayViewDate(day);
        }}
      >
        {day.format("D")}
      </p>
      <div>{getCurrentMonthClass() === "" && pageCount > 0 && pageCount}</div>
    </div>
  );
}
