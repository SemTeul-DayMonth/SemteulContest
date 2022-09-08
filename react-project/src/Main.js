import { useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import "./Main.css";
import { getMonth } from "./utils";
import Month from "./components/Month";
import GlobalContext from "./context/GlobalContext";

function Main() {
  // const [selectedAssign, setSelectedAssign] = useState(-1);
  // const assignStart = [[8, 6], [8, 10]];
  // const assignEnd = [[8, 8], [8, 11]];
  // const assignList = ["과제1", "과제2"];
  //
  // const [clickedDay, setClickedDay] = useState(-1);
  // const [isShowSubmit, setIsShowSubmit] = useState("none");
  // function ShowSubmit(e) {
  //     if (clickedDay === e.target.innerText) {
  //         setIsShowSubmit("fadeSubmit");
  //         setTimeout(() => setClickedDay(-1), 1000);
  //     }
  //     else {
  //         setClickedDay(e.target.innerText);
  //         setIsShowSubmit("showSubmit");
  //     }
  // }

  // function Submit({ day }) {
  //     return (
  //         <div className={"assign_submit " + isShowSubmit}>
  //             <div className="submit_content">
  //                 <h1>{day}</h1>
  //                 <form action="/siajin" method='post' enctype="multipart/form-data">
  //                     <input name="day" type="hidden" value={day} />
  //                     <input name="file" type="file"/>
  //                     <button type="submit">제출</button>
  //                 </form>
  //             </div>
  //         </div>
  //     );
  // }

  // function assignPeriod(e) {
  //     for (let i=0;i<assignList.length;i++) {
  //         if (e.target.innerText === assignList[i]) {
  //             if (selectedAssign === i) setSelectedAssign(-1);
  //             else setSelectedAssign(i);
  //         }
  //     }
  // }

  // const [isClikedWeek, setIsClickedWeek] = useState(false);

  // function toggleClikedWeek(e) {
  //   const nowWeek = Number(e.target.parentNode.parentNode.classList[1]);
  //   if (isClikedWeek === nowWeek) {
  //     setIsClickedWeek(false);
  //   } else {
  //     setIsClickedWeek(nowWeek);
  //   }
  // }

  // function Schedule() {
  //   return <div></div>;
  // }

  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  function prev_mon() {
    setMonthIndex(monthIndex - 1);
  }
  function next_mon() {
    setMonthIndex(monthIndex + 1);
  }

  return (
    <div className="app">
      <div className="nav">
        <div className="mainLogo">DayMonth</div>
        <div className="searchBar">
          <div className="searchIcon"></div>
          <input
            className="search"
            type="text"
            placeholder="Search for events"
            style={{ color: "#7B68EE" }}
          />
        </div>
      </div>
      <div className="main">
        <div className="cal">
          <p className="year">
            {dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY")}
          </p>
          <div className="cal_nav">
            <div onClick={prev_mon}>&lt;</div>
            <p className="month">
              {dayjs(new Date(dayjs().year(), monthIndex)).format("M")}
            </p>
            <div onClick={next_mon}>&gt;</div>
          </div>
          <Month month={currentMonth} />
          {/* {isClikedWeek === key1 ? <Schedule nowWeek={isClikedWeek} /> : ""} */}
        </div>
      </div>
      <div className="todayToDo">
        <div className="todoTitle">Today's To-Do List</div>
        <div className="toDoList">
          <div>
            <a href="">메인페이지 만들기</a>
          </div>
          <div>
            <a href="">자고싶어...</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
