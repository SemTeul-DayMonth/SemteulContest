import dayjs from "dayjs";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function Day({ month, day }) {
  const { showSchedule, setShowSchedule } = useContext(GlobalContext);
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "currentDay"
      : "";
  }

  function getCurrentMonthClass() {
    return day.format("M") !==
      dayjs(new Date(dayjs().year(), month)).format("M")
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
          showSchedule === "week" && setShowSchedule(day);
        }}
      >
        {day.format("DD")}
      </p>
    </div>
  );
}
