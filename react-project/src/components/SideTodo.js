import "../static/Todo.css";
import dayjs from "dayjs";
import PageList from "./PageList";
import { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import BasicBtn from "./BasicBtn";

export default function SideTodo() {
  const { pageMode, setModalObj } = useContext(GlobalContext);
  const navigate = useNavigate();

  return (
    <div className="todayTodo">
      <div className="todoTitle">
        Today's {pageMode === "page" ? "Page" : "Todo"} List
      </div>
      <PageList pageDate={dayjs().format("YYYY-MM-DD")} />
      <BasicBtn onClick={() => navigate("/repo/")}>Repository</BasicBtn>
      <div onClick={() => setModalObj({ type: "page" })} className="addEvtBtn">
        +
      </div>
    </div>
  );
}
