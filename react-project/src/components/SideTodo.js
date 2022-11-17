import "../static/Todo.css";
import dayjs from "dayjs";
import PageList from "./PageList";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";

export default function SideTodo() {
  const { setModalObj } = useContext(GlobalContext);

  return (
    <div className="todayTodo">
      <div className="todoTitle">To-Do List</div>
      <PageList pageDate={dayjs().format("YYYY-MM-DD")} />
      <div onClick={() => setModalObj({ type: "page" })} className="addEvtBtn">
        +
      </div>
    </div>
  );
}
