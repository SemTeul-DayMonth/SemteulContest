import "../static/Todo.css";
import AddPageButton from "./AddPageButton";
import dayjs from "dayjs";
import PageList from "./PageList";

export default function SideTodo() {
  return (
    <div className="todayTodo">
      <div className="todoTitle">Today's To-Do List</div>
      <PageList pageDate={dayjs()} />
      <AddPageButton />
    </div>
  );
}
